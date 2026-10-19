import { UserRepository } from "../users/user.repository.js";
import { CategoryRepository } from "./category.repository.js";

export interface ICreateCategory{
    userId: string;
    title: string;
}

export interface IUpdateCategory{
    userId: string;
    title?: string;
}

export class CategoryService {
    private categoryRepository = new CategoryRepository();
    private userRepository = new UserRepository();

    async get(){
        const categories = await this.categoryRepository.findAll();

        return categories;
    }

    async getById(id: string){
        const category = await this.categoryRepository.findById(id);

        if(!category){
            throw new Error(`Category with id ${id} not found`);
        }

        return category;
    }

    async getByUser(userId: string){
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new Error(`User with id ${userId} not found`);
        }

        const categories = await this.categoryRepository.findByUser(userId);

        return categories;
    }

    async create(data: ICreateCategory){
        let userId = data.userId;
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new Error(`User with id ${userId} not found`);
        }

        return this.categoryRepository.create(data);
    }

    async update(id: string, data: IUpdateCategory){
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new Error("Category not found");
        }

        let userId = data.userId;
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new Error(`User with id ${userId} not found`);
        }

        return this.categoryRepository.update({
            id: id,
            ...data
        });
    }

    async delete(id: string){
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new Error("Category not found");
        }

        return this.categoryRepository.delete(id);
    }
}