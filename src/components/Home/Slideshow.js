import React from "react";
// import Slide1 from '../images/ssbcAd2021.jpg';
// import Slide2 from '../images/ssbcAd2022.jpg';
// import Slide3 from '../images/ssbcAd2023.jpg';
import Slide4 from '../../images/picnic2024.jpg';
import Slide5 from '../../images/indoorgames2025.jpg';
import Carousel from 'react-bootstrap/Carousel';

function SlideShow() {
    return (
        <Carousel variant="dark">
            <Carousel.Item>
                <div className="mt-2 p-4 p-md-5 mb-2 rounded text-bg-dark">
                    <img
                        className="mb-5 d-block w-100"
                        src={Slide5}
                        alt="Third slide"
                    />
                    <Carousel.Caption className='text-white'>
                        <h5>IndoorGames 2025</h5>
                        {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="mt-2 p-4 p-md-5 mb-4 rounded text-bg-dark">
                    <img
                        className="mb-5 d-block w-100"
                        src={Slide4}
                        alt="Third slide"
                    />
                    <Carousel.Caption className='text-white'>
                        <h5>Picnic 2024</h5>
                        {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default SlideShow;