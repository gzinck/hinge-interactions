import styled from "@emotion/styled";

const size = 70;
const Icon = styled.img`
  user-select: none;
  position: absolute;
  left: calc(
    ${({ index, numSVGs, isVertical }) =>
      isVertical
        ? `${((index + 0.5) / numSVGs) * 100}vw - ${size / 2}px`
        : `50vw - ${size / 2}px`}
  );
  top: calc(
    ${({ index, numSVGs, isVertical }) =>
      isVertical
        ? `50vh - ${size / 2}px`
        : `${((index + 0.5) / numSVGs) * 100}vh - ${size / 2}px`}
  );
  opacity: ${({ opacity }) => opacity};
  width: ${size}px;
  height: ${size}px;
  transition: all 0.1s;
  color: white;
  filter: invert(100%) brightness(200%);
  transform: rotate(${({ rotate }) => rotate || 0}deg);
`;

export default Icon;
