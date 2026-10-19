import type { FastifyReply, FastifyRequest } from "fastify";
import { TaskService, type ICreateTask, type IUpdateTask } from "./task.service.js";


export class TaskController{
    private taskService = new TaskService();

    async get(
        request: FastifyRequest,
        reply: FastifyReply
    ){
        const tasks = this.taskService.get();

        return reply.send(tasks);
    }

    async getById(
        request: FastifyRequest<{
            Params: {id: string};
        }>,
        reply: FastifyReply
    ){
        const task = await this.taskService.getById(request.params.id);

        return reply.send(task);
    }

    async getByUser(
        request: FastifyRequest<{
            Params: {userId: string};
        }>,
        reply: FastifyReply
    ){
        const task = await this.taskService.getByUser(request.params.userId);

        return reply.send(task);
    }

    async getByCategory(
        request: FastifyRequest<{
            Params: {categoryId: string};
        }>,
        reply: FastifyReply
    ){
        const task = await this.taskService.getByCategory(request.params.categoryId);

        return reply.send(task);
    }

    async create(
        request: FastifyRequest,
        reply: FastifyReply
    ){
        const task = await this.taskService.create(request.body as ICreateTask);

        return reply.code(201).send(task);
    }

    async update(
        request: FastifyRequest<{
            Params: {id: string};
        }>,
        reply: FastifyReply
    ){
        const task = await this.taskService.update(request.params.id, request.body as IUpdateTask);

        return reply.code(201).send(task);
    }

    async delete(
        request: FastifyRequest<{
            Params: {id: string};
        }>,
        reply: FastifyReply
    ){
        const task = await this.taskService.delete(request.params.id);

        return reply.send(task);
    }
}