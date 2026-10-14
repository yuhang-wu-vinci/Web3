import express from 'express';
import cors from 'cors';
import expensesRouter from './routes/expenses.ts';

const app = express();

// Configuration stricte de CORS pour autoriser le port Vite par défaut
app.use(
  cors({
    origin: ['http://localhost:5173'],
  })
);

// Middleware obligatoire pour parser le corps JSON des requêtes POST
app.use(express.json());

// Montage du routeur sous le préfixe /api
app.use('/api', expensesRouter);

// --- AJOUTEZ CECI ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;