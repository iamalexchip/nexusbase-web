import React from 'react';

const Button = ({ children, style, onClick }: any) => {
  return (
    <button style={style} onClick={onClick}>{children}</button>
  );
}

export default Button;
