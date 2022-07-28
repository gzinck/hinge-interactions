import React from "react";
import styled from "@emotion/styled";
import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";
import { getTouchPos } from "../../utils/events";
import { dragState } from "./constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import FileIcon from "./icons/file.svg";
import Icon from "../util/Icon";

const Container = styled.div`
  border: 1px solid #555;
  background-color: #353535;
  color: #fff;
  width: 12rem;
  height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${({ pos }) => (!pos.x && !pos.y ? 0 : 1)};
  padding: 1rem;
  user-select: none;
  position: relative;
  transition: all 0.2s;
  left: ${({ pos }) => pos.x}px;
  top: ${({ pos }) => pos.y}px;
`;

const StyledIcon = styled(Icon)`
  position: static;
`;

const delta = 50;
const defaultPos = { x: 0, y: 0 };

function FileItem({ name, order, setState, duplicate, rename, open, share }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState(defaultPos);
  const { width, height } = useWindowDimensions();

  React.useEffect(() => {
    if (!ref.current) return;

    let endSubs = [];
    let state = dragState.DEFAULT;
    let startPos = defaultPos;
    let currOffset = defaultPos;

    const actions = {
      [dragState.DEFAULT]: [
        { startX: 0, endX: width / 4, action: duplicate },
        { startX: width / 4, endX: width / 2, action: rename },
        {
          startX: width / 2,
          endX: (width * 3) / 4,
          action: () => setState(dragState.SHARE),
        },
        {
          startX: (width * 3) / 4,
          endX: width,
          action: () => setState(dragState.OPEN),
        },
      ],
      [dragState.SHARE]: [
        { startX: 0, endX: width, action: share },
      ],
      [dragState.OPEN]: [
        { startX: width / 4, endX: width, action: open },
      ],
    };

    const onMove = e => {
      if (endSubs.length === 0) return;
      const currPos = getTouchPos(e);
      currOffset = { x: currPos.x - startPos.x, y: currPos.y - startPos.y };
      setPos(currOffset);

      // if currPos just passed the hinge, do the state changes necessary!
      if (currPos.y < width / 2 - delta || currPos.y > width / 2 + delta)
        return;
    };

    const onEnd = e => {
      if (endSubs.length === 0) return;
      endSubs.forEach(sub => sub.unsubscribe());
      setState(dragState.IDLE);
      endSubs = [];
      // Calculate how far down it went, change the order around
      setPos(defaultPos);
    };

    const onStart = e => {
      if (endSubs.length !== 0) return;
      setState(dragState.DEFAULT);
      startPos = getTouchPos(e);

      endSubs = [
        fromEvent(window, "touchmove").pipe(throttleTime(50)).subscribe(onMove),
        fromEvent(window, "mousemove").pipe(throttleTime(50)).subscribe(onMove),
        fromEvent(window, "touchend").subscribe(onEnd),
        fromEvent(window, "mouseup").subscribe(onEnd),
      ];
    };

    const startSubs = [
      fromEvent(ref.current, "touchstart").subscribe(onStart),
      fromEvent(ref.current, "mousedown").subscribe(onStart),
    ];

    return () => [...endSubs, ...startSubs].forEach(sub => sub.unsubscribe());
  }, [setState, width, height]);

  return (
    <Container pos={pos} ref={ref}>
      <StyledIcon draggable={false} white src={FileIcon} />
      {name}
    </Container>
  );
}

export default FileItem;
