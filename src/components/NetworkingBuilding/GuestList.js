import React, { useState, useEffect } from 'react';

function GuestList() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [guests, setGuests] = useState(null);
    const [showDetail, setShowDetail] = useState(true);

    const url = 'https://script.google.com/macros/s/AKfycbzr2n4nMPkpKBuFIzRok1SDGu1QJBPJAJWeEfQPNhBn8qaMoQzL0UPUxWtCBGNMNDC2/exec';

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

    const handleClick = (value) => {
        if (value === "detail") {
            setShowDetail(true)
        } else {
            setShowDetail(false)
        }


    }

    return (
        <div className='row'>
            <div className="mt-4 text-center text-white">
                <div className='row'>
                    <h4>Career Pathways: Networking for Bangladeshis in Sweden</h4>
                </div>
                <div className="mt-3 p-2 rounded bg-dark text-center">
                    {loading && (
                        <div className="text-center  text-white my-5">
                            Please wait while loading the from .........
                        </div>
                    )}
                    {!loading && (
                        <>
                            <div>
                                <button onClick={() => handleClick("detail")}>Detail</button>
                                <button onClick={() => handleClick("less")}>Less</button>
                            </div>
                            {error && (
                                <div className="text-center  text-white my-5">
                                    Error: {error}
                                </div>
                            )}
                            {!error && showDetail && (
                                <table className='table table-striped table-dark '>
                                    <thead>
                                        <tr>
                                            <th>Entry</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Check In</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {guests.map((guest, key) =>
                                            <tr key={key}>
                                                <td>{guest["Entry No."]}</td>
                                                <td>{guest["Name"]}</td>
                                                <td>{guest["Email"]}</td>
                                                <td>{guest["Phone"]}</td>
                                                <td>{guest["Check In"]}</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            )}
                            {!error && !showDetail && (
                                <table className='table table-striped table-dark'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Check In</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {guests.map((guest, key) =>
                                            <tr key={key}>
                                                <td>{guest["Name"]}</td>
                                                <td>{guest["Check In"]}</td>
                                            </tr>
                                        )
                                        }

                                    </tbody>
                                </table>

                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )

}

export default GuestList;