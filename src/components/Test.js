import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

function Test() {
    const temp = () => {
        console.log(document.getElementById("test"));
    }
    // useEffect(()=>{
    //     console.log(document.getElementById('test'))
    // })

    return (
        <div>
        <div className="show text-center text-white" value="xxx">
            
        </div>
        <button id='test' className="mybtn" onClick={temp}>Test</button>
        </div>
    )
}
export default Test;