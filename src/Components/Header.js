import avatar from '../assets/avatar.svg'
import {useContext} from 'react'
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
  const {logout} = useContext(AuthContext);
  return (
    <nav style={{
      height: 60,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div className="primary" style={{
        display: 'flex'
      }}>
        <img alt="Logo" src="/logo.svg" />
        <span style={{
          fontWeight: 'bold',
          fontStyle: 'italic',
          fontSize: 18,
          marginLeft: 16,
          textTransform: 'uppercase'
        }}>Bolt Fasting</span>
      </div>
      <img onClick={logout} src={avatar} alt="user" />
    </nav>
  );
}

export default Navbar;
