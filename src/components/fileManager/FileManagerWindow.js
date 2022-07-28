import React from "react";
import styled from "@emotion/styled";
import Screen from "../util/Screen";
import FileManagerHeader from "./FileManagerHeader";
import FileItemContainer from './FileItemContainer';

function FileManagerScreen() {
  return (
    <Screen>
      <FileManagerHeader />
      <FileItemContainer />
    </Screen>
  );
}

export default FileManagerScreen;
