import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export default function WebLayoutDesign1() {
  return (
    <div className="min-h-screen">
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
