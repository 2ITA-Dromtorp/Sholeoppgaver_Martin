  import '../kantineStyles.css';
  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import Handlekurv from './Handlekurv';

  export default function Products() {
    const [merchData, setMerchData] = useState([]);
   
    useEffect(() => {
        const produktIdFromSession = JSON.parse(sessionStorage.getItem("produktId")) || sessionStorage.getItem("produktId");
        if(produktIdFromSession==null || produktIdFromSession.length && produktIdFromSession.length<1) sessionStorage.setItem("produktId",JSON.stringify([]));
 
        axios.get('/mat').then((response) => {
            console.log(response.data)
            setMerchData(response.data)
            console.log(merchData)
        })
       
 
 
    }, [onloadstart])
 
 
    function bestill(e){
        const arrayOfId = JSON.parse(sessionStorage.getItem("produktId"));
        console.log(arrayOfId)
        console.log(e.target.id)
        arrayOfId.push(e.target.id)
        sessionStorage.setItem("produktId", JSON.stringify(arrayOfId));
    }
 
    return (
        <div className='pageContainer'>
            <div className='itemContainer'>
                {merchData.map((merch) => (
                    <div className='item' id={merch.produktID2}><img className='itemImage' src={merch.bildeBane}/><h2>{merch.produktNavn}</h2><p>{merch.pris},-</p>{merch.antall > 0 ? <p>{merch.antall} på lager</p> : <p>Ikke på lager.</p>}            {merch.antall > 0 ? <button id={merch.ID} className='bestillKnapp' onClick={(e) => bestill(e)}>Bestill</button> :null}</div>
                ))}
            </div>
        </div>
    );
}
