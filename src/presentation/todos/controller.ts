import type { Request, Response } from "express"


const todos = [
    { id: 1, text: 'Buy Milk', createAr: new Date() },
    { id: 2, text: 'Buy Coco', createAr: null },
    { id: 3, text: 'buy Cooket', createAr: new Date() },
];

export class TodosController {

    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos)
    };

    public getTodoById = (req: Request, res: Response) => {

        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) }

        const id = +req.params.id
        if (isNaN(id)) { return res.status(400).json({ error: 'El argumento añadido no es un numero' }) }

        const todo = todos.find(todo => todo.id === id)
        todo ? res.json(todo) : res.status(404).json({ error: 'numero no encontrado' });

    };

    public createTodo = (req: Request, res: Response) => {

        const { text } = req.body;
        if (!text) return res.status(400).json('Debes agregar texto');

        const newTodo = {
            id: todos.length + 1,
            text: text,
            createAr: null
        }

        todos.push(newTodo)

        res.json(newTodo)

    };

    public updateTodo = (req: Request, res: Response) => {

        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) }

        const id = +req.params.id
        if (isNaN(id)) { return res.status(400).json({ error: 'El argumento añadido no es un numero' }) }

        const todo = todos.find(todo => todo.id === id)
        if (!todo) { return res.status(400).json({ error: 'numero no encontrado' }) }

        const { text, createAt } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' })

        todo.text = text || todo.text;
        todo.createAr = createAt || todo.createAr;

        res.json(todo);
    };


    public deleteTodo = (req: Request, res: Response) => {

        if (!req.params.id) { return res.status(404).json({ error: 'El parametro es obligatorio' }) }

        const id = +req.params.id
        if (isNaN(id)) { return res.status(400).json({ error: 'El argumento añadido no es un numero' }) }

        const todo = todos.find(todo => todo.id === id)
        if (!todo) { return res.status(404).json({ error: 'numero no encontrado' }) }


        todos.splice(todos.indexOf(todo), 1)
        res.status(200).json('Todo eliminado')

    };


}