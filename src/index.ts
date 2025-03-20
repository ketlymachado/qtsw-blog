import express from "express";
import postsRoutes from "./routes/posts";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(postsRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
