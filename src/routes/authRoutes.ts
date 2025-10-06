import { Router } from "express";

const router = Router();

router.post("/auth", (req, res) => {
  res.json({ message: "auth" });
});

export default router;
