import express, { Request, Response } from "express";
import cors from "cors";
import folderRoutesV1 from "./routes/v1/folder.routes";
import fileRoutesV1 from "./routes/v1/file.routes";

const app = express();
app.use(cors());
app.use(express.json());

// V1 routes
app.use("/api/v1", folderRoutesV1);
app.use("/api/v1", fileRoutesV1);


app.listen(4000, () => {
  console.log("🚀 Backend listening on http://localhost:4000");
});
