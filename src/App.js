import React, { useState } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, List, ListItem, ListItemText, TextField, Typography, IconButton, Checkbox, ListItemSecondaryAction, Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

// Define the styles using MaterialUi's makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100vh',
    maxWidth: '1000px',
  },
  heading: {
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
  dividerFullWidth: {
    margin: '5px 0 0 0',
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  }
}));

function App() {
  // Classes object using MaterialUi's makeStyles utility
  const classes = useStyles();
  // Create a list of todos
  const [todos, setTodos] = useState([]);
  // Create an object corresponding to the current, inprogress todo stored in the textField
  const [currentTodoText, setCurrentTodoText] = useState('');

  // Create a new todo based on the provided text
  function createNewTodo(text) {
    const newTodo = {
      id: 1,
      todo: text,
      isCompleted: false,
    };
    return newTodo
  }

  // Add a todo to our todos list
  function addTodo() {
    const clonedTodos = [...todos]
    const newTodo = createNewTodo(currentTodoText)
    clonedTodos.push(newTodo)
    setTodos(clonedTodos);
  }

  // Toggle the isCompleted flag on the todo
  function toggleComplete(todo) {
    todo.isCompleted = !todo.isCompleted;
  }

  // Delete the todo from our list
  function deleteTodo(todo) {
    const filteredTodos = [...todos].filter((t) => !(t.id === todo.id));
    setTodos(filteredTodos);
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h2" component="h1" className={classes.heading} gutterBottom>
        Todo List
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <TextField
          className={classes.input}
          value={currentTodoText}
          variant="outlined"
          onChange={(e) => setCurrentTodoText(e.target.value)}
        />
      </form>

      <List>
        <Divider inset className={classes.dividerFullWidth} />
        <li>
          <Typography
            className={classes.dividerInset}
            color="textSecondary"
            display="block"
            variant="caption"
          >
            Todos
          </Typography>
        </li>

        {todos.filter((todo) => !todo.isCompleted).map((todo, i) => (
          <ListItem button key={i}>
            <ListItemText>
              {todo.todo}
            </ListItemText>
            <ListItemSecondaryAction>
              <Checkbox checked={todo.isCompleted} value={todo.isCompleted} onClick={() => toggleComplete(todo)} />
              <IconButton onClick={() => deleteTodo(todo)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}

        {!_.isEmpty(todos.filter((todo) => todo.isCompleted)) && (
          <>
            <Divider inset className={classes.dividerFullWidth} />
            <li>
              <Typography
                className={classes.dividerInset}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Completed Items
              </Typography>
            </li>
          </>
        )}

        {todos.filter((todo) => todo.isCompleted).map((todo, i) => (
          <ListItem button key={i}>
            <ListItemText>
              {todo.todo}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={() => deleteTodo(todo)}>
                <DeleteIcon />
              </IconButton>
              <Checkbox checked={todo.isCompleted} onChange={() => toggleComplete(todo)} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
