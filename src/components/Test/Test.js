import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from "./logo_in_header.png"

function Test() {
  const filePath = "https://amra-amra.se/form_data.txt";
  const [fileContent, setFileContent] = useState("")
  

  // useEffect(() =>{
  //   setFileContent(JSON.stringify(filePath, null));
    
  // },[]);

  const handleClick = async() => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }
      const text = await response.text();
      setFileContent(text);

    } catch (error) {
      console.error("Error fetching the file:", error);
      setFileContent("Error fetching the file");
    } 
  }

  // async function createPaymentRequest(amount, message, payerAlias) {
  //   const instructionUUID = createId();
  
  //   const data = {
  //     payeeAlias: '1234679304',
  //     currency: 'SEK',
  //     callbackUrl: 'https://your-callback-url.com',
  //     amount,
  //     message,
  //     payerAlias,
  //     callbackIdentifier: '11A86BE70EA346E4B1C39C874173F478',
  //   };
  
  //   try {
  //     const response = await client.put(
  //       `https://mss.cpc.getswish.net/swish-cpcapi/api/v2/paymentrequests/${instructionUUID}`,
  //       data
  //     );
  
  //     if (response.status === 201) {
  //       return { id: instructionUUID };
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  return (
<div>
      <button onClick={handleClick} className="btn btn-primary">Fetch File Content</button>
      <div className="mt-3">
        <h5>File Content:</h5>
        <pre>{fileContent || "Click the button to fetch file content"}</pre>
      </div>
    </div>
  );
};


export default Test;
