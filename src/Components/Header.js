import avatar from '../assets/avatar.svg'
import { auth } from '../firebase';

const Navbar = () => {
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
        <span className="text-primary font-bold italic text-lg ml-4 uppercase">Bolt Fasting</span>
      </div>
      <img onClick={() => auth.signOut()} src={avatar} alt="user" />
    </nav>
  );
}

export default Navbar;
