//import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom'
import router from './router/index.js'

function App() {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
