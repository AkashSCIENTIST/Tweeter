import React from "react";
import "./groups.css";
import GroupData from "./GroupData";

const FlexboxPage = () => (
  <>
  <h4>Member Group</h4>
  <br></br>
    <div className="flex-y-row1">
      <GroupData username="blueshirt"></GroupData>
      <GroupData username="blueshirt"></GroupData>
      <GroupData username="blueshirt"></GroupData>
      <GroupData username="blueshirt"></GroupData>
      <GroupData username="blueshirt"></GroupData>
      <GroupData username="blueshirt"></GroupData>
    </div>
    <br></br>
    <br></br>
    <h4>Non - Member Group</h4> 
    <br></br>
    <div className="flex-y-row1">
    <GroupData username="blueshirt"></GroupData>
    <GroupData username="blueshirt"></GroupData>
    <GroupData username="blueshirt"></GroupData>
    <GroupData username="blueshirt"></GroupData>
    <GroupData username="blueshirt"></GroupData>
    <GroupData username="blueshirt"></GroupData>
    </div>
  </>
);

export default FlexboxPage;