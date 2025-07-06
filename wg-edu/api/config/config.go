package config

import (
	"os"
	"strconv"
)

// Config holds all configuration for the application
type Config struct {
	Server ServerConfig
}

// ServerConfig holds server-specific configuration
type ServerConfig struct {
	Port string
}

// New returns a new Config struct
func New() *Config {
	return &Config{
		Server: ServerConfig{
			Port: getEnv("PORT", "8080"),
		},
	}
}

// getEnv gets an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

// getEnvAsInt gets an environment variable as an integer or returns a default value
func getEnvAsInt(key string, defaultValue int) int {
	valueStr := getEnv(key, "")
	if value, err := strconv.Atoi(valueStr); err == nil {
		return value
	}
	return defaultValue
}

// getEnvAsBool gets an environment variable as a boolean or returns a default value
func getEnvAsBool(key string, defaultValue bool) bool {
	valueStr := getEnv(key, "")
	if value, err := strconv.ParseBool(valueStr); err == nil {
		return value
	}
	return defaultValue
} 