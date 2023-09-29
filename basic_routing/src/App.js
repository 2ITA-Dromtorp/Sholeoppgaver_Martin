import logo from './logo.svg';
import './App.css';
import Elev from './elev';

function App() {
 
  return (
     <div className='container'>

      <div className='lerer'>
        <Elev name='lerer' />
      </div>

      <div className='forsterad'>
      <Elev name='Martin' />

      <Elev name='Mathias' />

      <Elev name='Kevin'/>

      <Elev name='Andreas'/>

      </div>

      <div className='andrerad'>

      <Elev name='Falk'/>

           <Elev name='Sander'/>

           <Elev name='Ylva'/>

           <Elev name='vanessa'/>

           <Elev name='Chen'/>
        
        </div>

        <div className='tredjerad'>
        <Elev name='Luz'/>

        <Elev name='Fridjolf'/>
          
        
      </div>

     
      

     </div>
  );
}

export default App;
