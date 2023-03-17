import React from 'react'

function Alert(props) {
  return (
    <div style={{height:'20px'}} >
{props.alert ? <>
<div className='bg-danger text-light p-1 bold'>
    <p><b>{props.alert.message1}</b> {props.alert.message2}</p>
</div>
</>
:'' }

    </div>
  )
}

export default Alert