// src/errors/customErrors.js

export class NotFoundError extends Error {
  constructor(message = "리소스를 찾을 수 없습니다.", data = null) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.errorCode = "NOT_FOUND";
    this.data = data;
  }
}

export class ConflictError extends Error {
  constructor(message = "이미 존재하는 항목입니다.", data = null) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
    this.errorCode = "CONFLICT";
    this.data = data;
  }
}

export class BadRequestError extends Error {
  constructor(message = "요청이 잘못되었습니다.", data = null) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
    this.errorCode = "BAD_REQUEST";
    this.data = data;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "인증되지 않았습니다.", data = null) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
    this.errorCode = "UNAUTHORIZED";
    this.data = data;
  }
}

export class ForbiddenError extends Error {
  constructor(message = "권한이 없습니다.", data = null) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
    this.errorCode = "FORBIDDEN";
    this.data = data;
  }
}
