import React from 'react';


function SelectionMenu(props) {

    const handleGameSelection = (event) => {
        // console.log(event.target.value);
        props.onSelectionChange(event.target.value)
    }

    return (
        <div className='row'>
            <div className="d-flex mb-3 input-group">
                <span className="input-group-text"> {props.heading}  </span>
                <select className="custom-select" value={props.selectedValue} onChange={handleGameSelection}>
                    <option value={props.defaultValue} selected  style={{ fontSize: "12px" }}>Select a {props.defaultValue}</option>
                    {props.items.map(item =>
                        <option value={typeof item === "object" && item.id ? item.id : item}  style={{ fontSize: "12px" }}>
                            {typeof item === "object" && item.label ? item.label : item}
                        </option>
                    )}
                </select>
            </div>
        </div>

    )
}
export default SelectionMenu;