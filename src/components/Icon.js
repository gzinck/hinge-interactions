import styled from "@emotion/styled";

const size = 70;
const Icon = styled.img`
  user-select: none;
  position: absolute;
  left: calc(${({ index, numSVGs }) => ((index + 0.5) / numSVGs) * 100}vw - ${size / 2}px);
  top: calc(50vh - ${size / 2}px);
  opacity: ${({ opacity }) => opacity};
  width: ${size}px;
  height: ${size}px;
  transition: all 0.1s;
  color: white;
  filter: invert(100%) brightness(200%);
`;

export default Icon;
