export default function Searchbar({ mouseSelectIndex, isDark, mouseSelect, topbarHeight, navbarWidth, toggleMenu, screenWidth, widthMode, mobileScreenWidth, sidebarWidth }) {
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
            "pointerEvents": (toggleMenu && !(widthMode === 0)) ? "none" : "auto",
            "backgroundColor": (toggleMenu && !(widthMode === 0)) ? "gray" : "white",
            "gap": widthMode === 2 ? "0px" : `calc(120px * ${screenWidth / 1300})`//widthMode === 2 ? "0px" : "120px"
          }}
    >
      <div className="flex h-full gap-[20px]"
           style={{
            "width": widthMode === 2 ? "100%" : "68%"
           }}
      >
        <div id="searchbar-container" className="flex border-[2px] border-[#c6c6c6] rounded-[30px] overflow-hidden my-auto"
            style={{
              "width": "82%",
              "height": searchbarHeight
            }}
       >
          <input className="pl-[15px] w-[100%] text-[16px] lh-[20px] border-[1px] border-solid border-white" 
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
                    "width": (widthMode > 0 || screenWidth < 500) ? null : "11%",
                    "height": searchbarHeight,
                    "borderRadius": "0px 30px 30px 0px"
                  }}>
            <i className="material-symbols-outlined self-center mx-auto text-[27px]">search</i>
          </button>
        </div>
        
        {screenWidth>=mobileScreenWidth ? 
          (<div className="relative my-auto">
            <button id="MicButton" 
               className="flex w-[40px] h-[40px] p-1 rounded-[50%]"
                href="#mENU" 
                style={{
                  "backgroundColor": mouseSelectIndex==="MicButton" ? "#e6e6e6" : "#f2f2f2"
                }} 
                onMouseEnter={() => handleMouseEnter("MicButton")} 
                onMouseLeave={handleMouseLeave}>
                  <i className="material-symbols-outlined self-center m-auto">mic</i>
                  {mouseSelectIndex==="MicButton" ? 
                    <p className="absolute w-[150px] top-[50px] left-[-60px] bg-black p-2 rounded-md text-white text-[13px]">Search with your voice</p> : 
                    null}
            </button>
          </div>) : null}
      </div>
       
       
      <div className="flex gap-[10px]">
        <button className="relative h-full my-auto"
                onMouseEnter={() => handleMouseEnter("SettingsButton")}
                onMouseLeave={handleMouseLeave}
        >
          <i class="material-symbols-outlined my-auto">more_vert</i>
          {mouseSelectIndex==="SettingsButton" ? 
            <p className="absolute top-[45px] left-[-20px] bg-black p-2.5 rounded-md text-white text-[13px]">Settings</p> : 
            null}
        </button>
        <button id="SignInButton2" 
                className="flex gap-[8px] items-center justify-center text-blue-500 py-[4px] px-[5px] border-2 border-solid rounded-[30px]"
                style={{
                  "backgroundColor": mouseSelectIndex==="SignInButton2" ? "#def1ff" : "#FFFFFF",
                }}
                onMouseEnter={() => handleMouseEnter("SignInButton2")} 
                onMouseLeave={handleMouseLeave}
        >
          <i className="material-symbols-outlined  w-[30px] text-[26px] font-[50] color-[#065fd4]">account_circle</i>
          {widthMode === 2 ? null : <span className="text-[13px] font-bold">Sign In</span>}
        </button>
      </div>
     </div>
   ) 
}