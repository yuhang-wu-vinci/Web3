import { db } from "../src/prisma/db.ts";

async function seedCategories() {
  const initialCategories = [
    { name: "Food", colour: "#FF5733" },
    { name: "Transport", colour: "#33A8FF" },
    { name: "Housing", colour: "#33FF57" },
    { name: "Leisure", colour: "#F333FF" },
  ];

  for (const cat of initialCategories) {
    const existing = await db.orm.public.Category.where(({ name }) =>
      name.eq(cat.name)
    ).all();

    if (existing.length === 0) {
      await db.orm.public.Category.create(cat);
      console.log(`Catégorie créée : ${cat.name}`);
    } else {
      console.log(`Catégorie déjà existante : ${cat.name}`);
    }
  }

  console.log("Catégories prêtes !");
}

seedCategories()
  .catch((err) => {
    console.error("Erreur lors de l'insertion des catégories :", err);
    process.exit(1);
  });