import { eq } from "drizzle-orm";
import { db } from "../../config/database.js";
import { categories } from "../../db/schema/categories.js";


export class CategoryRepository {
  async findAll(){
    return db.query.categories.findMany();
  }

  async findById(id: string) {
    return db.query.categories.findFirst({
      where: eq(categories.id, id),
    });
  }

  async findByUser(userId: string) {
    return db.query.categories.findMany({
      where: eq(categories.userId, userId),
    });
  }

  async create(data: {
    userId: string;
    title: string;
  }) {
    const [category] = await db
      .insert(categories)
      .values(data)
      .returning();

    return category;
  }

  async update(data:{
    id: string;
    userId: string;
    title?: string;
  }) {
    const [category] = await db
      .update(categories)
      .set(data)
      .where(eq(categories.id, data.id))
  }

  async delete(id: string){
    await db.delete(categories).where(eq(categories.id, id));
  }
}