import { db } from "./src/prisma/db.ts";

async function main() {
  console.log("Peuplement de la base de données en cours...");

  // 1. Création des utilisateurs initiaux
  const alice = await db.orm.public.User.create({
    name: "Alice",
    email: "alice@example.com",
    bankAccount: "BE1234567890",
  });

  const bob = await db.orm.public.User.create({
    name: "Bob",
    email: "bob@example.com",
    bankAccount: "BE0987654321",
  });

  const charlie = await db.orm.public.User.create({
    name: "Charlie",
    email: "charlie@example.com",
  });

  // 2. Insertion des dépenses avec le nouveau modèle relationnel
  await db.orm.public.Expense.createAll([
    {
      description: "Groceries",
      amount: 45.5,
      payerId: alice.id,
    },
    {
      description: "Dinner with friends",
      amount: 82.0,
      payerId: bob.id,
    },
    {
      description: "Cinema tickets",
      amount: 24.0,
      payerId: charlie.id,
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