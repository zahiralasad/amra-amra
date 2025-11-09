import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://script.google.com/macros/s/AKfycbzr2n4nMPkpKBuFIzRok1SDGu1QJBPJAJWeEfQPNhBn8qaMoQzL0UPUxWtCBGNMNDC2/exec';

function CheckIn() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [guests, setGuests] = useState(null);
    const [message, setMessage] = useState("");
    const [hideMessage, setHideMessage] = useState(true);
    const [hideForm, setHideForm] = useState(false);

    useEffect(() => {
        // if (maxBusSeats && maxCarSeats) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                // setEntries(data.data); // Update the state with JSON data
                setLoading(false);
                setGuests(data);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
        // }
        //   }, [maxBusSeats, maxCarSeats]);
    }, []);

    function Submit(e) {
        e.preventDefault();
        console.log(e.target.emailorphone.value)
        const input = e.target.emailorphone.value.trim().toLowerCase();


        const lastNine = input.slice(-9);
        console.log("last nine: ", lastNine);

        const found = guests.find((item) => {
            const email = item.Email ? item.Email.toString().toLowerCase() : "";
            const phone = item.Phone ? item.Phone.toString().replace(/\s+/g, "") : "";

            return (
                email === input ||
                phone.slice(-9) === lastNine
            );
        });
        // console.log("Matched Guest:", found); // 👈 see what was foun
        if (found) {
            const formElm = document.querySelector('form');
            const formData = new FormData(formElm);
            formData.append('Entry', found["Entry No."]);
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            console.log("Matched Guest:", found);
            axios.post(url, formData)
            .then(response => {
                console.log(response.data);
                //setClearForm(true);
            })
            .catch(error => {
                console.log(error);
            })
            setHideMessage(true);
            setHideForm(true);
            setMessage("Check in completed.");

        } else {
            setMessage("⚠️ We cant find you in our guest list");
            setHideMessage(false);
        }

    }


    return (
        <div className='row'>
            <div className="mt-4 text-center text-white">
                <div className='row'>
                    <h4>Welcome to </h4>
                    <h4>Career Pathways: Networking for Bangladeshis in Sweden</h4>
                </div>
                <div className="mt-1 p-2 rounded bg-dark text-center">
                    {loading && (
                        <div className="text-center  text-white my-5">
                            Please wait while loading the from .........
                        </div>
                    )}
                    {!loading && (
                        <>
                            {error && (
                                <div className="text-center  text-white my-5">
                                    Error: {error}
                                </div>
                            )}
                            {!error && (
                                <>
                                    {hideForm && (
                                        <div>
                                            👍{message}👍. Welcome to our event

                                        </div>
                                    )}
                                    {!hideForm && (
                                        <form className="p-4 rounded text-white" id="checkinform" onSubmit={(e) => Submit(e)}>
                                            <div className="form-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder='Enter your email or phone number'
                                                    id="emailorphone"
                                                    name="EmailOrPhone"
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-success w-100">
                                                Check In
                                            </button>
                                        </form>
                                    )}
                                    {!hideMessage && (
                                        <div className='text-red'>{message}. Please try again. If you are not registered, please{" "}
                                            <a href="/registertonetwork" className="underline">
                                                Register
                                            </a>.</div>
                                    )}


                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default CheckIn;