# Backend API Documentation

Welcome to the documentation for our URL shortener backend service.

## Endpoints

### POST /shorten

Shorten a long URL.

#### Request Body

```json
{
  "longUrl": "https://example.com/very/long/url/that/needs/shortening"
}
```

#### Response

```json
{
  "shortUrl": "http://yourdomain.com/abc"
}
```

## Usage

To use this service, make HTTP requests to the appropriate endpoints as described above.

Example using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"longUrl": "https://example.com/very/long/url/that/needs/shortening"}' http://localhost:3000/shorten
```

## Author

Your Name
