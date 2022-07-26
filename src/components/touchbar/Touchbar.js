import React from "react";
import styled from "@emotion/styled";
import theme from "../../theme";
import BarButton from "./BarButton";
import AirplaneOn from "./icons/airplane.svg";
import AirplaneOff from "./icons/airplane_off.svg";
import MediaRev from "./icons/media_reverse.svg";
import MediaPlay from "./icons/play.svg";
import MediaPause from "./icons/pause.svg";
import MediaFw from "./icons/media_forward.svg";
import VolumeUp from "./icons/volume_up.svg";
import VolumeMute from "./icons/volume_mute.svg";
import BrightnessHigh from "./icons/brightness_high.svg";
import BrightnessLow from "./icons/brightness_low.svg";
import WifiOn from "./icons/wifi.svg";
import WifiOff from "./icons/wifi_off.svg";
import ToggleButton from "./ToggleButton";
import Slider from "./slider/Slider";
import DragMenu from "./dragMenu/DragMenu";
import { wifiOptions } from "./dragMenu/constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { getTouchPos } from '../../utils/events';
import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";

const Background = styled.div`
  background-color: ${theme.palette.overlay.default};
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: calc(50vh - 2rem);
  height: 4rem;
  left: ${({ left }) => left}px;
  width: 100vw;
  transition: all 0.2s;
`;
const delta = 35;
const pulloutDistance = 200;

function Touchbar() {
  const [leftPos, setLeftPos] = React.useState(0);
  const { width, height } = useWindowDimensions();
  const [hideIcons, setHideIcons] = React.useState(false);

  React.useEffect(() => {
    setLeftPos(width);
  }, [width]);

  React.useEffect(() => {
    let endSubs = [];
    let startX = 0;
    let currOffset = 0;

    const onMove = e => {
      if (endSubs.length === 0) return;
      currOffset = startX - getTouchPos(e).x;
      setLeftPos(startX - currOffset);
    };

    const onEnd = e => {
      if (endSubs.length === 0) return;
      endSubs.forEach(sub => sub.unsubscribe());
      endSubs = [];

      if (currOffset > pulloutDistance) {
        setLeftPos(0);
      } else {
        setLeftPos(width);
      }
    }

    const onStart = e => {
      const pos = getTouchPos(e);
      // Just close the touch bar if we are not on the hinge
      if (pos.y < height / 2 - delta ||  pos.y > height / 2 + delta) {
        setLeftPos(width);
        return;
      };
      // It's not a valid swipe if it's not on the right edge
      if (pos.x < width - delta * 2) return;

      // Otherwise, we're swiping in!
      startX = pos.x;

      endSubs = [
        fromEvent(window, "touchmove").pipe(throttleTime(50)).subscribe(onMove),
        fromEvent(window, "mousemove").pipe(throttleTime(50)).subscribe(onMove),
        fromEvent(window, "touchend").subscribe(onEnd),
        fromEvent(window, "mouseup").subscribe(onEnd),
      ];
    }

    const startSubs = [
      fromEvent(window, "touchstart").subscribe(onStart),
      fromEvent(window, "mousedown").subscribe(onStart),
    ];

    return () => [...endSubs, ...startSubs].forEach(sub => sub.unsubscribe());
  }, [width, height]);

  return (
    <Background left={leftPos}>
      <BarButton src={MediaRev} hideIcon={hideIcons} />
      <ToggleButton
        onImg={MediaPlay}
        offImg={MediaPause}
        hideIcon={hideIcons}
      />
      <BarButton src={MediaFw} hideIcon={hideIcons} />
      <Slider
        onImg={VolumeUp}
        offImg={VolumeMute}
        setHideIcons={setHideIcons}
        hideIcon={hideIcons}
      />
      <Slider
        onImg={BrightnessHigh}
        offImg={BrightnessLow}
        setHideIcons={setHideIcons}
        hideIcon={hideIcons}
      />
      <ToggleButton
        onImg={AirplaneOn}
        offImg={AirplaneOff}
        hideIcon={hideIcons}
      />
      <DragMenu
        onImg={WifiOn}
        offImg={WifiOff}
        setHideIcons={setHideIcons}
        hideIcon={hideIcons}
        options={wifiOptions}
      />
    </Background>
  );
}

export default Touchbar;
