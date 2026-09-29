"use client";

import {authClient}  from "@/lib/auth-client";

import { useRouter } from "next/navigation";
export const DashboardClientPage = () => {

    const router = useRouter();
    const {data: session, isPending,  error} = authClient.useSession();
  console.log("session" , session);
    if(isPending){
        return <div>Loading...</div>
    }
    if(!session){
        router.push("/signin");
    }
    if(error){ 
        return <div>  error {error.message}</div>
     }
    
  return (
    <div>dashboard client side
        <p>Welcome, {session?.user.name}! {isPending ? "loading" : 'loaded.'}</p>
    </div>
  )
}

export default DashboardClientPage
