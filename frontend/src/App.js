import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes';
import { Provider } from 'react-redux'
import store from './redux/store';
import Admin from './pages/admin';
import Partner from './pages/partner';

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
              <Route path='/admin' element={<ProtectedRoutes><Admin /></ProtectedRoutes>} />
              <Route path='/partner' element={
                <ProtectedRoutes>
                  <Partner />
                </ProtectedRoutes>
              }/>
            </Routes>
        </BrowserRouter>  
      </Provider>
    </div>
  );
}

export default App;
