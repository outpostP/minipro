import ProfileSidebar from '../profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAuthRedirect } from '../whatev/useAuthRedirect'

function UserLayout() {
  useAuthRedirect('/');
  return (
    <div className='flex w-screen'>
       <div className='w-1/4'>

            <ProfileSidebar/>
       </div>
       
       <div className='w-2/4 flex justify-center items-center'>

            <Outlet/>
       </div>
       
    </div>
  )
}

export default UserLayout