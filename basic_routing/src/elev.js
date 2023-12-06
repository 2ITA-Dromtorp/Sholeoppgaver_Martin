export default function Elev(props){

let name= props.name;
console.log(name);

    return(
        <div className='persjon'>
          {name}

        </div>
    )
}


<div className='middle'>
        <div className='LeftMid'>
          <div className='Norsk' onClick={() => navigate('/info/Grunnleggende datakunnskap')}>
            Grunnleggende datakunnskap
          </div>
          <div className='Heimkunskap' onClick={() => navigate('/info/Kroppsøving')}>
            Kroppsøving
          </div>
        </div>
        <div className='RightMid'>
          <div className='Norsk' onClick={() => navigate('/info/norsk')}>
            Norsk
          </div>
          <div className='Heimkunskap' onClick={() => navigate('/info/Heimkunskap')}>
            Heimkunskap
          </div>
        </div>
      </div>