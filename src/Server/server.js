const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const app = express();
const port = 3001;
app.use(bodyParser.json());

const sheets = google.sheets({
    version: 'v4',
    auth: 'YOUR_GOOGLE_SHEET_API_KEY',
})
app.post('/submit-form-data', async(req, res) => {
    try {
        const { name, email } = req.body;
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: 'YOUR_SPREADSHEET_ID',
            rang: 'Sheet1',
            valueInputOption: 'RAW',
            resource: {
                value: [[name,email]]
            },
        });
        console.log('Data appended:', response.data);
        res.send('Form data saved succeessfull');
    } catch(error){
        console.log('Error appending data: ', error);
        res.status().send('Error saving form data.')
    }
    });
    app.listen(port, () => 
        console.log('Server running on port ${port}'));
