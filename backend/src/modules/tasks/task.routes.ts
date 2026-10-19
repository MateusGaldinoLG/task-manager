import type { FastifyInstance } from "fastify";
import { TaskController } from "./task.controller.js";


export async function taskRoutes(app: FastifyInstance){
    const controller = new TaskController();

    app.get("/tasks", controller.get.bind(controller));

    app.get("/tasks/:id", controller.getById.bind(controller));

    app.get("/tasks/:userId", controller.getByUser.bind(controller));

    app.get("/tasks/:categoryId", controller.getByCategory.bind(controller));

    app.post("/tasks", controller.create.bind(controller));

    app.patch("/tasks/:id", controller.update.bind(controller));

    app.delete("/tasks/:id", controller.delete.bind(controller));
}