'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {
  const {data: session, status} = useSession()
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard