import React from 'react'
import Content from './Content'
import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import Additem from './Additem'
import Search from './Search'
import { useEffect } from 'react'
import apireq from './apireq'
function App() {
  const [additem, setadditem] = useState('')
  const [searchitem, setsearchitem] = useState('')
  const [array, setArray] = useState([])
  const [load, setload] = useState(true)
  const [error, seterror] = useState(null)
  const API = 'http://localhost:3500/items'
  useEffect(() => {

    const fetchitems = async () => {
      try {
        const response = await fetch(API)
        if (!response.ok) throw Error("Data not received")
        const dataitems = await response.json()
        setArray(dataitems)
      }
      catch (err) {
        seterror(err.Message)
      }
      finally {
        setload(false)
      }
    }
    
      (async () => fetchitems())()
    

  }, [])
  const handleaddsubmit = async (e) => { 
    e.preventDefault()   
      if(additem.length){
      const newid = array.length ? (array[(array.length) - 1].id) + 1 : 1
      const listadd = { id:newid, checked: false,list: additem }
      
      const addlist =[...array, listadd]

      setArray(addlist)
      setadditem('')
      const postoptions = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(listadd)
      }
      const result = await apireq(API,postoptions)
      if (result) seterror(result)
        }
      else{return}

     
  
    
  }
  
  const handleclick = async(id) => {
    const changea = array.map((items) => id === items.id ? ({ ...items, checked: !items.checked }) : (items))
    setArray(changea)
    const myitem=changea.filter((item)=>item.id===id)
    const updateoption={
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked:myitem[0].checked})
    }
    const requrl=`${API}/${id}`
    const result = await apireq(requrl, updateoption)
    if (result) seterror(result)
  }
  const handledelete =async (id) => {
    const deletearray = array.filter((item) => item.id !== id)
    setArray(deletearray)
    const deleteoption={
      method:'DELETE'
    }
    const requrl=`${API}/${id}`
    const result = await apireq(requrl, deleteoption)
    if (result) seterror(result)

  }
  return (
    <div className='app'>
      <Header />
      <Additem
        additem={additem}
        setadditem={setadditem}
        handleaddsubmit={handleaddsubmit}
       />
      <Search
        searchitem={searchitem}
        setsearchitem={setsearchitem} />
      <main>
        {load && <p>LOADING....</p>}
        {error && <p>{`Error${error}`}</p>}
        {!load && !error &&
          <Content
            array={array.filter((item) => ((item.list).toLowerCase()).includes(searchitem.toLowerCase()))}
            handleclick={handleclick}
            handledelete={handledelete}
          />}
      </main>
      <Footer
        length={array.length}
      />
    </div>
  )
}

export default App
