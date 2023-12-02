import React from 'react'
import "../styles/global.css"

export default function Layout({children}) {
  return (
    <div className='app app-layout'>
      {children}
    </div>
  )
}
