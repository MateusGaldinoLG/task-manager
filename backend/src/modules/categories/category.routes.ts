import type { FastifyInstance } from "fastify";
import { CategoryController } from "./category.controller.js";


export async function categoryRoutes(app: FastifyInstance){
    const controller = new CategoryController();

    app.get("/categories/:id", controller.getById.bind(controller));

    app.get("/categories", controller.get.bind(controller))

    app.post("/categories", controller.create.bind(controller));

    app.patch("/categories/:id", controller.update.bind(controller));

    app.delete("/categories/:id", controller.delete.bind(controller));
}