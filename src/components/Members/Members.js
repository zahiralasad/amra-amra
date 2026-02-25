import React from 'react';
import { useState, useEffect } from "react";


const url = "https://script.google.com/macros/s/AKfycbw3zL12yxAeHhFubKpPNm2DXIeINp7_RZYPij4oKjiBzRUuY6aVEFFUCdBQugIeUsMljg/exec";

function Members() {

    const [members, setMembers] = useState([]);
    const [ids, setIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getMembers();
    }, []);

    function getMembers() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setMembers(data.names);
                setIds(data.ids);
                console.log(data.names)
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }

    return (
        <div className='row'>
            <div className="mt-4 text-center text-white">
                <div>
                    <h6>
                        <div>Want to become a member of Amra-Amra?</div>
                        <a href="registermember" className="btn btn-primary">Register</a> 
                        
                    </h6>
                </div>
                <div className='pt-5'>
                    <h6>Amra-Amra Members</h6>
                    {loading && <div className="text-center  text-white my-5">Please wait while loading the from .........</div>}
                    {error && <div className="text-center  text-white my-5">Error: {error}</div>}
                    {!loading && !error && (
                        <div className="p-2 border border-white rounded text-center">
                            <table className='table table-striped table-dark'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Names</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map((member, index) => {
                                        const id = ids[index];
                                        return (
                                            <tr key={index}>
                                                <td>{id}</td>
                                                <td>{member}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Members;