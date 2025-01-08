import React from 'react'
import { useParams } from 'react-router-dom'
 

const Fullblog = () => {
    const routeParameter=useParams()
    console.log(routeParameter)
  return (
    <div>Faxxy</div>
  )
}

export default Fullblog