import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('Todo Route Testing', () => {

    beforeAll(async () => {

        await testServer.start();

    });



    afterAll(() => {

        testServer.close();

    });

    beforeEach(async () => {

        await prisma.todo.deleteMany();

    })

    const todo1 = {
        text: 'Hola mundo 1'
    };

    const todo2 = {
        text: 'Hola mundo 2'
    };


    it('Should return Todos api/todos', async () => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        });

        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200)

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        console.log(body.length)
        expect(body[0].text).toBe(todo1.text);

    });


    it('Should return Todos api/todos/:id', async () => {

        const data = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(testServer.app)
            .get(`/api/todos/${data.id}`)
            .expect(200)

        expect(body).toEqual({
            id: data.id,
            text: data.text,
            completedAt: data.createAr
        });

    });

    it('Should return a 404 NotFound api/todos/:id', async () => {

        const todoID = 67;
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todoID}`)
            .expect(404)

        expect(body).toEqual({ error: `Todo with id ${todoID} not found` })

    });


    it('Should return a new Todo api/todos', async () => {

        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        })

    });


    it('Should return an error if text is not valid api/todos', async () => {

        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400)

        expect(body).toEqual({ error: "Text property is required" })

    });


    it('Should return an update Todo api/todos/:id', async () => {

        const todo = await prisma.todo.create({ data: todo1 })

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: "Hola Mundo", completedAt: null })
            .expect(200)

        expect(body).toEqual({
            id: expect.any(Number),
            text: "Hola Mundo",
            completedAt: null
        })

    });


    it('Should return an update not found api/todos/:id', async () => {

        const todoID = 67;
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todoID}`)
            .send({ text: "Hola Mundo", completedAt: null })
            .expect(404)

    });


    it('Should delete a todo api/todos/:id', async () => {

        const todo = await prisma.todo.create({ data: todo1 })

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200)

        expect(body).toEqual({
            "completedAt": todo.createAr,
            "id":todo.id,
            "text": todo.text,
        });
        
    });


    it('Should return 404 if todo do not exist api/todos/:id', async () => {

        const { body } = await request(testServer.app)
            .delete(`/api/todos/2212`)
            .expect(404)

        expect(body).toEqual({"error": "Todo with id 2212 not found"});

    });





});

