import React from 'react'
import './Footer.css'
const Footer = ({length}) => {

  return (
    <footer className='foot'>
      <p>{length} List {length>1?"items":"item"}</p>
    </footer>
  )
}

export default Footer
