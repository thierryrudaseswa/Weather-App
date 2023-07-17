import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg"
import Home from "../../Home/Home";

// import "./Darkmode.css";
import "../../index.css";
// import { Input } from "postcss";



const DarkMode = () => {
    const setDarkMode = () =>{
        document.querySelector("body")?.setAttribute("data-theme","dark");
        localStorage.setItem("selectedTheme","dark")
    };
    const setLightMode = () =>{
        document.querySelector("body")?.setAttribute("data-theme","light");
        localStorage.setItem("selectedTheme","dark")
      
        };
        const selectedTheme = localStorage.getItem("selectedTheme");
        if(selectedTheme === "dark"){
            setDarkMode();
        }
        const toggleTheme = (e:any) =>{
            if(e.target.checked) setDarkMode();
            else setLightMode();
    }
    return (
        <div className='sm:m-2  h-8 flex'>
            
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={selectedTheme === "dark"}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;



