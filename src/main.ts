import * as dotenv from "dotenv";
import * as express from "express";
import { Request, Response } from 'express';
import * as path from 'path';

dotenv.config({
    path: __dirname.substring(0, __dirname.search("backend"))
        .concat(path.join("backend", ".env"))
});

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOST = process.env.HOST ?? "localhost"


app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', '404.html'))
})


app.get('*', (req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Not found' });
    res.end();
});

app.listen(PORT, HOST, () => {
    console.log(`Starting Server at ${HOST}:${PORT}`);
});
