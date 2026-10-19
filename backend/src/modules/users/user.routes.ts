import type { FastifyInstance } from "fastify";
import { UserController } from "./user.controller.js";

export async function userRoutes(app: FastifyInstance) {
  const controller = new UserController();

  app.get("/users/:id", controller.getById.bind(controller));

  app.get("/users", controller.get.bind(controller))

  app.post("/users", controller.create.bind(controller));

  app.patch("/users/:id", controller.update.bind(controller));

  app.delete("/users/:id", controller.delete.bind(controller));
}