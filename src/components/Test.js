// import logo from './logo.svg';
// import './App.css';
import './test.css'

function Test() {
  function Submit(e) {
    const formElm = document.querySelector('form');
    e.preventDefault();
    // console.log(e.target);
    console.log(formElm);
    const formData = new FormData(formElm);
    console.log(formData);
    // "amra-amra picnics" excel sheet
    // fetch('https://script.google.com/macros/s/AKfycby1kbmb7Zn69pQPgM_3EQVwQvyu4OkcEACY_hYY4Cuaeh3HIKvUYdPAfnTL9no5Xc4T/exec', {
    fetch('https://script.google.com/macros/s/AKfycbyPcnvi7S0PyUYq0e_KvO7cXy9zAbkJZSd6kQ43_PqW9q4MuMlKsmznpAV8VsnQ3hrD/exec', {  
        // mode: 'no-cors',
      method: "POST",
      body: formData,
    })
    .then((res) => res.text())
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
  }
  return (
    <div className='App'>
      <h1>Contact me form</h1>
      <form className='form' onSubmit={(e) => Submit(e)}>
        <input placeholder='Name' name='Name' type='text'></input>
        <input placeholder='Email' name='Email' type='email'></input>
        <input placeholder='Message' name='Message' type='text'></input>
        <input className="button" type="submit" />
      </form>
    </div>
  );
}

export default Test;
