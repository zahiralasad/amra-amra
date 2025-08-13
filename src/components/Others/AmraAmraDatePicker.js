import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AmraAmraDatePicker() {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateSelected = (date) => {
        setSelectedDate(date);
    }

    return (
        <div className="text-white">
            <DatePicker
            selected = {selectedDate}
            onChange={handleDateSelected}
            dateFormat = "yyyy-MM-dd"
            popperPlacement="bottom-start"
            />
        </div>
    )
}
export default AmraAmraDatePicker;