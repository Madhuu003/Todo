import React from 'react'
import './Search.css'
const Search = ({searchitem,setsearchitem}) => {
  return (
    <main className='searchitem'>
        <form>
            <label>Search</label>
            <input
            type='text'
            role='Search'
            placeholder='Search item'
            value={searchitem}
            onChange={(e)=>setsearchitem(e.target.value)}
            />
        </form>
    </main>
  )
}

export default Search
