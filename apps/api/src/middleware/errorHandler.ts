import type { NextFunction, Request, Response } from "express";

// Single error envelope per API_SPEC.md: { error: { code, message } }.
// No stack traces in production responses.

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: { code: "NOT_FOUND", message: "Resource not found" } });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: { code: err.code, message: err.message } });
    return;
  }
  res.status(500).json({ error: { code: "INTERNAL", message: "Something went wrong" } });
}
