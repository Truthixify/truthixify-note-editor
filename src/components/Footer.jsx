import React from 'react'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <footer className='flex-lg footer'>
      <p className='flex-md'>&copy; 2023 Simple Note Editor. All rights reserved.</p>
      <div className='flex-md'>
        <SocialIcon url='https://github.com/Truthixify' target='_blank' />
        <SocialIcon url='https://twitter.com/truthixifi' target='_blank' />
        <SocialIcon url='https://www.linkedin.com/in/wasiu-ajao-40956428b/' target='_blank' />
        <SocialIcon url='https://api.whatsapp.com/send?phone=2348105309925' target='_blank' />
      </div>
    </footer>
  )
}

export default Footer