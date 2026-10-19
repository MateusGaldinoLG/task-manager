import { CategoryRepository } from "../categories/category.repository.js";
import { UserRepository } from "../users/user.repository.js";
import { TaskRepository } from "./task.repository.js";


export interface ICreateTask{
    userId: string;
    title: string;
    description: string;
    categoryId: string;
    rank: number;
    isFinished: boolean;
    deadline: Date;
}

export interface IUpdateTask{
    title: string;
    description: string;
    categoryId: string;
    rank: number;
    isFinished: boolean;
    deadline: Date;
}

export class TaskService {
    private taskRepository = new TaskRepository();
    private userRepository = new UserRepository();
    private categoryRepository = new CategoryRepository();

    async get(){
        const tasks = await this.taskRepository.findAll();
    }

    async getById(id: string){
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new Error("task not found");
        }

        return task;
    }

    async getByUser(userId: string){
        const user = await this.userRepository.findById(userId);
        
        if(!user){
            throw new Error(`User with id ${userId} not found`);
        }

        const task = await this.taskRepository.findByUser(userId);

        return task;
    }

    async getByCategory(categoryId: string){
        const category = await this.categoryRepository.findById(categoryId);
        
        if(!category){
            throw new Error(`category with id ${categoryId} not found`);
        }

        const task = await this.taskRepository.findByCategory(categoryId);

        return task;
    }

    async create(data: ICreateTask){
        let userId = data.userId;
        const user = await this.userRepository.findById(userId);

        let categoryId = data.categoryId;
        const category = await this.categoryRepository.findById(categoryId);
        

        if(!user){
            throw new Error(`User with id ${userId} not found`);
        }

        if(!category){
            throw new Error(`Category with id ${categoryId} not found`);
        }

        return this.taskRepository.create(data);
    }

    async update(id: string, data: IUpdateTask){
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new Error("task not found");
        }

        let categoryId = data.categoryId;
        const category = await this.categoryRepository.findById(categoryId);
        if(!category){
            throw new Error(`Category with id ${categoryId} not found`);
        }

        return this.taskRepository.update({
            id: id,
            ...data
        })
    }

    async delete(id: string){
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new Error("task not found");
        }

        return this.taskRepository.delete(id);

    }
}