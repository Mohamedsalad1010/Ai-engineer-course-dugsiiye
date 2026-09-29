import { getAllConversionByUserId, getConversionById, loadChat } from "@/lib/chat"
import { getUserInfo } from "@/server/user"
import { redirect } from "next/navigation"
import Chat from "../../../components/chat"
import ConversationSidebar from "@/components/conversation-sidebar"
interface props  {
params :  Promise<{id: string}>
}

const chatPage = async({params}: props) => {
  const {id} = await params
  const user = await getUserInfo()

  if(!user){
    redirect('/signin')
  }
  // validate if exist conversion
  const conversion = await getConversionById(id , user.user.id)
  if(!conversion){
   
    redirect('/chat')
  }
 const conversations =
    await getAllConversionByUserId(
      user.user.id
    );
  const initailMessages = await loadChat(id)
  return (

        <div className="flex h-screen">
           <ConversationSidebar
        conversations={conversations}
      />
          {/* <Chat initialMessages={initailMessages} conversionId={id}/> */}
           {/* CHAT */}
      <main className="flex-1">

        <Chat
         initialMessages={initailMessages} conversionId={id} conversationTitle={conversion.title}/>
       

      </main>
  </div>

  )
}

export default chatPage