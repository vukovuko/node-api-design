import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "tag" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Got one tag by id ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "created tag" });
});

router.delete("/:id", (req, res) => {
  res.status(204).send();
});

export default router;
