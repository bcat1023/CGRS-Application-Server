# List of internal codes
## Error Code Ranges
| Error Code Range | Meaning |
| :--------------- | :------ |
| 0xx | ExpressJS Errors |
| 1xx | GalleryID lookup errors |
| 2xx | Database errors |

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
