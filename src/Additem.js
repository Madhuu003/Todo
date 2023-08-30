import React from 'react'
import './Additem.css'
import { useRef } from 'react'
const Additem = ({additem,setadditem,handleaddsubmit}) => {
  const inputref=useRef()
  return (
    <main className='additem'>
        <form >
            <label htmlFor='add'>AddItem</label>
            <input
            autoFocus
            ref={inputref}
            id='add'
            type='text'
            role='add_item'
            placeholder='Add Item'
            value={additem}
            onChange={(e)=>setadditem(e.target.value)}
            />
            <button onClick={(e)=>handleaddsubmit(e)}
            >Add Item</button>
        </form>
    </main>
  )
}

export default Additem
