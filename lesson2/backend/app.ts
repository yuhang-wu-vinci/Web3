import express from 'express';
import cors from 'cors';
import expensesRouter from './routes/expenses.router.ts';

const app = express();

// Autorise localhost pour le dev et n'importe quel domaine Render pour la production
app.use(
  cors({
    origin: ['http://localhost:5173', /\.onrender\.com$/],
  })
);

app.use(express.json());
app.use('/api', expensesRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

export default app;