const express = require('express');
const cors = require('cors');

const {v4: uuidv4} = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const {username} = request.headers;

  const userDoesNotExist = !users.some((user) => user.username === username);

  if (userDoesNotExist) {
    return response.status(404).json({
      error: 'User does not exist',
    });
  }

  next();
}

app.post('/users', (request, response) => {
  const {name, username} = request.body;

  const usernameAlreadyInUse = users.some((user) => user.username === username);

  if (usernameAlreadyInUse) {
    return response.status(400).json({
      error: 'Username already in use!',
    });
  }

  users.push({
    id: uuidv4,
    name,
    username,
    todos: [],
  });

  response.status(201).json({message: 'User created successfully'});
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const {username} = request.headers;

  const {todos} = users.find((user) => user.username === username);

  console.log(todos);

  response.status(200).json({todos});
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
