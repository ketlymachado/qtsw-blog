import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;
const content = "Olá Mundo";

app.use(express.json())

app.use(express.static(path.join(__dirname, '../public')))

app.get('/posts', async (req, res) => {
    try {
        let posts = await prisma.post.findMany();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
});

app.post('/posts', async (req, res) => {
    const content = req.body.content;

    if (!content) {
        res.status(400).json({ error: 'Content is required' });
        return;
    }

    try {
        let post = await prisma.post.create({
            data: { content }
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add post' });
    }
});

app.put('/posts/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    let content = req.body.content

    if (!content) {
        res.status(400).json({ error: 'Content is required' });
        return;
    }
  
    try {
        const updatedpost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: { content }
        });
        res.json(updatedpost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

app.delete('/posts/:id', async (req, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))