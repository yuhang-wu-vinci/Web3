import { db } from "./src/prisma/db.ts";

async function main() {
  console.log("Peuplement de la base de données en cours...");

  // Insertion des données initiales via l'API v8
  await db.orm.public.Expense.createAll([
    {
      description: "Groceries",
      payer: "Alice",
      amount: 45.5,
    },
    {
      description: "Dinner with friends",
      payer: "Bob",
      amount: 82.0,
    },
    {
      description: "Cinema tickets",
      payer: "Charlie",
      amount: 24.0,
    },
  ]);

  console.log("Données insérées avec succès !");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });