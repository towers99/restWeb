import { describe, it, expect, vi } from 'vitest';
import {Server} from '../src/presentation/server.js';
import { envs } from '../src/config/envs.js';

vi.mock('../src/presentation/server');

describe('Testing App.ts', ()  => {

   it('Should call server with arguments and start', async () => {

    await import('../src/app.js')


    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port : envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: expect.any(Function),
      
    });

    expect(Server.prototype.start).toHaveBeenCalledWith();

   });

})