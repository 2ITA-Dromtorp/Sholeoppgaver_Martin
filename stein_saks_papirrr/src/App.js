import logo from './logo.svg';
import './App.css';
import spiller_ukjent from './images/maskin_ukjent.png' 



function App() {
  return (
    
    <div className='container'>

      <div className='player1'>

        <img src={spiller_ukjent} alt="spiller ukjent"/>

      </div>

      <div className='result'>

          Vinner ukjent

      </div>

      <div className='maschine'>

      <img src={spiller_ukjent} alt="spiller ukjent"/>

      </div>
      

    </div>

  );
}

export default App;
