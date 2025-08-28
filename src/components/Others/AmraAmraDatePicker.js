import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AmraAmraDatePicker({value, date, onChange}) {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateSelected = (date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        setSelectedDate(formattedDate);
    }

    return (
        <div className=" text-white">
            <DatePicker
            value = {date}
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