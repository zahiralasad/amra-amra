// import logo from './logo.svg';
// import './App.css';
import './test.css'
import axios from 'axios';
import { useState} from "react";

import Notification from './Notification';

function Test() {
  // const url = "https://ssbc.club/db/";
  const url = "https://amra-amra.se/emailApi/";
  const [modalShow, setModalShow] = useState(false);
  const [clearForm, setClearForm] = useState(false);



  function Submit(e) {
    e.preventDefault();
    const formElm = document.querySelector('form');
    let fData = new FormData(formElm);
    
    fData.append('request', 'sendemail');
    
    // console.log("I am here");
    
    axios.post(url, fData)
      .then(response => {console.log(response.data); setClearForm(true); setModalShow(true)})
      .catch(error => alert(error));
      if (clearForm === true ) {
        document.getElementById("testForm").reset();
      }
  }
  return (
    <div className='App'>
      <h1>Contact me form</h1>
      <form className='form' id="testForm" onSubmit={(e) => Submit(e)}>
        <input placeholder='Name' name='Name' type='text'></input>
        <input placeholder='Email' name='Email' type='email'></input>
        <input placeholder='Swish To' name='Swish' type='text'></input>
        <input className="button" type="submit" onClick={() => modalShow}/>
      </form>
      <Notification
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Test;
