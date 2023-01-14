import { SET_TODOS, ADD_TODO, REMOVE_TODO, COMPLETE_TODO } from "./types";

export const setTodos = (payload) => {
  return {
    type: SET_TODOS,
    payload
  }
}

export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload
  }
}

export const removeTodo = (payload) => {
  return {
    type: REMOVE_TODO,
    payload
  }
}

export const completeTodo = (payload) => {
  return {
    type: COMPLETE_TODO,
    payload
  }
}