import React from 'react';
import { QRCodeCanvas } from "qrcode.react";

function QRcodeGenerator({title, value}) {
    return (
        <div className="text-center">
            <h5>{title}</h5>
            <QRCodeCanvas
                value={value}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
            />
        </div>
    )
}
export default QRcodeGenerator;