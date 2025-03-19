import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

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
/**este metodo cria um post */
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
        res.status((500)).json({ error: 'Failed to add post' });
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
        const updated_post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: { content }
        });
        res.json(updated_post);
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

const resultado: number = (10 + 5); // Erro: esses parênteses desnecessarios

//exemplo da regra de função vazia do eslint
function funcaovazia() {
  
};
funcaovazia();

//exemplo incorreto da regra: 'eslint no-use-before-define': "error"
alert(a);
var a = 10;

{
    alert(c);
    let c = 1;
}

{
    class C extends C {}
}



app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))

