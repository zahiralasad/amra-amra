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
                    <option value="game" selected>Select a game</option>
                    {props.items.map(item =>
                        <option value={item.id}>{item.label}</option>
                    )}                   
                </select>
            </div>
        </div>

    )
}
export default SelectionMenu;