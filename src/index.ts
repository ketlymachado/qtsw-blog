import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/posts", async (req, res) => {
	try {
		const page = Number(req.query.page) || 1; 
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;  

		const posts = await prisma.post.findMany({
            skip: skip,
            take: limit,
        });

		const totalPosts = await prisma.post.count();

		const totalPages = Math.ceil(totalPosts / limit);

		res.json({ posts, totalPages });
	} catch (error) {
		const internalServerError = 500;
		res.status(internalServerError).json({ error });
	}
});

/**este metodo cria um post */
app.post("/posts", async (req, res) => {
	const content = req.body.content;

	if (!content) {
		const BadRequest = 400;
		res.status(BadRequest).json({ error: "Content is required" });
		return;
	}

	try {
		const post = await prisma.post.create({
			data: { content },
		});
		const success = 201;
		res.status(success).json(post);
	} catch (error) {
		const internalServerError = 500;
		res.status(internalServerError).json({ error });
	}
});

app.put("/posts/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const content = req.body.content;

	if (!content) {
		const BadRequest = 400;
		res.status(BadRequest).json({ error: "Content is required" });
		return;
	}
  
	try {
		const updatedPost = await prisma.post.update({
			where: { id: parseInt(id) },
			data: { content },
		});
		res.json(updatedPost);
	} catch (error) {
		const internalServerError = 500;
		console.error("Error updating post:", error);
		res.status(internalServerError).json({ error: "Failed to update post" });
	}
});

app.delete("/posts/:id", async (req, res: Response) => {
	const { id } = req.params;
	try {
		await prisma.post.delete({
			where: { id: parseInt(id) },
		});
		const noContent = 500;
		res.status(noContent).send();
	} catch (error) {
		const internalServerError = 500;
		console.error("Error deleting post:", error);
		res.status(internalServerError).json({ error: "Failed to delete post" });
	}
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
