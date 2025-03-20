import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	INTERNAL_SERVER_ERROR: 500,
};

router.get("/posts", async (req, res) => {
	try {
		const posts = await prisma.post.findMany();
		res.status(HTTP_STATUS.OK).json(posts);
	} catch (error) {
		console.error("Error retrieving posts:", error);
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve posts" });
	}
});

router.post("/posts", async (req, res) => {
	const content = req.body.content;

	if (!content) {
		res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Content is required" });
		return;
	}

	try {
		const post = await prisma.post.create({
			data: { content },
		});
		res.status(HTTP_STATUS.CREATED).json(post);
	} catch (error) {
		console.error("Error creating post:", error);
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to add post" });
	}
});

router.put("/posts/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const content = req.body.content;

	if (!content) {
		res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Content is required" });
		return;
	}

	try {
		const updatedPost = await prisma.post.update({
			where: { id: parseInt(id) },
			data: { content },
		});
		res.status(HTTP_STATUS.OK).json(updatedPost);
	} catch (error) {
		console.error("Error updating post:", error);
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to update post" });
	}
});

router.delete("/posts/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await prisma.post.delete({
			where: { id: parseInt(id) },
		});
		res.status(HTTP_STATUS.NO_CONTENT).send();
	} catch (error) {
		console.error("Error deleting post:", error);
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete post" });
	}
});

export default router;
