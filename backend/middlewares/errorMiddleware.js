const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Not Found - ${req.originalUrl}`,
    });
};

const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`); // Log error for debugging

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack, // Show stack trace only in development
    });
};

export { notFound, errorHandler };
