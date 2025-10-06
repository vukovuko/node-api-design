import type { Request, Response, NextFunction } from "express";
import { type ZodType } from "zod";

// A single function to create a validator for any part of the request

export const validate = (
  schema: ZodType,
  source: "body" | "params" | "query"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req[source]);

      if (!result.success) {
        return res.status(400).json({
          error: `Invalid ${source}`,
          details: result.error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }

      if (source === "body") {
        // 'body' can be replaced directly
        req.body = result.data;
      } else {
        // 'params' and 'query' must be mutated in-place to be safe
        Object.assign(req[source], result.data);
      }

      next();
    } catch (error) {
      // If any other unexpected error occurs, pass it to the Express error handler
      next(error);
    }
  };
};
