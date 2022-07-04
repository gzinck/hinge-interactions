import React from "react";
import styled from "@emotion/styled";
import useWindowDimensions from "../hooks/useWindowDimensions";

const size = 300;
const Circle = styled.div`
  position: absolute;
  left: ${({ x }) => x - size / 2}px;
  top: ${({ y }) => y - size / 2}px;
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background-color: ${({ colour }) => colour};
  transition: all 0.05s;
  cursor: pointer;
`;

function DraggableCircle({ id, onStartDrag, onEndDrag, onDrag, x, y, colour }) {
  const { width, height } = useWindowDimensions();
  const ref = React.useRef(null);

  // Make sure this does not depend on x or y
  React.useEffect(() => {
    const isVertical = width < height;
    const hingeX = width / 2;
    const hingeY = height / 2;

    let isDragging = false;
    let prvPos = { x: 0, y: 0 };

    const getPos = e => {
      if (e.x && e.y) return { x: e.x, y: e.y };
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onStart = e => {
      if (!isDragging) {
        isDragging = true;
        onStartDrag(id);
        prvPos = getPos(e);
      }
    };

    const onMove = e => {
      if (!isDragging) return;
      const pos = getPos(e);

      // If cross down
      const crossed = isVertical
        ? (prvPos.y < hingeY && pos.y >= hingeY) ||
          (prvPos.y >= hingeY && pos.y < hingeY)
          ? prvPos.x / width
          : false
        : (prvPos.x < hingeX && pos.x >= hingeX) ||
          (prvPos.x >= hingeX && pos.x < hingeX)
        ? prvPos.y / height
        : false;
      onDrag(pos, crossed, id);
      prvPos = pos;
    };

    const onEnd = e => {
      if (!isDragging) return;
      if ((e.x && e.y) || e.touches.length === 0) {
        isDragging = false;
        onEndDrag(id);
      }
    };

    const el = ref.current;
    el.addEventListener("touchstart", onStart);
    el.addEventListener("mousedown", onStart);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchend", onEnd);
    window.addEventListener("mouseup", onEnd);

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("mousedown", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("mouseup", onEnd);
    };
  }, [id, onStartDrag, onEndDrag, onDrag, width, height]);

  return <Circle ref={ref} x={x} y={y} colour={colour} />;
}

export default DraggableCircle;
