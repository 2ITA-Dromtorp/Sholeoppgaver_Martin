import { useParams } from "react-router-dom"
import json from "./fag"


// function GetText(){
//     const noa=useParams()
//     switch(noa.fag){
//         case "Heimkunskap": 
//             return(
//                 <>
//                     <p>dette er et kurs om heimkunnskap</p>

//                 </>
//             )
//         case "norsk":
//             return(
//                 <>
//                     <p>dette er et kurs om norsk</p>
//                 </>
//             )
//             case "datakunnskap":
//             return(
//                 <>
//                     <p>dette er et kurs om datakunnskap</p>
//                 </>
//             )
//             case "Kroppsøving":
//                 return(
//                     <>
//                         <p>dette er et kurs om Kroppsøving</p>
//                     </>
//                 )
//         default:
//             return(
//                 <>
//                     <p>feil</p>
//                 </>
//             )
//     }
// }

export default function Info() {
    const noa=useParams()

    console.log(json);

    let jsonIndex;

    for (let i in json.kursinfo){
        if (json.kursinfo[i].kursnavn.toLowerCase() === noa.fag.toLowerCase()){
            jsonIndex = i
        }
    }
    
    return(
        <>
            <h1>{json.kursinfo[jsonIndex].kursnavn}</h1>
            {json.kursinfo[jsonIndex].info}
        </>
    )
}