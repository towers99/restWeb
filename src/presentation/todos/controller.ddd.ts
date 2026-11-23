import type { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import type { TodoRepository } from "../../domain/index.js";

export class TodosController {

    constructor(

        private readonly todoRepository: TodoRepository,

    ) { };

    public getTodos = async (req: Request, res: Response) => {

        const todos = await this.todoRepository.getAll()
        return res.json(todos);

    };

    public getTodoById = async (req: Request, res: Response) => {

        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) };
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.findById(id);
            return res.json(todo)
        } catch (error) {
            return res.status(400).json({ error })
        };

    };

    public createTodo = async (req: Request, res: Response) => {

        //Validacion de que venga data en el body
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error: 'Text property is required' })

        const todo = await this.todoRepository.create(createTodoDto!)
        res.json(todo);

    };

    public updateTodo = async (req: Request, res: Response) => {



        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) }

        const id = +req.params.id
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
        if (error) return res.status(400).json({ error });


        const updateTodo = await this.todoRepository.updateById(updateTodoDto!)
        return res.json(updateTodo);

    };


    public deleteTodo = async (req: Request, res: Response) => {

        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) }
        const id = +req.params.id;
        if (isNaN(id)) { return res.status(400).json({ error: 'El argumento añadido no es un numero' }) }

        const deletedTodo = await this.todoRepository.deleteById(id);
        return res.json(deletedTodo)

    };


}