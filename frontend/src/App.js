import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes';
import { Provider } from 'react-redux'
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element=
            {
              <ProtectedRoutes>
                <Home/>
              </ProtectedRoutes>
            }/>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>  
      </Provider>
    </div>
  );
}

export default App;
