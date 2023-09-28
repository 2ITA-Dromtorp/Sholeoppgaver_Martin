import { useState } from 'react'



export default function Oppgave4() {

    const [inputText, setInputText] = useState('StartNavn')
    const [svar, setSvar] = useState('')

    function handleChange(event) {
        setInputText(event.target.value)
    }

    function checkNationality() {
     if (inputText == 'N') {
        setSvar('Norsk')
     }
     else if (inputText == 'S') {
        setSvar('Svensk')
     }
     else {
        setSvar('Unknown')
     }
    }


     return (
        <>
            <input type="text" onChange={handleChange} value={inputText}/>
            <input type="submit" value="sjekk nasjonalitet" onClick={checkNationality}/>
            <p> Du er {svar} </p>
        </>
    )   
}