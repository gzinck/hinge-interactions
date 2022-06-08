import styled from "@emotion/styled";
import DraggableBox from './DraggableBox';

const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

function DragScreen() {
  return (
    <Screen>
      <DraggableBox />
    </Screen>
  );
}

export default DragScreen;
