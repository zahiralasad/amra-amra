import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function Card({ title, images, link }) {
  return (
    <div className="col">
      <Link to={link} className="text-decoration-none">
        <div className="card shadow-sm text-bg-dark" style={{ height: "20rem", overflow: "hidden" }}>
          <Carousel controls={false} indicators={false} interval={2000}>
            {images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img}
                  className="d-block w-100"
                  alt={title}
                  style={{ height: "20rem", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="card-img-overlay d-flex align-items-end p-">
            <h5 className="text-white w-100 text-center bg-dark rounded">{title}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
