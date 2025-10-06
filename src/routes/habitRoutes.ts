import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "habit" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Got one habit by id ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "created habit" });
});

router.delete("/:id", (req, res) => {
  res.status(204).send();
});

router.post("/:id/complete", (req, res) => {
  res.status(200).json({ message: "completed habit" });
});

export default router;
