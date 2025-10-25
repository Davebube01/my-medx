import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className='h-screen bg-slate-100 p-8'>
      <Outlet/>
    </div>
  )
}
