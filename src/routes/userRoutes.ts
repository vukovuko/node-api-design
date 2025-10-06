import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "user" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Got one user by id ${req.params.id}` });
});

router.put("/:id", (req, res) => {
  res.json({ message: "updated user" });
});

router.delete("/:id", (req, res) => {
  res.status(204).send();
});

export default router;
