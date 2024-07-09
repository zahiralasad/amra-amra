import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import banner from "../../images/form-banner.jpg";

import axios from 'axios';

// import "./picnic.css";
// import Notification from '../Notification';


function RegisterMember() {

    const [response, setResponse] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    
    function Submit(e) {
        const formFile= document.querySelector("form")
        e.preventDefault()
        console.log("Submitted")
        const formData = new FormData(formFile)
        const url = "https://script.google.com/macros/s/AKfycbwD_ff2bXXvsCNRy5IoEnhkX2IpHUcO3tk04Yzu-hcuwvzEef7n5nZYMVZ-qBotI1xNIg/exec";
        // fetch("https://script.google.com/macros/s/AKfycbwD_ff2bXXvsCNRy5IoEnhkX2IpHUcO3tk04Yzu-hcuwvzEef7n5nZYMVZ-qBotI1xNIg/exec", {
        //     method: "POST",
        //     body: formData,

        // })
        axios.post(url, formData)
            .then(response => {
                if (response.data === "successful") {
                    // sendEmail(formData);
                } else {
                    setTitle("Warning");
                    setMessage(response.data);
                    // setModalShow(true);
                    // document.getElementById("register").disabled = false;
                }
            }).catch(error => setResponse(error));

    }
    return (
        <div>
            <div>Member Registeration form</div>
            <form className="form" onSubmit={(e) => Submit(e)}>
                <input placeholder="Name" name="Name" type="text"/>
                <input placeholder="Email" name="Email" type="email"/>
                <input placeholder="Phone" name="Phone" type="tel"/>
                <input placeholder="Address" name="Address" type="text"/>
                <input className="button" type="submit"/>
            </form>
        </div>
    );
}

export default RegisterMember;