import { Icon, message } from 'antd';
import React from 'react';

const iconStyle = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.25)',
  cursor: 'pointer'
};

const msgHandlers = {};

function showMessage(type, content, duration) {
  const msgKey = new Date();

  const handleClose = () => {
    // Clean-up and remove the dismiss handler from the object
    delete msgHandlers[msgKey];
  };

  const handleDismiss = () => {
    if(msgHandlers[msgKey]) {
      msgHandlers[msgKey]();

      handleClose();
    }
  };

  const msgBody = (
      <span>
      {content}
        <Icon type="close-circle" onClick={handleDismiss} style={iconStyle} />
    </span>
  );

  const msgBodywithLink = (
    <span>
      {content.message} <a href={content.link}> View on Etherscan</a>
        <Icon type="close-circle" onClick={handleDismiss} style={iconStyle} />
      </span>
  );


  if (content.link){
    let  m = message[type](msgBodywithLink, duration, handleClose);
    msgHandlers[msgKey] = m;
  }else {
    const  m = message[type](msgBody, duration, handleClose);
    msgHandlers[msgKey] = m;
  }
  return handleDismiss;
}

export default showMessage;
