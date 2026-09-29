"use client"
import { SignOut } from '@/server/user'
import React from 'react'

export const dashboardPage = () => {
  return (
    <div>dashboard

      <button className="bg-red-500 text-white p-2 rounded" onClick={() => SignOut()}>
        Sign Out
      </button>
    </div>
  )
}


export default dashboardPage