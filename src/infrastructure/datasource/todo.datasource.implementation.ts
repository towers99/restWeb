import { prisma } from "../../data/postgres/index.js";
import { CustomError } from "../../domain/index.js";
import { TodoEntity, type CreateTodoDto, type TodoDatasource, type UpdateTodoDto } from "../../domain/index.js";


export class TodoDataSourceImpl implements TodoDatasource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
         const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject(todo);
    };

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObject(todo));
    };

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({

            where: {
                id
            }

        });

        if (!todo) throw new CustomError(`Todo with id ${id} not found`, 404);
        return TodoEntity.fromObject(todo);

    };

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {

        await this.findById(updateTodoDto.id);

        const updateTodo = await prisma.todo.update({
            where: {
                id: updateTodoDto.id
            },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject(updateTodo);

    };

    async deleteById(id: number): Promise<TodoEntity> {
        
         await this.findById(id);

         const deleteById = await prisma.todo.delete({
            where : {
                id: id
            }
         });

         return TodoEntity.fromObject(deleteById);

    };

}