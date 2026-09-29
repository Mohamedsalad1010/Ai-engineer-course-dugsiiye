import {createAuthClient} from "better-auth/react";

    export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
 })

export const {  signUp , signIn , signOut , useSession , getSession} = authClient