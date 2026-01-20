var express = require('express')
var app = express()

app.get('/', (res, req) => {
    // Display cover page
})

app.get('/gallery/:id', (req, res) => {
    // Input sanitization, making sure inputs are valid and not potentially malicious
    var input = parseInt(req.params.id);
    if (Number.isInteger(input) == false) {
        res.status(400)
        res.end(JSON.stringify({ "Error": 400, "Fault": "The server recieved invalid data or malformed syntax" }))
        throw new Error(`HTTP 400, Request falied to pass input sanitization because input was not a integer. Offending Input: ${req.params.id}`);
    } // Check if input is an integer
    if (String(input).length > 1) {
        res.status(413)
        res.end(JSON.stringify({ "Error": 413, "Fault": "Gallery ID is far to long to be a valid ID, either the condition in the code has not been updated to reflect new ID sizes, or this is an invalid ID on account of its size" }))
        throw new Error(`HTTP 413, Request falied to pass input sanitization because input was too long to be a valid ID. Offending Input: ${req.params.id}`);
    } // Check if input is of valid length

    let galleryID = req.params.id;
    // Connect to database and pull records
    // const response = 0; //await fetch(`https://api.com/fetch/row/${galleryID}?secret=${process.env.DATABASE_KEY}`)
    const exampleDatabase = [
        {
            1: {
                system: 'Immich',
                ready: 'Ready',
                paid: 'No',
                location: 'dgTuR4kTbo4Vibvw8PJn4_pqEWpDpv-Mov8AjVeKdDJBYzBOIINU8RobSwq4nFLG5Gk'
            },
            2: {
                system: 'Pic-Time',
                ready: 'true',
                paid: 'Yes',
                location: 'katrinadexter'
            }
        }
    ] // Temporary dummy response from dummy database (see line 12)
    var record = exampleDatabase[0][galleryID]; //await response.json() // Sets scope to body of response // Dummy responses from database
    if (record == undefined) {
        res.status(404)
        res.end(JSON.stringify({ "Error": "404", "Fault": "Record could not be found in database" }))
    } // If gallery is not found, return 404 error
    if(record.system == 'Pic-Time') {
        record.location = 'https://photos2.nookalley.com/-' + record.location 
    } if (record.system == 'Immich') {
        record.location = 'https://photos1.nookalley.com/share/' + record.location 
    } else {
        res.status('500')
        res.end(JSON.stringify({"Error": "Internal Error", "Fault": "Unable to determine system gallery is on"}))
    }
    res.status(200)
    res.end(JSON.stringify(record)) // Send data to client when complete
})

app.listen('8000')