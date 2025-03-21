import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function Checklist() {
    //const url = "https://script.google.com/macros/s/AKfycbyHlPtLBBEoWFs3aKPqf4xM1X2GW9XS8aPDUPePdXUBXVJVSVNO2vNP8VCeHi3U5P-_-w/exec";
    const url ="https://script.google.com/macros/s/AKfycbxK35hx548GJF6BMMsvxYir2FnJZnU57nRcyXA98vS5IRcO-1OVyx8IkEPlAvyxqqO_/exec";
    // const apiUrl = "https://amra-amra.se/emailApi/";
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(url)
            .then(response => {
                setEntries(response.data);
                setLoading(false);
                //console.log(response.data);
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
            <Table striped bordered hover>
                <thead>
                    <th>Entry No</th>
                    <th>Adults</th>
                    <th>BigKids</th>
                    <th>SmallKids</th>
                    <th>Babies</th>
                    <th>Phone</th>
                    <th>Bus Stop</th>
                </thead>
            {entries.map((entry) => 
                <tr>
                    <th>{entry.entryNo}</th>
                    <th>{entry.adults.join(", ")}</th>
                    <th>{entry.bigKids.join(", ")}</th>
                    <th>{entry.smallKids.join(", ")}</th>
                    <th>{entry.babies.join(", ")}</th>
                </tr>                
            )}
            </Table>
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