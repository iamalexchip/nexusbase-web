import React, { FC } from 'react';

const Label: FC = ({ children }) => {
  const style = {
    border: '1px solid #ccc',
    padding: '0.5em',
  };

  return <div style={style}>{children}</div>
}

export default Label;
