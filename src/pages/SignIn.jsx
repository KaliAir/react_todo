import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/Auth'

const SignIn = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await signIn(formData)

    if(error) {
      alert('error signing in')
    } else {
      navigate('/')
    }
  }

  return (
    <Row className='d-flex justify-content-center'>
      <Col md={6}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your registered email" onChange={(e) => setFormData({...formData, email: e.target.value})}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" onChange={(e) => setFormData({...formData, password: e.target.value})}></Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">Sign In</Button>
        </Form>

        <p className='mt-3'>
          No account yet? <Link to="/signup">sign up!</Link>
        </p>
      </Col>
    </Row>
  )
}

export default SignIn