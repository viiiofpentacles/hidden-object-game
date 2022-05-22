import { Link, Outlet } from 'react-router-dom';
import './styles/App.css';

function App () {
  return (
    <div className='app-container'>
      <nav>
        <Link to="/">Instructions</Link>
        <Link to="game">Play!</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
