import { Router } from "express";
import { z } from "zod";
import { register, login } from "../controllers/authController.ts";
import { validate } from "../middleware/validation.ts";
import { insertUserSchema } from "../db/schema.ts";

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.email("Invalid email format"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username too long"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Routes
router.post("/register", validate(insertUserSchema, "body"), register);
router.post("/login", validate(loginSchema, "body"), login);

export default router;
