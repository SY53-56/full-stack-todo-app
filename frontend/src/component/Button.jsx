import React from 'react'

export default function Button({name ,classname , onClick}) {
  return (
    <button onClick={onClick} className={`px-4 py-1 transition-all duration-300 cursor-pointer rounded  ${classname}`}>{name}</button>
  )
}
