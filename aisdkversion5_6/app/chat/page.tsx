import { createConversion } from '@/lib/chat'
import { getUserInfo } from '@/server/user'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

const NewChatPage = async () => {

    // check ig user exist

    const user = await getUserInfo() 
    if(!user){
        redirect('/siginin')
    }
    const conversionId = await createConversion(user.user.id)
    if(!conversionId){
      notFound()
    }
    console.log('conId', conversionId)
  redirect ( `/chat/${conversionId}`)
   
  
}

export default NewChatPage