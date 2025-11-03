import React from 'react';
import { Link, useLocation } from "react-router-dom";

function Gallery() {
    const location = useLocation();
    const { year, tournament } = location.state || {};
    return (
        <div className='row'>
            <div className="mt-4 text-center text-white">
                <h5>Gallery</h5>
            </div>
        </div>
    )

}

export default Gallery;