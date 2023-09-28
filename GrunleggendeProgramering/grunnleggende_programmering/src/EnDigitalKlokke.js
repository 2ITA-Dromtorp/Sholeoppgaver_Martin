import { useState } from 'react';

export default function Klokke() {

    const [currentTime, setCurrentTime] = useState(new Date())

    setInterval( () => { setCurrentTime(new Date) }, 1000);

return(

<div>klokke {currentTime.toTimeString()} </div>

)



}