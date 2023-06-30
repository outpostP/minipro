import { Link } from "react-router-dom";
import AvatarUploader from "../button/uploadphoto";
import { useSelector } from "react-redux";


const ProfileSidebar = () => {
  const imgProf = useSelector((state) => state.AuthReducer.imgProfile)
  return (
    <div className="h-screen">
      <div className=" bg-gray-200 p-4">
        {/* Sidebar content */}
        {/* You can add your desired content here */}
        <div className="h-screen">
          <div className="flex items-center justify-center mb-4 h-1/3">
            <img
              src={`https://minpro-blog.purwadhikabootcamp.com/${imgProf}`} // Replace with the URL or path of the user avatar image
              alt="User Avatar"
              className="w-4/5 h-full mr-4 border border-gray-500"
            />
          </div>
          <div>
            <AvatarUploader/>
          </div>
          <div>
            <h1 className="text-2xl font-bold">User Name</h1> {/* Replace with the user's name */}
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
