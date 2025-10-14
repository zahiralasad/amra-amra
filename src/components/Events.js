import React from 'react';
import { Link } from "react-router-dom";

import Card from './Cards'

function Events() {
    return (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
            <Card
                title='Indoor Games 2025'
                button1={<Link className="btn btn-secondary" type="button" to='/registerteam'>Photos</Link>}
            />
            <Card
                title='পিকনিক ২০২৫'
                button1={
                    <Link to='/registermember' className="btn btn-secondary" type="button" >
                        <img
                            src={require("../images/picnic2025info.jpg")}
                            alt="Photos"
                            style={{height: "100%", objectFit: "cover", cursor: "pointer" }}
                        />
                    </Link>}
            />
            <Card
                title='পিকনিক ২০২৩'
                button1={<Link className="btn btn-secondary" type="button" to='/registermember'>Photos</Link>}
            />
            <Card
                title='পিকনিক ২০২২'
                button1={<Link className="btn btn-secondary" type="button" to='/registermember'>Photos</Link>}
            />
            <Card
                title='পিকনিক ২০১৯'
                button1={<Link className="btn btn-secondary" type="button" to='/registermember'>Photos</Link>}
            />
            <Card
                title='পিকনিক ২০১৮'
                button1={<Link className="btn btn-secondary" type="button" to='/registermember'>Photos</Link>}
            />

        </div>
    )
}
export default Events;