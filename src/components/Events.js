import React from 'react';
import { Link } from "react-router-dom";

import Card from './Cards'

function Events() {
    return (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
            <Card
                title='পিকনিক ২০২৫'                
                button1={<Link className="btn btn-secondary" type="button" to='/registerteam'>Photos</Link>}
            />
            <Card
                title='পিকনিক ২০২৪'
                button1={<Link className="btn btn-secondary" type="button" to='/registermember'>Photos</Link>}
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