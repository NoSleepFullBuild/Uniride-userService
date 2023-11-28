import express from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
