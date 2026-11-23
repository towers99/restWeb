import { Router } from "express";
import { TodosController } from "./controller.js";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.implementation.js";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/repository.datasource.impl.js";


export class TodoRoutes {

  static get routes():Router {

    const router = Router();

    const datasource = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource);

    const todoController = new TodosController(todoRepository);


      router.get('/', todoController.getTodos);
      router.get('/:id', todoController.getTodoById);
      router.post('/', todoController.createTodo)
      router.put('/:id', todoController.updateTodo)
      router.delete('/:id', todoController.deleteTodo)



    return router;
  }

}