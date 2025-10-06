import { Router } from "express";
import { z } from "zod";
import { validate } from "../middleware/validation.ts";

const createHabitSchema = z.object({
  name: z.string(),
});

const router = Router();

router.get("/", async (req, res) => {
  res.status(200).json({ message: "habit" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Got one habit by id ${req.params.id}` });
});

router.post("/", validate(createHabitSchema, "body"), (req, res) => {
  res.status(201).json({ message: "created habit" });
});

router.delete("/:id", (req, res) => {
  res.status(204).send();
});

router.post("/:id/complete", (req, res) => {
  res.status(200).json({ message: "completed habit" });
});

export default router;
