import React from 'react';
import { Link } from "react-router-dom";

import Card from './Card'

import pic1 from "../../images/picnic2022.jpg";
import pic2 from "../../images/picnic2024.jpg";
import pic3 from "../../images/picnic2024.jpg";
// import game1 from "../images/game2025_1.jpg";
// import game2 from "../images/game2025_2.jpg";

function Events() {
    return (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
            <Card
                title="Career Pathways 2025"
                images={[pic1, pic2]}
                link="/indoorgames2025"
            />
            <Card
                title="Indoor Games 2025"
                images={[pic1, pic2]}
                link="/indoorgames2025"
            />
            <Card
                title="পিকনিক ২০২৫"
                images={[pic1, pic2]}
                link="/picnic2025"
            />
            <Card
                title="বন্যার্তদের পাশে 'আমরা-আমরা ২০২৪"
                images={[pic1, pic2]}
                link="/picnic2025"
            />
            <Card
                title="পিকনিক ২০২৩"
                images={[pic1, pic2]}
                link="/picnic2023"
            />
            <Card
                title="পিকনিক ২০২৩"
                images={[pic1, pic2]}
                link="/picnic2023"
            />
            <Card
                title="পিকনিক ২০২৩"
                images={[pic1, pic2]}
                link="/picnic2023"
            />
            <Card
                title="পিকনিক ২০২৩"
                images={[pic1, pic2]}
                link="/picnic2023"
            />
            <Card
                title="পিকনিক ২০২৩"
                images={[pic1, pic2]}
                link="/picnic2023"
            />
        </div>
    )
}
export default Events;