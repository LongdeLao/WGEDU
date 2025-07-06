package main

import (
	"fmt"
	"log"
	"net/http"
	
	"github.com/longdelao/wg-edu/api/handlers"
	"github.com/longdelao/wg-edu/api/middleware"
	"github.com/longdelao/wg-edu/config"
)

func main() {
	// Load configuration
	cfg := config.New()
	
	// Create a new router
	router := http.NewServeMux()
	
	// Register routes
	router.HandleFunc("/", homeHandler)
	router.HandleFunc("/health", handlers.HealthCheck)
	
	// Create a middleware chain
	handler := middleware.Logger(middleware.CORS(router))
	
	// Start the server
	fmt.Printf("Server starting on port %s...\n", cfg.Server.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.Server.Port, handler))
}

// homeHandler handles the root endpoint
func homeHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	
	response := handlers.Response{
		Status:  "success",
		Message: "Welcome to the API",
	}
	
	handlers.SendJSONResponse(w, http.StatusOK, response)
} 