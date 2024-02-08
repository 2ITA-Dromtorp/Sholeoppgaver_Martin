import './App.css';
import Sex from './quiz.js';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Sex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
