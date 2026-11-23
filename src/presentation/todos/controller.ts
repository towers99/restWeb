import type { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo, type TodoRepository } from "../../domain/index.js";

export class TodosController {

    constructor(

        private readonly todoRepository: TodoRepository,

    ) { };

    public getTodos = (req: Request, res: Response) => {

        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }))

    };

    public getTodoById = (req: Request, res: Response) => {

        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) };
        const id = +req.params.id;

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))

    };

    public createTodo =  (req: Request, res: Response) => {

        //Validacion de que venga data en el body
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error: 'Text property is required' })

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))

    };

    public updateTodo = (req: Request, res: Response) => {



        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) }

        const id = +req.params.id
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
        if (error) return res.status(400).json({ error });

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))
        

    };


    public deleteTodo = (req: Request, res: Response) => {

        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) }
        const id = +req.params.id;
        if (isNaN(id)) { return res.status(400).json({ error: 'El argumento añadido no es un numero' }) }

        new DeleteTodo(this.todoRepository)
          .execute(id)
          .then(todo => res.json(todo))
          .catch(error => res.status(400).json({error}))

    };


}