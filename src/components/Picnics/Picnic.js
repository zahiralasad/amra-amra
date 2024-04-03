import FormfacadeEmbed from "@formfacade/embed-react";
import React from "react";
import "./picnic.css"


function Picnic() {
    return (
        <div className='picnic'>
        <FormfacadeEmbed
            formFacadeURL="https://formfacade.com/include/103563602636070968160/form/1FAIpQLSdKYrX9MZrFUOvGnlez0lWdhHJND2RlbCsyuXkmkUqPrKV89w/classic.js/?div=ff-compose"
            onSubmitForm={() => console.log('Form submitted')}
        />
        </div>
    )
}
export default Picnic;
