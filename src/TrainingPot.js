import React from "react";
import styled from "styled-components";

const activePotOpacity = "100%";
const notActivePotOpacity = "30%";
const StyledDiv = styled.div`
  width: 100px;
  height: 100px;
  color: white;
  border-radius: 100%;
  background-color: ${props => props.potColor};
  opacity: ${props => (props.enabled ? activePotOpacity : notActivePotOpacity)};
`;

export default props => (
  <div>
    {props.children}
    <StyledDiv potColor={props.potColor} enabled={props.enabled} />
  </div>
);
