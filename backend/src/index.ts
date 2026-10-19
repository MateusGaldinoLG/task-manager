import fastify from "fastify";
import { userRoutes } from "./modules/users/user.routes.js";
import { categoryRoutes } from "./modules/categories/category.routes.js";
import { taskRoutes } from "./modules/tasks/task.routes.js";


export async function buildApp(){
    const prefix = "/api";
    const server = fastify({
        logger: true,
    });

    await server.register(userRoutes, {
        prefix: prefix,
    })

    await server.register(categoryRoutes, {
        prefix: prefix
    })

    await server.register(taskRoutes, {
        prefix: prefix
    })

    return server;
}