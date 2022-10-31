import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Converter from './components/Converter/Converter';
import ListValute from './components/ListValute/ListValute';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Menu />}>
          <Route path='/list' element={<ListValute />} />
          <Route path='/converter' element={<Converter />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
