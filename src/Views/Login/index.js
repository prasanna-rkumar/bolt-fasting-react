import { Form, Button, Container, Col, Card } from 'react-bootstrap';
import { auth, GoogleAuthProvider } from '../../firebase';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import styles from './Login.module.css';
import { useState } from 'react';

const Login = () => {
  const loginWithGmail = (e) => {
    e.preventDefault();
    auth.signInWithPopup(new GoogleAuthProvider()).then(async (userCredential) => {
      axios({
        method: 'POST',
        url: 'http://localhost:8042/login',
        headers: { authorization: `Bearer ${await auth.currentUser.getIdToken()}` },
        data: {
          name: userCredential.user.displayName,
          email: userCredential.user.email
        }
      }).then((resp) => {
        console.log(resp)
      }).catch(e => {
        console.log(e)
      })
    })
  }

  return (
    <Container>
      <Col style={{
        maxWidth: 384,
        margin: 'auto',
        paddingTop: '10%'
      }}>
        <Card>
          <Card.Body>
            <Card.Title>
              <h2 style={{ textAlign: 'center' }}>Bolt Fasting</h2>
            </Card.Title>
            <Button onClick={loginWithGmail} className={styles.SocialLoginButton} style={{ background: '#4F86F7' }} variant="primary" block>
              <FcGoogle size={28} className={styles.SocialIcon} />Login with Google
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

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

export default Login;
