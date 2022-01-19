const express = require("express")
const router = express.Router();
const {getAllPosts, createPost, getSinglePost, deletePost, updatePost} = require("../controllers/post")

router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id",deletePost);

module.exports = router;