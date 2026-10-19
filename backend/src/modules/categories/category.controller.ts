import type { FastifyReply, FastifyRequest } from "fastify";
import { CategoryService, type ICreateCategory, type IUpdateCategory } from "./category.service.js";


export class CategoryController{
    private categoryService = new CategoryService();

    async get(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const categories = this.categoryService.get();

        return reply.send(categories);
    }

    async getById(
        request: FastifyRequest<{
            Params: {id: string};
        }>,
        reply: FastifyReply
    ) {
        const category = await this.categoryService.getById(request.params.id);

        return reply.send(category);
    }

    async getByUser(
        request: FastifyRequest<{
            Params: {userId: string};
        }>,
        reply: FastifyReply
    ) {
        const categories = await this.categoryService.getByUser(request.params.userId);

        return reply.send(categories);
    }

    async create(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const category = await this.categoryService.create(request.body as ICreateCategory);

        return reply.code(201).send(category);
    }

    async update(
        request: FastifyRequest<{
            Params: {id: string}
        }>,
        reply: FastifyReply
    ) {
        const category = await this.categoryService.update(request.params.id, request.body as IUpdateCategory);

        return reply.code(201).send(category);
    }

    async delete(
        request: FastifyRequest<{
            Params: {id: string}
        }>,
        reply: FastifyReply
    ) {
        const category = await this.categoryService.delete(request.params.id);

        return reply.send(category);
    }
}