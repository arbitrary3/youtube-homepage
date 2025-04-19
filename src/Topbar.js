import React from 'react';

export default function Topbar({ toggleMenu,mouseSelectIndex,mouseSelect, isDark, topbarHeight, navbarWidth, mobileScreenWidth, screenWidth }) {
    const handleMouseEnter = (id) => {
        mouseSelect(id);
    }
      
    const handleMouseLeave = () => {
        mouseSelect(null);
    }
    
    const hideMenu = (event) => {
      event.preventDefault();
      toggleMenu();
    }  
    
    const styleMenuIcon = {
      //"border": "1px solid blue",
      "margin": "3px 0px 0px 7px",
      "fontSize": "32px",
      "fontWeight": "200"
    };
    const styleMenuLink = (id) => ({
      //"border": "1px solid red",
      "padding": "0",
      "width": "46px",
      "height": "44px",
      "color": "black",
      "borderRadius": "50%",
      "backgroundColor": mouseSelectIndex===id ? "#e6e6e6" : "#FFFFFF"
    });
    const styleMenuContainer = {
      "paddingTop": `calc((${topbarHeight} - 40px)/2)`,
      "height": "100%",
      "merginRight": "20px",
      //"backgroundColor": mouseSelectIndex==="MenuButton" ? "#e6e6e6" : "#FFFFFF"
    }
    
    return (
      <div className="flex py-0 px-[19px] gap-2 mt-0 bg-white" 
           style={{
            "height": topbarHeight,
            "width": navbarWidth
           }}
      >
        <div className="flex" style={styleMenuContainer}><a id="MenuButton" className="" onClick={hideMenu} onMouseEnter={() => handleMouseEnter("MenuButton")} onMouseLeave={handleMouseLeave} style={styleMenuLink("MenuButton")} href="#Menu"><i className="material-symbols-outlined" style={styleMenuIcon}>menu</i></a></div>
        <div className="flex items-center">
          {window.innerWidth > mobileScreenWidth ? 
            (<img width="92" alt="YouTube logo introduced in August 2017" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/128px-YouTube_Logo_2017.svg.png?20230929095411" />) : 
            null}
        </div>
      </div>
      );
}