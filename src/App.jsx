import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Project from "./pages/Project";
import About from "./pages/About";
import Navbar from './components/Navbar'



 function App(){
   return(
	<>
	<Navbar/>

 	<Routes>
   		<Route path="/" element={<Home/>}/>
		<Route path="/experience" element={<Experience/>}/>
   		<Route path="/project" element={<Project/>}/>
   		<Route path="/about" element={<About/>}/>
 	</Routes>
	</>
   );
 }

export default App
