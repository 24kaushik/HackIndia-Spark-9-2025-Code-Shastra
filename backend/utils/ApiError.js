export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  static internal(message) {
    return new ApiError(message || "Internal Server Error", 500);
  }

  static badRequest(message) {
    return new ApiError(message || "Bad Request", 400);
  }

  static unauthorized(message) {
    return new ApiError(message || "Unauthorized", 401);
  }

  static notFound(message) {
    return new ApiError(message || "Not Found", 404);
  }

  static forbidden(message) {
    return new ApiError(message || "Forbidden", 403);
  }
}
