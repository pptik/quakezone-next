import React, { FunctionComponent } from "react";

const Hello: FunctionComponent<{ who?: string }> = ({ who }) => {
  return (
    <h1>Hello {who}</h1>
  );
};

export default Hello;
