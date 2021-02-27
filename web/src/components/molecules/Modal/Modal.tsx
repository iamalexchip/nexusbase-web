import React, { FC, useEffect } from 'react';
import './styles.css';

interface CIModal {
}

const Modal: FC<CIModal> = ({ children }) => {

  useEffect(() => {
    document.body.style.top = `-${window.scrollY}px`;console.log(`-${window.scrollY}px`);
    document.body.style.position = 'fixed';

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      console.log(0, parseInt(scrollY || '0') * -1)
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, []);
  
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  )
}

export default Modal;
