import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from "./logo_in_header.png"

function Test() {
  async function createPaymentRequest(amount, message, payerAlias) {
    const instructionUUID = createId();
  
    const data = {
      payeeAlias: '1234679304',
      currency: 'SEK',
      callbackUrl: 'https://your-callback-url.com',
      amount,
      message,
      payerAlias,
      callbackIdentifier: '11A86BE70EA346E4B1C39C874173F478',
    };
  
    try {
      const response = await client.put(
        `https://mss.cpc.getswish.net/swish-cpcapi/api/v2/paymentrequests/${instructionUUID}`,
        data
      );
  
      if (response.status === 201) {
        return { id: instructionUUID };
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button onClick={createPaymentRequest}>Swish</button>
  )
};


export default Test;
