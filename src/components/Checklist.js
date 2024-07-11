import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Checklist() {
    const url = "";
    // const apiUrl = "https://amra-amra.se/emailApi/";
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(url)
            .then(response => {
                setEntries(response.data);
                setLoading(false);
                console.log(response.data);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
                console.log(error);
            })
    });

    // if (loading) return <p className='test-white'>Loading ...</p>
    // if (error) return <p className='test-white'>Error: {error.message}</p>
    return (
        <div className="text-center text-white">
            checklist
            {/* <div>
                <h1>Picnic 2024 Entries</h1>
                <ul>
                    {entries.map(entry => (
                        <li key={entry.id}>{entry.name}</li>
                    ))}
                </ul>
            </div> */}
        </div>
    )
}
export default Checklist;