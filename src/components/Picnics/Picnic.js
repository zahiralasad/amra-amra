import React from "react";
import "./picnic.css"


function Picnic() {
    function handleClick()
    // {
    //     console.log("hi Tushar");
    //     const jsonData = { Name: 'Tushar', Email: 'zahiralasad@yahoo.com', Message: "Testing" };
    //     const url = 'https://script.google.com/macros/s/AKfycbzuIRWCi8806_XLgBqpc1l5YdDRpvwXVXAmNEgnW-m7C5I0pD699TOFz7vAGEKoUuaA/exec';
    //     const options = {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json' // Set content type to JSON
    //       },
    //       body: JSON.stringify(jsonData) // Convert JSON data to a string and set it as the request body
    //     };
    //     // Make the fetch request with the provided options
    //     // fetch(url, options)
    //     fetch('https://script.google.com/macros/s/AKfycbzuIRWCi8806_XLgBqpc1l5YdDRpvwXVXAmNEgnW-m7C5I0pD699TOFz7vAGEKoUuaA/exec', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(jsonData) // Convert JSON data to a string and set it as the request body
        
    //     })
    //       .then(response => {
    //         // Check if the request was successful
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    //         // Parse the response as JSON
    //         return response.json();
    //       })
    //       .then(data => {
    //         // Handle the JSON data
    //         console.log(data);
    //       })
    //       .catch(error => {
    //         // Handle any errors that occurred during the fetch

    //         console.error('Fetch error:', error);
    //       });
    
    // }
    {
      const url = 'https://script.google.com/macros/s/AKfycbzuIRWCi8806_XLgBqpc1l5YdDRpvwXVXAmNEgnW-m7C5I0pD699TOFz7vAGEKoUuaA/exec';
      // const url = "YOUR_GOOGLE_SHEET_API_URL"; // Replace this with your Google Sheets API URL
      const data = {
        // Your JSON data to be sent to the Google Sheet
        // Example:
        name: "John Doe",
        email: "john@example.com"
      };
  
      fetch(url, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          console.log('Data posted successfully');
        } else {
          throw new Error('Failed to post data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
    return (
        <div className='picnic'>
            <button onClick={handleClick}>Click me</button>
        </div>
    )


    




}
export default Picnic;
