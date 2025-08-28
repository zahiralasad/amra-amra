import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AmraAmraDatePicker({value, onChange}) {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateSelected = (date) => {
        setSelectedDate(date);
    }

    return (
        <div className=" text-white">
            <DatePicker
            value = {value}
            selected = {selectedDate}
            onChange={handleDateSelected}
            dateFormat = "yyyy-MM-dd"
            popperPlacement="bottom-start"
            name={value}
            />
        </div>
    )
}
export default AmraAmraDatePicker;