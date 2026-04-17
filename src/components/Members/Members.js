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
                // console.log(data.names)
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }

    // Combine + sort // need to understand this code
    const sortedMembers = members
        .map((member, index) => ({
            member,
            id: ids[index],
        }))
        .sort((a, b) => {
            const getPriority = (id) => {
                if (id.startsWith("BM")) return 1;
                if (id.startsWith("M")) return 2;
                if (id.startsWith("JM")) return 3;
                return 4;
            };
            return (
                getPriority(a.id) - getPriority(b.id) ||
                a.id.localeCompare(b.id)
            );
        });


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
                    {loading && <div className="text-center  text-white my-5">Please wait while loading the member list .........</div>}
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
                                    {sortedMembers.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.member}</td>
                                        </tr>
                                    ))}
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