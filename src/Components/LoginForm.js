import { Form, Button } from 'react-bootstrap';
import { auth } from '../../firebase';
import axios from 'axios';
import { useState } from 'react';

const EmailLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithEmail = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then(async (userCredential) => {
      axios.post('/register', { headers: { authorization: `Bearer ${await auth.currentUser.getIdToken()}` } }).then((resp => {
        console.log(resp)
      }))
    })
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      <Button onClick={loginWithEmail} variant="primary" type="submit" block>
        Login
      </Button>
    </Form>
  );
};

export default EmailLoginForm;
