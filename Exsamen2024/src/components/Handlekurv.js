import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../handlevogn.css';

export default function Handlekurv() {
    const [dataArray, setDataArray] = useState([]);
    const [idArray, setIdArray] = useState([]);
    const [resultArray, setResultArray] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [formData, setFormData] = useState({
        bedriftsNavn: '',
        fornavn: '',
        etternavn: '',
        epost: '',
        tlf: '',
        betaling: '',
        firmaadresse: '',
        leveringssted: ''
    });
    
    const navigate = useNavigate();
 
    function toomHandlekurv(){
        sessionStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        async function fetchData() {
            const produktid = JSON.parse(sessionStorage.getItem("produktId") || '[]');
            if (!produktid.length) {
                console.log("No product IDs in session storage");
                return; // Early return if no IDs are stored
            }
            setIdArray(produktid);
    
            try {
                const response = await axios.post('/handlekurv', { data: produktid });
                const result = response.data;
                setDataArray(result);
    
                const dataMap = new Map(result.map(item => [item.ID, item]));
                const newArray = produktid.map(id => dataMap.get(parseInt(id, 10))).filter(item => item !== undefined);
    
                setResultArray(newArray);
                let sum = newArray.reduce((acc, item) => acc + item.pris, 0);
                setTotalSum(sum);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    
        fetchData();
    }, []);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    function betal(e) {
        e.preventDefault();
    
        const { bedriftsNavn, fornavn, etternavn, epost, tlf, betaling, firmaadresse, leveringssted } = formData;
        if (!bedriftsNavn || !fornavn || !etternavn || !epost || !tlf || !betaling || !firmaadresse || !leveringssted) {
            alert('All fields must be filled');
            return;
        }
    
        axios.post('/betal', {
            data: idArray,
            pris: totalSum,
            bedriftsNavn,
            fornavn,
            etternavn,
            epost,
            tlf,
            betaling,
            firmaadresse,
            leveringssted
        }).then(response => {
            console.log(response.data);
            sessionStorage.clear();
            sessionStorage.setItem("bestillingsNummer", response.data.bestillingsNummer);
            sessionStorage.setItem("data", response.data.data);
            sessionStorage.setItem("pris", response.data.pris);
            navigate('/kvittering');
        }).catch(error => {
            console.error("Error during payment processing:", error);
            alert('Feil under betalingsprosessen. Vennligst prøv igjen.');
        });
    }

    return (
        <div>
            <div className='handlekurvNav'>
                <div className='sumDiv'>
                    <h2>Total sum: {totalSum} kr</h2>
                </div>
                <div className='betalingsDiv'>
                    <p onClick={betal}>Betal her:</p>
                    <a className='betalingsKnapp' onClick={betal} href='#'>
                        <img src='https://cdn-assets-cloud.frontify.com/s3/frontify-cloud-files-us/eyJwYXRoIjoiZnJvbnRpZnlcL2ZpbGVcLzd4S0w5VGFRTllOUXY1NGRCNVpZLnN2ZyJ9:frontify:m-Br4GDyYZXU4MDviU3OgRpo9n0wqlkyHVXUlv_q63k?width=370'/>
                    </a>
                </div>
            </div>
            <div className='pageContainer'>
                <div className='toomHandlekurvDiv'>
                    <button className='toomHandlekurv' onClick={toomHandlekurv}>Tøm handlekurv</button>
                </div>
                <form className='handlekurvForm' onSubmit={betal}>
                    <input id='bedriftsNavn' placeholder='Bedriftsnavn' type='text' value={formData.bedriftsNavn} onChange={handleChange}></input>
                    <input id='fornavn' placeholder='Fornavn' type='text' value={formData.fornavn} onChange={handleChange}></input>
                    <input id='etternavn' placeholder='Etternavn' type='text' value={formData.etternavn} onChange={handleChange}></input>
                    <input id='epost' placeholder='E-post' type="email" value={formData.epost} onChange={handleChange}></input>
                    <input id='tlf' placeholder='Tlf. nummer' type="number" value={formData.tlf} onChange={handleChange}></input>
                    <input id='betaling' placeholder='Betalingsmetode' type='text' value={formData.betaling} onChange={handleChange}></input>
                    <input id='firmaadresse' placeholder='Firmakontor adresse' type='text' value={formData.firmaadresse} onChange={handleChange}></input>
                    <input id='leveringssted' placeholder='Leveringssted' type='text' value={formData.leveringssted} onChange={handleChange}></input>
                    <input type='submit'></input>
                </form>
                <div className='itemContainer'>
                    {resultArray.map((item, index) => (
                        <div key={index}>
                            <div className='item'>
                                <img className='itemImage' src={item.bildeBane}/>
                                <h2>{item.produktNavn}</h2>
                                <p>{item.pris} kr</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
