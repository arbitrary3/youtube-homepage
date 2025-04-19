import React from 'react';

export default function Topbar({ toggleMenu,mouseSelectIndex,mouseSelect, isDark, topbarHeight, navbarWidth, mobileScreenWidth, screenWidth, ip, region, widthMode }) {
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
    
    return (
      <div className="flex py-0 px-[19px] gap-2 mt-0 bg-white" 
           style={{
            "height": topbarHeight,
            "width": widthMode === 2 ? "80px" : navbarWidth
           }}
      >
        <div className="flex h-full mr-[20px]" 
             style={{
              "paddingTop": `calc((${topbarHeight} - 40px)/2)`,
              //"backgroundColor": mouseSelectIndex==="MenuButton" ? "#e6e6e6" : "#FFFFFF"
             }}
        >
          <a id="MenuButton" 
             className="flex p-0 w-[46px] h-[44px] color-black rounded-[50%]" 
             onClick={hideMenu} 
             onMouseEnter={() => handleMouseEnter("MenuButton")} 
             onMouseLeave={handleMouseLeave} 
             style={{
              "backgroundColor": mouseSelectIndex==="MenuButton" ? "#e6e6e6" : "#FFFFFF"
             }} 
             href="#Menu"
          >
              <span className="material-symbols-outlined m-auto text-[32px]">menu</span>
          </a>
        </div>
        <div className="flex items-center">
          {window.innerWidth > mobileScreenWidth ? 
            (<a className="flex gap-[10px]"
                href="https://arbitrary3.github.io/youtube-homepage/">
              <img width="92" 
                   alt="YouTube logo introduced in August 2017" 
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/128px-YouTube_Logo_2017.svg.png?20230929095411" 
              />
              <p className="text-[9px]">{region}</p>
            </a>) :
            null}
        </div>
      </div>
      );
}