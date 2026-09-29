"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// get session
export async function getUserInfo() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session;
}
   

// signup
 export  async function Signup(email:string, password:string  , name:"md") {
    const user = await auth.api.signUpEmail({
        body: {
        email,
        password,
        name
    } 
 });
    return user;
}
 

// signin
export  async function logIn(email:string, password:string) {
    const user = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    });
    return user;
}

// sigin with google
export async function SignInWithGoogle() {
    const user = await auth.api.signInSocial({
       body: {
        provider: "google",
        callbackURL: "/dashboard",
       }
    
    });
    return user;
}

// signout
export async function SignOut() { 
    const user = await auth.api.signOut({
        headers: await headers()
    });
    
    redirect("/signin");
  }