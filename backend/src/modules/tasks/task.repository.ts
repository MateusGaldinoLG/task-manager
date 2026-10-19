import { eq } from "drizzle-orm";
import { db } from "../../config/database.js";
import { tasks } from "../../db/schema/tasks.js";


export class TaskRepository{
    async findAll(){
        return db.query.tasks.findMany();
    }

    async findById(id: string){
        return db.query.tasks.findFirst({
            where: eq(tasks.id, id),
        })
    }

    async findByUser(userId: string){
        return db.query.tasks.findFirst({
            where: eq(tasks.userId, userId),
        })
    }

    async findByCategory(categoryId: string){
        return db.query.tasks.findFirst({
            where: eq(tasks.categoryId, categoryId),
        })
    }

    async create(data: {
        userId: string;
        title: string;
        description: string;
        categoryId: string;
        rank: number;
        isFinished: boolean;
        deadline: Date;
    }){
        const [task] = await db
            .insert(tasks)
            .values(data)
            .returning();

        return task;
    }

    async update(data: {
        id: string;
        title: string;
        description: string;
        categoryId: string;
        rank: number;
        isFinished: boolean;
        deadline: Date;
    }) {
        const [task] = await db
            .update(tasks)
            .set(data)
            .where(eq(tasks.id, data.id))
    }

    async delete(id: string){
        await db.delete(tasks).where(eq(tasks.id, id));
    }
}