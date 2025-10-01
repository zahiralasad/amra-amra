import React, { useState, useEffect } from 'react';

import AmraAmraDatePicker from '../Others/AmraAmraDatePicker';


function MeetingNoteBook() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notes, setNotes] = useState(null);
    const [date, setDate] = useState("Date");


    const Url = "https://script.google.com/macros/s/AKfycbyqq1K_D3lKRsHQ-WlJRzYPHlqxHZCaXvIKUaZucCOP8PiIUvuRsmIQKnwedGKHWpi1/exec"

    useEffect(() => {
        fetch(Url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setLoading(false);
                setNotes(data);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [loading]);

    const handleMeetingDate = (date) => {
        setDate(date);
    }

    return (
        <div>
            <h5>Meeting Notebook Book</h5>
            {loading && (
                <div className="text-center  text-white my-5">Please wait while loading the from ......... </div>
            )}
            {!loading && (
                <div className='row rounded border '>
                    <form>
                        <div className="row pt-2 ">
                            <div className='col-2'>
                                <div className="input-group mb-3 ">
                                    {/* <span className="input-group-text">
                                        <i className="bi bi-calendar"></i>
                                    </span> */}
                                    {/* <input className='form-control'></input> */}
                                    <AmraAmraDatePicker
                                        value="meetingdate"
                                        placeHolderText="Date"
                                    // date={date}
                                    // onChange={(e) => handleMeetingDate(e)}
                                    />
                                </div>
                            </div>
                            <div className='col-5'>
                                <div className="input-group mb-3 align-items-start">
                                    <span className="input-group-text">Agenda:</span>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";      // Reset height
                                            e.target.style.height = e.target.scrollHeight + "px"; // Adjust to content
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                            <div className='col-5'>
                                <div className="input-group mb-3 align-items-start">
                                    <span className="input-group-text">Conclusion:</span>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";      // Reset height
                                            e.target.style.height = e.target.scrollHeight + "px"; // Adjust to content
                                        }}
                                    ></textarea>
                                </div>
                            </div>

                        </div>
                        <div className="row border-bottom pb-2">
                            <div className="col-auto">
                                <button className='btn btn-primary'>Add</button>
                            </div>
                        </div>
                    </form>
                    {/* <div className='row border-bottom'>test</div> */}
                    {
                        notes.map((note, index) => {
                            const formattedDate = new Date(note.Date).toISOString().split("T")[0];
                            return (
                                <div className="border-bottom" key={index}>
                                    <div className="row ps-1 pe-1 mb-1 ">
                                        <div className='col border-end'>{formattedDate}</div>
                                        <div className='col border-end'>{note.Agenda}</div>
                                        <div className='col'>{note.Conclusion}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )}

        </div>
    )
}
export default MeetingNoteBook;
