import ProfileSidebar from '../profile/Sidebar'
import { Outlet } from 'react-router-dom'
import UserInfo from '../page/profiletest'


function UserLayout() {

  return (
    <div className='flex w-screen'>
       <div className='w-1/4'>

            <ProfileSidebar/>
       </div>
       <div className='w-1/4'>
        <UserInfo/>
       </div>
       <div className='w-2/4 flex justify-center items-center'>

            <Outlet/>
       </div>
       
    </div>
  )
}

export default UserLayout