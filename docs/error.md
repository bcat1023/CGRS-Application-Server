# List of internal codes
## Error Code Ranges
| Error Code Range | Meaning |
| :--------------- | :------ |
| 0xx | Runtime/NodeJS Errors |
| 1xx | GalleryID lookup errors |
| 2xx | Database errors |

## 0xx Error Code Range
| 0xx Error Code | Meaning | Potenial Cause |
| :--------------- | :------ | :-
| 001 | A .env file could not be found | Either the file does not exist, is in the wrong location, or is named wrong  |
| 002 | A credential.json file could not be found | Either the file does not exist, is in the wrong location, or is named wrong
| 003 | The .env file does not contain a spreadsheet ID | File is either empty or syntax is invalid

## 1xx Error Code Range
| 1xx Error Code | Meaning | Potenial Cause |
| :--------------- | :------ | :-
| 100 | GalleryID was not a integer | Bad QR Code scan or corrupted QR code, modified link or pen testing |
| 101 | GalleryID was longer than 1 charecter |
| 102 | A GalleryID of 1 is invalid |
| 103 | A GalleryID of 0 is invalid |

## 2xx Error Code Range
| 2xx Error Code | Meaning |
| :--------------- | :------ |
| 201 | Record not found in database |
