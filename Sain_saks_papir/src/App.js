import logo from './logo.svg';
import './App.css';

import ukjent from './images/maskin_ukjent.png'
import spiller_papir from './images/spiller_papir.png'
import spiller_stein from './images/spiller_stein.png'
import spiller_saks from './images/spiller_saks.png'
import maskin_papir from './images/maskin_papir.png'
import maskin_stein from './images/maskin_stein.png'
import maskin_saks from './images/maskin_saks.png'

import { useState } from 'react'; 



function App() {

  const [playerChoice, setPlayerChoice] = useState(ukjent)
  const [machineChoice, setMachineChoice] = useState(ukjent)
  const [winner, setWinner] = useState('Ukjent')


  function Stein() {
    setPlayerChoice(spiller_stein);
  }

  function Saks() {
    setPlayerChoice(spiller_saks);
  }

  function Papir() {
    setPlayerChoice(spiller_papir);
  }

  function Spill() {

    let myArray = [maskin_stein, maskin_saks, maskin_papir];

    let randomNumber = Math.floor(Math.random() * 3);

    let maschineChoice_temp = myArray[randomNumber];
    
    setMachineChoice(maschineChoice_temp)
  }

  return (
    
    <div className='container'>

    <div className='top'>
        <div className='player1'>

          <img src={playerChoice} alt="spiller ukjent"/>

        </div>

        <div className='result'>

            {winner}

        </div>

          <div className='maschine'>

            <img src={machineChoice} alt="spiller ukjent"/>

          </div>

      </div>

      <div className='bottom'>

          <button className="button" onClick={Stein}>Stein</button>
          <button className="button" onClick={Saks}>Saks</button>
          <button className="button" onClick={Papir}>Papir</button>
          <button className="button" onClick={Spill}>Spill</button>


        </div>

        
        

    </div>

  );
}

export default App;
