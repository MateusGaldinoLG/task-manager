import type { FastifyReply, FastifyRequest } from "fastify";
import { UserService, type ICreateUser, type IUpdateUser } from "./user.service.js"

export class UserController {
  private userService = new UserService();

  async get(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const users = await this.userService.get();

    return reply.send(users);
  }

  async getById(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ) {
    const user = await this.userService.getById(request.params.id);

    return reply.send(user);
  }

  async create(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const user = await this.userService.create(request.body as ICreateUser);

    return reply.code(201).send(user);
  }

  async update(
    request: FastifyRequest<{
      Params: {id: string}
    }>,
    reply: FastifyReply
  ) {
    const user = await this.userService.update(request.params.id, request.body as IUpdateUser);

    return reply.code(201).send(user);
  }

  async delete(
    request: FastifyRequest<{
      Params: {id: string}
    }>,
    reply: FastifyReply
  ) {
    const user = await this.userService.delete(request.params.id);

    return reply.send(user);
  }
}