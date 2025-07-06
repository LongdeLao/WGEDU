# WG-EDU REST API

A simple REST API server written in Go. 

## Project Structure

```
wg-edu/
├── api/
│   ├── handlers/    # API endpoint handlers
│   └── middleware/  # HTTP middleware components
├── config/          # Application configuration
└── main.go          # Application entry point
```

## Getting Started

### Prerequisites

- Go 1.16 or later

### Running the Server

1. Clone the repository:

```bash
git clone https://github.com/longdelao/wg-edu.git
cd wg-edu
```

2. Run the server:

```bash
go run main.go
```

The server will start on port 8080 by default. You can change the port by setting the `PORT` environment variable:

```bash
PORT=3000 go run main.go
```

## API Endpoints

- `GET /`: Welcome message
- `GET /health`: Health check endpoint

## Environment Variables

- `PORT`: The port on which the server will listen (default: 8080)

## Adding New Endpoints

To add new endpoints, create handler functions in the `api/handlers` package and register them in `main.go`.

## License

[MIT](LICENSE) 