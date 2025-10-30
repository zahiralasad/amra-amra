import React from 'react';

function Cards(props) {
  return (
    <div className="col">
      <div className="card shadow-sm color-one text-bg-dark" style={{ height: "23rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center border-bottom border-4">
            {props.title}
          </h5>
          <p className="card-text">
            {props.description}
          </p>
          <div className="d-grid gap-2 bottom-center">
            {props.button5}
            {props.button4}
            {props.button3}
            {props.button2}
            {props.button1}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cards;