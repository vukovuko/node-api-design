import { Router } from "express";
import { z } from "zod";
import { authenticateToken } from "../middleware/auth.ts";
import { validate } from "../middleware/validation.ts";
import {
  changePassword,
  getProfile,
  updateProfile,
} from "../controllers/userController.ts";

const router = Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Validation schemas
const updateProfileSchema = z.object({
  email: z.email("Invalid email format").optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username too long")
    .optional(),
  firstName: z.string().max(50, "First name too long").optional(),
  lastName: z.string().max(50, "Last name too long").optional(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

// Routes
router.get("/profile", getProfile);
router.put("/profile", validate(updateProfileSchema, "body"), updateProfile);
router.put("/password", validate(changePasswordSchema, "body"), changePassword);

export default router;
