import Router from "express";
import { FileControllerV1 } from "../../controllers/v1/file.controller";


const router = Router();

router.get("/folders/:folderId/files", FileControllerV1.getByFolder);
router.post("/files", FileControllerV1.create);
router.delete("/files/:id", FileControllerV1.delete);

export default router;