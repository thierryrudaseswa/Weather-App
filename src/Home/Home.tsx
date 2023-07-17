import React,{useState} from 'react'
import TopContainer from '../components/TopContainer/Topcontainer';
import MiddleContainer from '../components/MiddleContainer/MiddleContainer';
 import { BottomContainer } from '../components/BottomContainer/Bottomcontainer';
// import DarkMode from '../components/darkMode/DarkMode';
// const [theme,setTheme]=useState(false)
// const changeColor(){
  
//   setTheme(!theme)
// }
 
function Home() {
  return (
    <div className='p-3 '>

    
      <TopContainer />
        <MiddleContainer />
        <BottomContainer />
        </div>)
  

   
  
}

export default Home