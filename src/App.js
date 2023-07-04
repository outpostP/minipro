import React from "react";
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider, 
  } from "react-router-dom";
import LoginPage from "./page/login";
import Home from "./page/home";
import VerifyButton from "./page/verify";
import Register from "./page/registration"
import WebLayoutDesign1 from "./Layout/WebLayoutDesign1";
import NotFoundPage from "./page/404";
// import ChangeUserLogin from "./profile/ChangeUserLogin";
import PostWritten from "./profile/PostWritten";

// import ChangeUserPassword from "./profile/ChangeUserPassword";
import UserLayout from "./Layout/UserLayout";
// import Posts, { postLoaders } from "./page/post";
import CurrentPost, { currentPostLoader } from "./page/CurrentPost";
import PostLayout from "./Layout/PostLayout";
import BlogComponent from "./page/pagepage";
import ArticleForm from "./page/articleform";
import Awoo from "./redux/Awooo";
import PasswordResetForm from "./page/resetpass";
import ForgetToRemember from "./page/forgettoremember";
import ChangeUsernameForm from "./profile/ChangeUserLogin";
import ChangeEmailForm from "./profile/ChangeEmailLogin";
import ChangePhoneForm from "./profile/ChangePhoneLogin";
import PostLiked from "./profile/PostLiked";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<WebLayoutDesign1/>}>
      <Route index element={<Home/>}/>
      <Route path="verification/:token" element={<VerifyButton/>}/> 
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="write" element={<ArticleForm/>}/>
      <Route path="forget" element={<ForgetToRemember/>}/>
      <Route path="reset-password/:token" element={<PasswordResetForm/>} />
      <Route path="post" element={<PostLayout />}>
        <Route index element={<BlogComponent/>}/>
        <Route path=":id" element={<CurrentPost/>} loader={currentPostLoader} />
      </Route>     
      <Route path="profile" element={<UserLayout/>}>
        <Route index element={<PostWritten/>} />
        <Route path="changeusername" element={<ChangeUsernameForm/>}/>
        <Route path="changeemail" element={<ChangeEmailForm/>}/>
        <Route path="changephone" element={<ChangePhoneForm/>}/>
        <Route path="likedpost" element={<PostLiked/>} />
        <Route path="reset-password" element={<PasswordResetForm/>} />
      </Route> 
      <Route path="*" element={<NotFoundPage/>}/>
    </Route>
 
  )
)

export default function App () {
  return (
    <>
    <Awoo>
    <RouterProvider router={router} className="bg-slate-500" />
    </Awoo>
    </>
  )
}