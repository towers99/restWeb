import type { Request, Response } from "express"
import { prisma } from "../../data/postgres/index.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";

export class TodosController {

    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany()
        res.status(200).json(todos);
    };

    public getTodoById = async(req: Request, res: Response) => {

        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) }

        const id = +req.params.id
        if (isNaN(id)) { return res.status(400).json({ error: 'El argumento añadido no es un numero' }) }

        const todo = await prisma.todo.findUniqueOrThrow({

            where: {
                id
            }

        })

        todo ? res.json(todo) : res.status(404).json({ error: 'numero no encontrado' });

    };

    public createTodo = async (req: Request, res: Response) => {

        //Validacion de que venga data en el body
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error : 'Text property is required'})

        //Manera de agregar datos a la Db
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        //Retornamos lo que agregamos
        return res.json(todo)

    };

    public updateTodo = async(req: Request, res: Response) => {

     

        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) }

        const id = +req.params.id

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id})

        if(error) return res.status(400).json({error});


        const todo = await prisma.todo.update({
            where: {
                id
            },
            data: updateTodoDto!.values
        });

        if (!todo) { return res.status(400).json({ error: 'numero no encontrado' }) }

        return res.json(todo);

    };


    public deleteTodo = async(req: Request, res: Response) => {

        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) }

        const id = +req.params.id
        if (isNaN(id)) { return res.status(400).json({ error: 'El argumento añadido no es un numero' }) }

        const todo = await prisma.todo.delete({
            where: {
                id
            }
        });

        if (!todo) { return res.status(404).json({ error: 'numero no encontrado o ya fue eliminado' }) }

        res.status(200).json('Todo eliminado')

    };


}