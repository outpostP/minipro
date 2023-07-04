import { Link } from "react-router-dom";
import AvatarUploader from "../button/uploadphoto";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";


const ProfileSidebar = () => {
  const imgProf = useSelector((state) => state.AuthReducer.imgProfile)
  const [profile, setProfile] = useState({})
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {"Authorization": `Bearer ${token}`}
    const fetchProfile = async () => {
    try {
      const res = await axios.get('https://minpro-blog.purwadhikabootcamp.com/api/auth', {headers}) 
      setProfile(res.data)
      console.log(res.data)
    }
    catch (error) {
      console.log(error)
    }}
    fetchProfile();
  }, []);
  return (
    <div className="h-screen">
      <div className=" bg-gray-200 p-4">
        <div className="h-screen">
          <div className="flex items-center justify-center mb-4 h-1/3">
            <img
              src={`https://minpro-blog.purwadhikabootcamp.com/${profile.imgProfile}`}
              alt="User Avatar"
              className="w-4/5 h-full mr-4 border border-gray-500"
            />
          </div>
          <div>
            <AvatarUploader/>
          </div>
          <div>
            <h1 className="text-2xl font-bold">User Name : {profile.username}</h1>
            <h1 className="text-2xl font-bold">User Email : {profile.email}</h1>
            <h1 className="text-2xl font-bold">User Phone : {profile.phone}</h1>
          </div>
          <div>
            <ul className="list-disc ml-8">
               <Link to="changeusername">
              <li className="mb-2">Change Username</li>
               </Link> 
               <Link to="changeemail">
              <li className="mb-2">Change Email</li>
               </Link> 
               <Link to="changephone">
              <li className="mb-2">Change Phonenumber</li>
               </Link> 
               <Link to="/profile">
              <li className="mb-2">My Post</li>
               </Link> 
               <Link to="likedpost">
              <li className="mb-2">Liked Post</li>
               </Link> 
               <Link to='reset-password'>
              <li className="mb-2">Change Password</li>
               </Link> 
            </ul>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
