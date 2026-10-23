import express from 'express';
import cors from 'cors';
import expensesRouter from './routes/expenses.router.ts';
import usersRouter from "./routes/users.router.ts";
import categoriesRouter from './routes/categories.router.ts';

const app = express();

// Autorise localhost pour le dev et n'importe quel domaine Render pour la production
app.use(
  cors({
    origin: ['http://localhost:5173', /\.onrender\.com$/],
  })
);

app.use(express.json());

// Montage du routeur sur le préfixe /api
app.use('/api', expensesRouter);
app.use("/api", usersRouter);
app.use("/api",categoriesRouter);

// Port dynamique pour Render (ou 3000 en local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;