import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

//Uppercase
fastify.post('/uppercase', (request, reply) => {
  const upperRaw = request.body.toLowerCase();
  if(upperRaw.includes('fuck')) {
    return reply.status(403).send('unresolved');
  }
  return reply.status(200).send(upperRaw.toUpperCase());
});
//Lowercase
fastify.post('/lowercase', (request, reply) => {
  const lowerRaw = request.body.toLowerCase();
  if(lowerRaw.includes('fuck')) {
    return reply.status(403).send('unresolved');
  }
  return reply.status(200).send(lowerRaw);
});
//Users:id
fastify.get('/user/:id', (request, reply) => {
  const id = +request.params.id
  if(users[id]) {
    return reply.send(users[id]);
  }
  else {
    return reply.status(400).send('User not exist')
  }
});
//Users
fastify.get('/users', (request, reply) => {
  const { filter, value } = request.query;
  const usersArray = Object.values(users);
  if(!{ filter, value }) {
    return reply.send(usersArray)
  }
  else {
    const filteredUsers = usersArray.filter((user) => {
      return user[filter] === user[value];
    })
    return reply.send(filteredUsers);
  }
});

export default fastify;

