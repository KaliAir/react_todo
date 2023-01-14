import { useDispatch } from "react-redux";
import { completeTodo, removeTodo } from '../store/actions'
import { ButtonGroup, Button } from "react-bootstrap";
import { supabase } from '../supabase'

const Todo = ({ todo }) => {
  const dispatch = useDispatch()

  const handleCompleteTodo = (e) => {
    e.preventDefault()

    supabase
      .from('todos')
      .update({ completed: !todo.completed, updated_at: new Date() })
      .match({ code: todo.code })
      .then(({ data, error }) => {
        if(!error) {
          dispatch(completeTodo(todo.code))
        }
      })
  }

  const handleRemoveTodo = (e) => {
    e.preventDefault()

    supabase
      .from('todos')
      .delete()
      .match({ code: todo.code })
      .then(({ error }) => {
        if(!error) {
          dispatch(removeTodo(todo.code))
        }
      })
    }

  return (
    <div className="todo">
      <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
        {todo.name}
      </span>
      <ButtonGroup>
        <Button
          variant={todo.completed ? "success" : "outline-success"}
          onClick={handleCompleteTodo}
        >
          ✓
        </Button>
        <Button variant="outline-danger" onClick={handleRemoveTodo}>
          x
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Todo