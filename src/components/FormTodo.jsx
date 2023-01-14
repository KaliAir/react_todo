import React from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/actions';
import { Form, Button } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import { supabase } from '../supabase'
import { useAuth } from '../contexts/Auth'

const FormTodo = () => {
  const dispatch = useDispatch()
  const { session } = useAuth()

  console.log(session)

  const emptyTodo = {
    user: session?.user.id,
    code: nanoid(),
    name: '',
    completed: false
  }

  const [newTodo, setNewTodo] = React.useState(emptyTodo);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTodo) return;

    supabase
      .from('todos')
      .insert(newTodo)
      .single()
      .then(({ data, error }) => {
        if(!error) {
          dispatch(addTodo(newTodo));
          setNewTodo({ ...newTodo, code: nanoid(), name: '' });
        }
      })
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Add Todo</Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        ></Form.Control>
      </Form.Group>
      <Button variant="primary" className="my-3" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default FormTodo