import { eq } from "drizzle-orm";
import { db } from "../../config/database.js";
import { users } from "../../db/schema/index.js";

export class UserRepository {
  async findAll(){
    return db.query.users.findMany();
  }

  async findById(id: string) {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async findByEmail(email: string) {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async create(data: {
    username: string;
    email: string;
    password: string;
  }) {
    const [user] = await db
      .insert(users)
      .values(data)
      .returning();

    return user;
  }

  async update(data:{
    id: string;
    username?: string;
    password?: string;
  }) {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, data.id))
  }

  async delete(id: string){
    await db.delete(users).where(eq(users.id, id));
  }
}