import React from 'react';

const Card = ({ children, containerStyle }: any) => {
  return (
    <div style={{
      ...containerStyle,
      backgroundColor: '#ffffff',
      padding: '15px',
    }}>{children}</div>
  );
}

export default Card;
