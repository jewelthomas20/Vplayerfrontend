import React from 'react'
import { Link } from 'react-router-dom'
import play from './images/play.jpg'
import './CSS/vcard.css'
function VCard(props) {
  return (
    <div className="card" style={{ width: "15rem", textDecoration: 'none', border: '1px solid black', borderRadius: '5%', overflow: 'hidden' }}  >
    {/* will replaceall space btw title like bigelephant  */}
      <Link to={`/${props.title.replaceAll(" ", '')}`}  >
        <div className='d-flex justify-content-center '>
          <img className='position-absolute ' style={{ opacity: .6, borderRadius: "100%", top: "2rem",cursor: "pointer" }} src={play} width={130} height={130} alt='playButton' title='play'/></div>
        <img src={props.image} className="card-img-top" style={{cursor:"default"}} alt={props.title} width={300} height={200} />
      </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark" style={{cursor:'default'}}>{props.title}</h5>
        </div>
    </div>

  )
}

export default VCard