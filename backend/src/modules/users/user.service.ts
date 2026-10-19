import { UserRepository } from "./user.repository.js";

export interface ICreateUser{
    username: string;
    email: string;
    password: string;
}

export interface IUpdateUser{
  username?: string;
  password?: string;
}

export class UserService {
  private userRepository = new UserRepository();

  async get(){
    const users = await this.userRepository.findAll();

    return users;
  }

  async getById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async create(data: ICreateUser) {
    const existingUser =
      await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Password hashing would happen here.

    return this.userRepository.create(data);
  }

  async update(id: string, data: IUpdateUser){
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return this.userRepository.update({
      id: id,
      ...data
    });
  }

  async delete(id: string){
    const user = this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return this.userRepository.delete(id);
  }
}