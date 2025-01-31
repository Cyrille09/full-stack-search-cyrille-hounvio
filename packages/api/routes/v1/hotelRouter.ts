import { Router } from "express";
const router = Router();
import hotelsController from "controllers/hotelsController";

router.get("/:id", hotelsController.get);
router.get("/", hotelsController.gets);

export default router;
