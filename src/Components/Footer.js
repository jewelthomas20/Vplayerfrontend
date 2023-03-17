import React from 'react'
import fb from './images/fb.png'
import linkedin from './images/linkedin.png'
import mail from './images/Mail.png'
import '../Components/CSS/Footer.css'
function Footer() {
  return (
    <footer>
      <h5>Vplayer just stream it and Enjoy IT</h5>
      <h6>Our Social Handles</h6>
      <ul className='handles'>
        <a href="https://www.facebook.com/profile.php?id=100004990593497" target={'_blank'} rel="noreferrer">
          <li>
            <img src={fb} alt="facebook icon" width={30} height={30} />
            <p>Facebook</p>
          </li>
        </a>
        <a href="mailto:jewelthomas666@gmail.com">
          <li>
            <img src={mail} alt="mail icon" width={30} height={30} />
            <p> Email</p>
          </li>
        </a>

        <a href="https://www.linkedin.com/in/jewel-thomas-707432197/" rel="noreferrer" target={'_blank'}>
          <li>
            <img src={linkedin} alt="LinkedIn" width={30} height={30} />
            <p>LinkedIn</p>
          </li>
        </a>

      </ul>

      <p className='copyright'>
        &#169;Vplayer 2023 all rights reserved
      </p>

    </footer>
  )
}

export default Footer