export default function Searchbar({ mouseSelectIndex, isDark, mouseSelect, topbarHeight, navbarWidth, toggleMenu, screenWidth, isFullScreen, mobileScreenWidth, sidebarWidth }) {
    const searchbarHeight = "45px";
    
    const handleMouseEnter = (id) => {
        mouseSelect(id);
    }
      
    const handleMouseLeave = () => {
        mouseSelect(null);
    }
    
   return (
     <div className="flex items-center justify-end gap-[120px] px-4" 
          style={{
            //"border": "1px solid red",
            "width": `calc(100% - ${screenWidth>=mobileScreenWidth ? navbarWidth : sidebarWidth})`,
            "height": topbarHeight,
            "pointerEvents": (toggleMenu && !isFullScreen) ? "none" : "auto",
            "backgroundColor": (toggleMenu && !isFullScreen) ? "gray" : "white"
          }}
    >
      <div className="flex h-full w-[68%] gap-[20px]">
        <div id="searchbar-container" className="flex border-[2px] border-[#c6c6c6] rounded-[30px] overflow-hidden my-auto"
            style={{
              "width": "82%",
              "height": searchbarHeight
            }}
       >
          <input className="pl-[15px] w-[90%] text-[16px] lh-[20px] border-[1px] border-solid border-white" 
                 type="text" 
                 placeholder="Search" 
                 style={{
                  "height": searchbarHeight,
                  "borderRadius": "30px 0px 0px 30px"
                }} 
          />
          <button className="flex border-l-[1px] border-l-solid" 
                  style={{//bg-white
                    "backgroundColor": "white",
                    "width": "11%",
                    "height": searchbarHeight,
                    "borderRadius": "0px 30px 30px 0px"
                  }}>
            <i className="material-symbols-outlined self-center mx-auto text-[27px]">search</i>
          </button>
        </div>
        
        {screenWidth>=mobileScreenWidth ? 
          (<div className="my-auto">
            <button id="MicButton" 
               className="flex w-[40px] h-[40px] p-1 rounded-[50%]"
                href="#mENU" 
                style={{
                  "backgroundColor": mouseSelectIndex==="MicButton" ? "#e6e6e6" : "#f2f2f2"
                }} 
                onMouseEnter={() => handleMouseEnter("MicButton")} 
                onMouseLeave={handleMouseLeave}>
                  <i className="material-symbols-outlined self-center m-auto">mic</i>
            </button>
          </div>) : null}
      </div>
       
       
      <div className="flex gap-[10px]">
        <i class="material-symbols-outlined my-auto">
          more_vert
        </i>
        <button id="SignInButton2" 
                className="flex gap-[8px] items-center justify-center text-blue-500 py-[4px] px-[5px] border-2 border-solid rounded-[30px]"
                style={{
                  "backgroundColor": mouseSelectIndex==="SignInButton2" ? "#def1ff" : "#FFFFFF",
                }}
                onMouseEnter={() => handleMouseEnter("SignInButton2")} 
                onMouseLeave={handleMouseLeave}
        >
          <i className="material-symbols-outlined  w-[30px] text-[26px] font-[50] color-[#065fd4]">account_circle</i>
          <span className="text-[13px] font-bold">Sign In</span>
        </button>
      </div>
     </div>
   ) 
}