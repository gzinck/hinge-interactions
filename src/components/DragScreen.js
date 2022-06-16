import styled from "@emotion/styled";
import DraggableWindow from "./DraggableWindow";
import BgImg from "./windows/bg.jpg";

const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100vw;
  height: 100vh;
  position: absolute;
  user-select: none;
  left: 0;
  top: 0;
`;

function DragScreen() {
  return (
    <Screen>
      <Img src={BgImg} draggable={false} />
      <DraggableWindow />
    </Screen>
  );
}

export default DragScreen;
