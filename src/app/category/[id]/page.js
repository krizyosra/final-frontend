import GetOneCategory from '@/components/Categorie/GetOneCategory'
import React from 'react'

function page({params}) {

    const { id } = params
    console.log(id)
    
    
  return (
    <>
   <GetOneCategory id={id}/>
    </>
  )
}

export default page
