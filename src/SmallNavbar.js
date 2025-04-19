export default function SmallNavbar({ mouseSelectIndex, isDark, mouseSelect, topbarHeight, sidebarWidth }) {
    const handleMouseEnter = (id) => {
        mouseSelect(id);
    }
      
    const handleMouseLeave = () => {
        mouseSelect(null);
    }
    const styleMain = {
      //"border": "1px solid black",
      "width": sidebarWidth,
      "height": `calc(100vh - ${topbarHeight})`,
      "marginTop": topbarHeight
    }
    const styleIcons = {
      "color": "#030303",
      "marginLeft": "auto",
      "marginRight": "10px",
      "marginTop": "15px",
      "width": "55px",
      "fontSize": "26px",
      "fontWeight": "50"
    }
    const styleButtons = (id,highlighted) => ({
      "color": isDark ? "white" : "black",
      "fontSize": "10px",
      "textAlign": "center",
      "width": "calc(100% - 4px)",
      "height": "80px",
      "margin": "0px auto",
      //"border": "1px solid black",
      "backgroundColor": mouseSelectIndex===id ? (highlighted ? "#e6e6e6" : "#f2f2f2") : (highlighted ? "#f2f2f2" : "#FFFFFF"),
      "borderRadius": "15px"
    });
    
    return (
      <div className="position-fixed d-flex flex-column" style={styleMain}>
        <a id="HomeButton2" className="text-decoration-none" href="#Menu" style={styleButtons("HomeButton2")} onMouseEnter={() => handleMouseEnter("HomeButton2")} onMouseLeave={handleMouseLeave}><i className="material-icons" style={styleIcons}>home</i>Home</a>
        <a id="ShortsButton2" className="text-decoration-none" href="#Menu" style={styleButtons("ShortsButton2")} onMouseEnter={() => handleMouseEnter("ShortsButton2")} onMouseLeave={handleMouseLeave}><i className="material-icons" style={styleIcons}>play_arrow</i>Shorts</a>
        <a id="SubscriptionsButton2" className="text-decoration-none" href="#Menu" style={styleButtons("SubscriptionsButton2")} onMouseEnter={() => handleMouseEnter("SubscriptionsButton2")} onMouseLeave={handleMouseLeave}><i className="material-symbols-outlined" style={styleIcons}>subscriptions</i>Subscriptions</a>
        <a id="YouButton2" className="text-decoration-none" href="#Menu" style={styleButtons("YouButton2")} onMouseEnter={() => handleMouseEnter("YouButton2")} onMouseLeave={handleMouseLeave}><i className="material-symbols-outlined" style={styleIcons}>account_circle</i>You</a>
        <a id="HistoryButton2" className="text-decoration-none" href="#Menu" style={styleButtons("HistoryButton2")} onMouseEnter={() => handleMouseEnter("HistoryButton2")} onMouseLeave={handleMouseLeave}><i className="material-symbols-outlined" style={styleIcons}>history</i>History</a>
      </div>
    )
}