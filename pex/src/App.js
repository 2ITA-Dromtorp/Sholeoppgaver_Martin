import logo from './logo.svg';
import './App.css';
import ErrorLog from './Error';
import BottomNavbar from './Navbar';
import TopNavbar from './TopNavbar.js';
function App() {
  return (
    <div>
      <div>
       <TopNavbar/>
      </div>
      <div className="App">
      <ErrorLog/>
    </div>
    <div>
    <BottomNavbar/>
    </div>
    </div>
  );
}

export default App;
