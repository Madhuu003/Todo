import React from 'react'
import './Content.css'

const Content = ({array,handleclick,handledelete}) => {

  
  return (
 
    <main className='para'>
      {array.length?(
      <ul>
        {array.map((item) => (
          <li key={item.id} className='item'>
            <input
              type="checkbox"
              onChange={() => handleclick(item.id)}
              checked={item.checked}
            />
            <label>{item.list}</label>
            <button onClick={()=>handledelete(item.id)}>delete</button>
          </li>
        ))}
      </ul>
      ):(
      "Your list is empty"
      )}
    </main>
  )
}

export default Content
