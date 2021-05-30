import { Button, Container, Col, Card } from 'react-bootstrap';
import { auth, GoogleAuthProvider } from '../../firebase';
import { FcGoogle } from 'react-icons/fc';
import styles from './Login.module.css';

const Login = () => {
  const loginWithGmail = (e) => {
    e.preventDefault();
    auth.signInWithPopup(new GoogleAuthProvider())
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

export default Login;
