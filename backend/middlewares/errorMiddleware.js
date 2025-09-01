import { ApiError } from "../utils/ApiError";

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
    // Handle custom API errors
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }

    // Log error for debugging
    console.error(`Error: ${err.message}`);
    
    // Prepare error response
    const statusCode = 500;
    const response = {
        success: false,
        message: err.message || "Internal Server Error",
    };
    
    // Include stack trace in development environment
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }
    
    res.status(statusCode).json(response);
};

export { notFound, errorHandler };
