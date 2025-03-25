import React from 'react';
//import logo from '../images/logo.png';
// import Banner from '../Banner/Banner';


function TeamsGroup(props) {


    return (
        <div>

            <div className="p-2 border border-white rounded text-center">
                <table className='table table-striped table-dark'>
                    <thead>
                        <tr>
                            {Object.keys(props.team).map((key) => (
                                (props.game.includes("Doubles")
                                    || props.game.includes("29")
                                    || props.game.includes("InternationalBridge")
                                    || key !== "Partner")
                                && (
                                    <th>{key}</th>
                                )
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((player, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{player}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TeamsGroup;