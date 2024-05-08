// import logo from './logo.svg';
// import './App.css';
import './test.css'
import axios from 'axios';


function Test() {
  // const url = "https://ssbc.club/db/";
  const url = "https://amra-amra.se/emailApi/";




  function Submit(e) {
    e.preventDefault();
    let fData = new FormData();
    
    fData.append('request', 'adminreg');
    
    // console.log("I am here");
    
    axios.post(url, fData)
      .then(response => {console.log(response.data); alert(response.data)})
      .catch(error => alert(error));


  }
  return (
    <div className='App'>
      <h1>Contact me form</h1>
      <form className='form' onSubmit={(e) => Submit(e)}>
        <input placeholder='Name' name='Name' type='text'></input>
        <input placeholder='Email' name='Email' type='email'></input>
        <input placeholder='Swish To' name='SwishTo' type='text'></input>
        <input className="button" type="submit" />
      </form>
    </div>
  );
}

export default Test;
