import { Router } from "express";
import { z } from "zod";
import { authenticateToken } from "../middleware/auth.ts";
import { validate } from "../middleware/validation.ts";
import {
  createTag,
  deleteTag,
  getPopularTags,
  getTagById,
  getTagHabits,
  getTags,
  updateTag,
} from "../controllers/tagController.ts";

const router = Router();
router.use(authenticateToken); // Apply authentication to all routes below

// Validation schemas
const createTagSchema = z.object({
  name: z.string().min(1, "Tag name is required").max(50, "Name too long"),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex color")
    .optional(),
});

const updateTagSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex color")
    .optional(),
});

const uuidSchema = z.object({
  id: z.uuid("Invalid tag ID format"),
});

router.get("/", getTags);
router.get("/popular", getPopularTags);
router.get("/:id", validate(uuidSchema, "params"), getTagById);

// Admin/User routes (authenticated users can manage tags)
router.post("/", validate(createTagSchema, "body"), createTag);
router.put(
  "/:id",
  validate(uuidSchema, "params"),
  validate(updateTagSchema, "body"),
  updateTag
);
router.delete("/:id", validate(uuidSchema, "params"), deleteTag);

// User-specific routes
router.get("/:id/habits", validate(uuidSchema, "params"), getTagHabits);

export default router;
