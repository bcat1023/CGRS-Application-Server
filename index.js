console.log(`
░█████╗░░░░░██████╗░░░░██████╗░░░░░██████╗  ██╗░░░██╗██████╗░
██╔══██╗░░░██╔════╝░░░░██╔══██╗░░░██╔════╝  ██║░░░██║╚════██╗
██║░░╚═╝░░░██║░░██╗░░░░██████╔╝░░░╚█████╗░  ╚██╗░██╔╝░░███╔═╝
██║░░██╗░░░██║░░╚██╗░░░██╔══██╗░░░░╚═══██╗  ░╚████╔╝░██╔══╝░░
╚█████╔╝██╗╚██████╔╝██╗██║░░██║██╗██████╔╝  ░░╚██╔╝░░███████╗
░╚════╝░╚═╝░╚═════╝░╚═╝╚═╝░░╚═╝╚═╝╚═════╝░  ░░░╚═╝░░░╚══════╝
`)
require('colors');
console.log('STOP: THIS PROJECT IS STILL UNDER DEVELOPMENT AND IS PRONE TO CRASHES, THIS PROJECT STILL CONTAINS KNOWN BUGS THAT WILL CAUSE SERVER CRASHES AND UNEXPECTED BEHAVIOR\n '.red)
console.log('STOP: This is a pre-alpha release, it is not to be used in production'.red)
console.log(`
    █▄░█ █▀█ █░█░█   █ █▄░█ █ ▀█▀ █ ▄▀█ █░░ █ ▀█ █ █▄░█ █▀▀ ░ ░ ░
    █░▀█ █▄█ ▀▄▀▄▀   █ █░▀█ █ ░█░ █ █▀█ █▄▄ █ █▄ █ █░▀█ █▄█ ▄ ▄ ▄
    `)
var path = require('node:path')
var process = require('node:process')
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis')
var express = require('express');
const { Console } = require('node:console');
var app = express()
require('dotenv').config()
var debug = false;
console.log("✓ Modules loaded".green);
if(process.argv[3] = 'test') {
    console.log('𝒾 Debug mode enabled'.yellow)
    var debug = true
} else {
    var debug = false;
}

app.get('/', (res, req) => {
    // Display cover page
})

// Authenticate with Google and get an authorized client.
const auth = new GoogleAuth({
    keyFile: path.join(process.cwd(), 'credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});
console.log("✓ Auth for Google Sheets API loaded".green);

app.get('/gallery/:id', async (req, res) => {
    var galleryID = parseInt(req.params.id)
    if(debug) {console.log(`𝒾 Request made for gallery ${req.params.id}`.yellow)}
    // Input sanitization, making sure inputs are valid and not potentially malicious
    var input = parseInt(req.params.id);
    if (Number.isInteger(input) == false) {
        res.status(400)
        res.end(JSON.stringify({ "Error": 400, "Fault": "The server recieved invalid data or malformed syntax" }))
        return console.error(`HTTP 400, Request falied to pass input sanitization because input was not a integer. Offending Input: ${req.params.id}`.red)
    } // Check if input is an integer
    if (String(input).length > 1) {
        res.status(413)
        res.end(JSON.stringify({ "Error": 413, "Fault": "Gallery ID is far to long to be a valid ID, either the condition in the code has not been updated to reflect new ID sizes, or this is an invalid ID on account of its size" }))
        return console.error(`HTTP 413, Request falied to pass input sanitization because input was too long to be a valid ID. Offending Input: ${req.params.id}`.red)
    } // Check if input is of valid length
    if (galleryID === 1) {
        res.status(403)
        res.end(JSON.stringify({"Error": 403, "Fault": "Pen testing is prohibited, but if you do anyways and find something, please let me know at admin@nookalley.com"}))
        return console.error(`Someone is pentesting the server!!! Offending GalleryID ${galleryID}`.red)
    }
    if(debug) {console.log('𝒾 Gallery ID passed sanitization checks'.yellow)}

    // Connect to database and pull records
    const sheets = google.sheets({ version: 'v4', auth });

    async function getRecord() {
        // Create a new Sheets API client.
        if(debug) {console.log('𝒾 Reading rows from database, please wait...'.yellow)}
        var returnedData = await sheets.spreadsheets.values.get({
            spreadsheetId: `${process.env.SPREADSHEET_ID}`,
            range: `Galleries!${galleryID}:${galleryID}`
        })
        if(debug) {console.log('𝒾 Row was read successfully from database'.yellow)}
        var rows
        try {
            var rows = returnedData.data.values[0];
        } catch(err) {
            console.error(`HTTP 404, Found no data in the database for gallery ${galleryID}`.red)
            res.status(404)
            return res.end(JSON.stringify({ "Error": "404", "Fault": "Record could not be found in database" }))
        } // Error handiling in the event of a 404
        return processRecord(rows)
    }

    async function processRecord(RecordArray) {
        if(debug){console.log(RecordArray)}
        if(debug) {console.log('𝒾 Row is now being converted into a record and processed'.yellow)}
        var JSONrecord = {
            "system": RecordArray[0],
            "status": RecordArray[1],
            "paid": RecordArray[2],
            "name": RecordArray[3],
            "location": RecordArray[4]
        }
        if(debug) {console.log(JSONrecord)}
        var record = JSONrecord
        if (record.system == 'Pic-Time') {
            record.location = 'https://photos2.nookalley.com/-' + record.location
        } 
        if (record.system == 'Immich') {
            record.location = 'https://photos1.nookalley.com/share/' + record.location
        } 
        if(debug) {console.log('𝒾 Processed record is now available!'.yellow)}
        return sendRows(record)
    }
    async function sendRows(record) {
        res.status(200)
        res.end(JSON.stringify(record)) // Send data to client when complete      
    }
    getRecord()
})
console.log("✓ Server ready, listening on port 8000!".green);
console.log(`
░█████╗░░░░░██████╗░░░░██████╗░░░░░██████╗  ░█████╗░███╗░░██╗██╗░░░░░██╗███╗░░██╗███████╗██╗
██╔══██╗░░░██╔════╝░░░░██╔══██╗░░░██╔════╝  ██╔══██╗████╗░██║██║░░░░░██║████╗░██║██╔════╝██║
██║░░╚═╝░░░██║░░██╗░░░░██████╔╝░░░╚█████╗░  ██║░░██║██╔██╗██║██║░░░░░██║██╔██╗██║█████╗░░██║
██║░░██╗░░░██║░░╚██╗░░░██╔══██╗░░░░╚═══██╗  ██║░░██║██║╚████║██║░░░░░██║██║╚████║██╔══╝░░╚═╝
╚█████╔╝██╗╚██████╔╝██╗██║░░██║██╗██████╔╝  ╚█████╔╝██║░╚███║███████╗██║██║░╚███║███████╗██╗
░╚════╝░╚═╝░╚═════╝░╚═╝╚═╝░░╚═╝╚═╝╚═════╝░  ░╚════╝░╚═╝░░╚══╝╚══════╝╚═╝╚═╝░░╚══╝╚══════╝╚═╝
`.green)
app.listen('8000')