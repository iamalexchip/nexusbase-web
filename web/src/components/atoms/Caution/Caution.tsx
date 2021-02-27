import React, { FC } from 'react';

interface CICaution {
  details?: string;
  text?: string;
}

const Caution: FC<CICaution> = ({ details, text }) => {
  const style = {
    cursor: 'pointer'
  };
  
  return <span style={style} title={details}>/!\ {text}</span>;
}

export default Caution;
