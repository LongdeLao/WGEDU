package handlers

import (
	"encoding/json"
	"net/http"
)

// Response represents a standard API response
type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

// SendJSONResponse sends a JSON response with the given status code
func SendJSONResponse(w http.ResponseWriter, statusCode int, response Response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
	}
}

// HealthCheck handles the health check endpoint
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	response := Response{
		Status: "healthy",
	}
	
	SendJSONResponse(w, http.StatusOK, response)
} 