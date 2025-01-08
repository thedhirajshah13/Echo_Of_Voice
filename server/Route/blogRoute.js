import express from "express";
import ImageUpload from "../controller/imagehandle.js";

import { postBlog, getpost } from "../controller/blogcontroller.js";
import protectRoute from "../middleware/protectRoute.js";
import uploads from "../middleware/multer.js";

const blogRouter = express.Router();

blogRouter.post("/file/upload", uploads.single("file"), ImageUpload);
// blogRouter.get('/file/:filename',getimage)
blogRouter.post("/blogpost", protectRoute, postBlog);
blogRouter.get("/post", protectRoute, getpost);

export default blogRouter;
