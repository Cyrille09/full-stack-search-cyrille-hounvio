import { Router } from "express";
const router = Router();
import migrationController from "../db/startAndSeedMongoDB";

router.post("/", migrationController.insertData);

export default router;
