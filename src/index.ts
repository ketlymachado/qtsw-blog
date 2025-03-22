import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;
const LIMIT_PER_PAGE = 5;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/posts", async (req, res) => {
	try {
		const page = Number(req.query.page) || 1; 
		const limit = Number(req.query.limit) || LIMIT_PER_PAGE;
		const skip = (page - 1) * limit;  

		const posts = await prisma.post.findMany({
			skip: skip,
			take: limit,
		});

		const totalPosts = await prisma.post.count();

		const totalPages = Math.ceil(totalPosts / limit);

		res.json({ posts, totalPages });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: "Failed to retrieve posts", message: error });
	}
});

app.post("/posts", async (req, res) => {
	const content = req.body.content;

	if (!content) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: "Content is required" });
		return;
	}

	try {
		const post = await prisma.post.create({
			data: { content },
		});
		res.status(StatusCodes.CREATED).json(post);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: "Failed to add post", message: error });
	}
});

app.put("/posts/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const content = req.body.content;

	if (!content) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: "Content is required" });
		return;
	}
  
	try {
		const updatedPost = await prisma.post.update({
			where: { id: parseInt(id) },
			data: { content },
		});
		res.json(updatedPost);
	} catch (error) {
		console.error("Error updating post:", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update post" });
	}
});

app.delete("/posts/:id", async (req, res: Response) => {
	const { id } = req.params;
	try {
		await prisma.post.delete({
			where: { id: parseInt(id) },
		});
		res.status(StatusCodes.NO_CONTENT).send();
	} catch (error) {
		console.error("Error deleting post:", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete post" });
	}
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));