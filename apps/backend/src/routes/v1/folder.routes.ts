import { Router } from "express";
import { FolderControllerV1 } from "../../controllers/v1/folder.controller";


const router = Router();

router.get("/folders", FolderControllerV1.getAll);
router.get("/folders/root", FolderControllerV1.getRoot);
router.delete("/folders/:id", FolderControllerV1.delete);
router.get("/folders/:id/children", FolderControllerV1.getChildren);
router.get("/folders/:id/path", FolderControllerV1.getPath);
router.post("/folders", FolderControllerV1.create);

export default router;