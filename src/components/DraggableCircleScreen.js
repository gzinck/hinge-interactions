import styled from "@emotion/styled";
import DraggableCircle from "./DraggableCircle";
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

function DraggableCircleScreen() {
  return (
    <Screen>
      <Img src={BgImg} draggable={false} />
      <DraggableCircle />
    </Screen>
  );
}

export default DraggableCircleScreen;
