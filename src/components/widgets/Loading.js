import React from 'react';
import { Spinner } from '@blueprintjs/core';

const Loading = (props) => {
  return (
    <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
      <h3>{props.text || 'Carregando'}</h3>
      <Spinner />
    </div>
  );
};

export default Loading;
