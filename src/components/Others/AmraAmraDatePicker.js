import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AmraAmraDatePicker({value, date, placeHolderText, onDateChange}) {
    const [selectedDate, setSelectedDate] = useState(date);
    const handleDateSelected = (date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        setSelectedDate(formattedDate);

        // Pass the formatted date back to parent component
        if (onDateChange) {
            onDateChange(formattedDate);
        }
    }

    return (
        <div className="text-white">
            <DatePicker
            selected = {selectedDate}
            onChange={handleDateSelected}
            dateFormat = "yyyy-MM-dd"
            popperPlacement="bottom-start"
            className="form-control form-control-sm"
            name={value}
            placeholderText= {placeHolderText}
            portalId="root-portal"
            />
        </div>
    )
}
export default AmraAmraDatePicker;