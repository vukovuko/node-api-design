import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  res.json({ message: "registered" });
});

router.post("/login", (req, res) => {
  res.json({ message: "login" });
});

export default router;
