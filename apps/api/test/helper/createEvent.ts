import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { IcreateEventRequestBody } from '../vars/testEvent';
import { createEventRequestBody } from '../vars/testEvent';

interface TcreateEvent {
  app: INestApplication;
  body?: IcreateEventRequestBody;
  accessToken: string;
}

const createEvent = async ({ app, body = createEventRequestBody }: TcreateEvent) => {
  const response = await request(app.getHttpServer()).post('/events').send(body).expect(200);

  expect(response.status).toBe(201);

  return response.body.id as string;
};

export default createEvent;
