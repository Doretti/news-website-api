import { Router } from "express";
import auth from "./auth/auth.route";
import news from "./news/news.route";
import users from "./users/users.route";

const router = Router();

router.use("/users", users);
router.use("/news", news);
router.use("/auth", auth);

export default router;
