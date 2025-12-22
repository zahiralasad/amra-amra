import React from 'react';
import { Link } from "react-router-dom";

import Card from './Card'

import indoorgames2026_01 from "../../images/indoor_games_2026_card_01.png";
import picnic2025_01 from "../../images/picnic_2025_card_01.png";
import picnic2025_02 from "../../images/picnic_2025_card_02.png";
import picnic2025_03 from "../../images/picnic_2025_card_03.png";
import carrier2025_01 from "../../images/carrier_pathway_2025_card_01.png";
import carrier2025_02 from "../../images/carrier_pathway_2025_card_02.png";
import carrier2025_03 from "../../images/carrier_pathway_2025_card_03.png";
import indoorgames2025_01 from "../../images/indoor_games_2025_card_01.png";
import indoorgames2025_02 from "../../images/indoor_games_2025_card_02.png";
import indoorgames2025_03 from "../../images/indoor_games_2025_card_03.png";
import flood2024_01 from "../../images/flood_2024_card_01.png";
import flood2024_02 from "../../images/flood_2024_card_02.png";
import flood2024_03 from "../../images/flood_2024_card_03.png";
import picnic2024_01 from "../../images/picnic_2024_card_01.png";
import picnic2024_02 from "../../images/picnic_2024_card_02.png";
import picnic2024_03 from "../../images/picnic_2024_card_03.png";
import picnic2023_01 from "../../images/picnic_2023_card_01.png";
import picnic2023_02 from "../../images/picnic_2023_card_02.png";
import picnic2023_03 from "../../images/picnic_2023_card_03.png";
import picnic2022_01 from "../../images/picnic_2022_card_01.png";
import picnic2022_02 from "../../images/picnic_2022_card_02.png";
import picnic2022_03 from "../../images/picnic_2022_card_03.png";
import picnic2019_01 from "../../images/picnic_2019_card_01.png";
import picnic2019_02 from "../../images/picnic_2019_card_02.png";
import picnic2019_03 from "../../images/picnic_2019_card_03.png";
import picnic2014_01 from "../../images/picnic_2014_card_01.png";
import picnic2014_02 from "../../images/picnic_2014_card_02.png";
import picnic2014_03 from "../../images/picnic_2014_card_03.png";

function Events() {
    return (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
            <Card
                title="Indoor Games 2026"
                images={[indoorgames2026_01]}
                link="/indoorgames2026"
            />
            <Card
                title="Career Pathways 2025"
                images={[carrier2025_01, carrier2025_02, carrier2025_03]}
                link="/indoorgames2025"
            />
            <Card
                title="Indoor Games 2025"
                images={[indoorgames2025_01, indoorgames2025_02, indoorgames2025_03]}
                link="/gallery"
                state={{ year: 2025, tournament: "Indoor Games" }}
            />
            <Card
                title="বনভোজন ২০২৫"
                images={[picnic2025_01, picnic2025_02, picnic2025_03]}
                link="/picnic2025"
            />
            <Card
                title="বন্যার্তদের পাশে 'আমরা-আমরা ২০২৪"
                images={[flood2024_01, flood2024_02, flood2024_03]}
                link="/picnic2025"
            />
            <Card
                title="বনভোজন ২০২৪"
                images={[picnic2024_01, picnic2024_02, picnic2024_03]}
                link="/picnic2023"
            />
            <Card
                title="বনভোজন ২০২৩"
                images={[picnic2023_01, picnic2023_02, picnic2023_03]}
                link="/picnic2023"
            />
            <Card
                title="বনভোজন ২০২২"
                images={[picnic2022_01, picnic2022_02, picnic2022_03]}
                link="/picnic2023"
            />
            <Card
                title="বনভোজন ২০১৯"
                images={[picnic2019_01, picnic2019_02, picnic2019_03]}
                link="/picnic2023"
            />
            <Card
                title="বনভোজন ২০১৪"
                images={[picnic2014_01, picnic2014_02, picnic2014_03]}
                link="/picnic2023"
            />
        </div>
    )
}
export default Events;