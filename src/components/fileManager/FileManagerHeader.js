import React from "react";
import styled from "@emotion/styled";

const Background = styled.div`
  background-color: #444;
  padding-bottom: 1rem;
`;

const TopBar = styled.div`
  width: 100%;
  height: 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
`;

const TopTitle = styled.div`
  width: calc(100% - 9rem);
  text-align: center;
  color: white;
`;

const colours = {
  YELLOW: "#fac802",
  RED: "#ff5269",
  GREEN: "#71ff52",
};

const Button = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin: 0 0.25rem;
  background-color: ${({ colour }) => colour};
`;

const BottomBar = styled.div`
  height: 2rem;
  width: 100%;
`;

const AddressBox = styled.div`
  border-radius: 0.2rem;
  height: 1.5rem;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px #999 solid;
  color: #FFF;
`;

function FileManagerHeader() {
  return (
    <Background>
      <TopBar>
        <Button colour={colours.RED} />
        <Button colour={colours.YELLOW} />
        <Button colour={colours.GREEN} />
        <TopTitle>File Manager</TopTitle>
      </TopBar>
      <BottomBar>
        <AddressBox>/Users/john/Documents/</AddressBox>
      </BottomBar>
    </Background>
  );
}

export default FileManagerHeader;
