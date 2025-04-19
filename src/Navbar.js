import React from 'react';

export default class Navbar extends React.Component {
    constructor(props) {
      super(props);
      const {mouseSelectIndex,isDark,mouseSelect,topbarHeight, navbarWidth, generateSidebarButtons, generateBottomLinks, marginLeft, widthMode, isSignedIn} = this.props;
      this.state = {
        mouseSelectIndex: null,
        scrollbarVisible: false
      }
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    
    handleMouseEnter(id) {
        this.props.mouseSelect(id);
    }
      
    handleMouseLeave() {
        this.props.mouseSelect(null);
    }
    
    render() {
      const styleMain = {
        //"border": "1px solid black",
        "position": "fixed",
        "transition": 'left 0.5s ease-out',
        "height": "100vh",
        "paddingLeft": `ca;c(${this.props.marginLeft} - 20px})`,
        "width": this.props.navbarWidth,
        "overflowY": this.state.scrollbarVisible ? "auto" : "hidden",
        "overflowX": "hidden",
        "scrollbarWidth": "thin",
        "top": this.props.topbarHeight,
        "backgroundColor": "white"
      }
      const styleHyperlinks = (id,highlighted) => ({
        "display": "flex",
        "color": this.props.isDark ? "#999999" : "#000000",
        "textDecoration": "none",
        "backgroundColor": this.props.mouseSelectIndex===id ? (highlighted ? "#e6e6e6" : "#f2f2f2") : (highlighted ? "#f2f2f2" : "#FFFFFF"),
        "borderRadius": "15px",
        "width": "200px",
        "height": "40px",
        "lineHeight": "40px",
        "fontWeight": id==="YouButton" ? "600" : (highlighted ? "600" : "normal"),
        "verticalAlign": "center",
        "fontSize": "14px",
      });
      const styleYou = {
        //"border": "1px solid red",
        "marginLeft": "13px",
        "fontSize": "16px"
      }
      const styleHeader = {
        "fontWeight": "600",
        "marginLeft": "18px",
        "fonrSize": "16px"
      }    
      const styleContainer = {//border-b-[1px] border-b-solid border-b-[#e6e6e6] p-[10px] mb-[5px] w-[240px]
        "borderBottom": "1px solid #e6e6e6",
        "padding": "10px",
        "marginBottom": "5px",
        "width": "240px"
      }
      const styleBottomLinks = {
        "color": "#8c8c8c",
        "fontSize": "12px",
        "fontWeight": "650",
        "textDecoration": "none",
        "padding": "0px 4px"
      }
      const styleBottomLinksContainer = {
        "marginTop": "20px",
        "marginLeft": this.props.marginLeft
      }
      const styleSubContainer = {
        "margin": "-2px 0"
      }
      const styleCopyright = {
        "marginTop": "20px",
        "fontSize": "13px",
        "color": "#959595"
      }
      const styleIcons = {
        "color": "#030303",
        "marginLeft": "13px",
        "marginRight": "10px",
        "marginTop": "5px",
        "width": "40px",
        "fontSize": "26px",
        "fontWeight": "50"
      }
      const styleSignInLabel = {
        "fontSize": "15px"
      }
      const styleBlocker = {
        "position": "fixed",
        "width": `calc(100% - ${this.props.navbarWidth})`,
        "height": "100vh",
        "backgroundColor": "black",
        "opacity": "0.8",
        "right": "0",
        "top": "0",
        "zIndex": "9999"
      }
      
      return (
        <div className="flex flex-col" 
             style={styleMain} 
             onMouseEnter={() => this.setState({scrollbarVisible: true})}
             onMouseLeave={() => this.setState({scrollbarVisible: false})}
        >
          
          <div className="flex flex-col border-b-[1px] border-b-solid border-b-[#e6e6e6] p-[10px] mb-[5px] w-[240px]">
            {this.props.generateSidebarButtons(0, [
              ["Home", "HomeButton", "https://www.youtube.com", styleHyperlinks("HomeButton",true), "home",styleIcons],
              ["Shorts", "ShortsButton", "#", styleHyperlinks("ShortsButton"), "play_arrow",styleIcons],
              ["Subscriptions", "SubscriptionsButton", "#", styleHyperlinks("SubscriptionsButton"), "subscriptions",styleIcons]
            ])}
          </div>
          
            
        <div className="flex flex-col" style={styleContainer}>
          {this.props.isSignedIn ? (<a id="YouButton" className="flex justify--start items-stretch" href="#Menu" style={styleHyperlinks("YouButton")} onMouseEnter={() => this.handleMouseEnter("YouButton")} onMouseLeave={this.handleMouseLeave}><span style={styleYou}>You</span><i className="material-symbols-outlined" style={styleIcons}>chevron_right</i></a>) : null}
            {this.props.isSignedIn ? 
              (this.props.generateSidebarButtons(0, [
                ["History", "HistoryButton", "#", styleHyperlinks("HistoryButton"), "history",styleIcons],
                ["Playlists", "PlaylistsButton", "#", styleHyperlinks("PlaylistsButton"), "playlist_play",styleIcons],
                ["Your videos", "YourVideosButton", "#", styleHyperlinks("YourVideosButton"), "history",styleIcons],
                ["Watch Later", "WatchLaterButton", "#", styleHyperlinks("WatchLaterButton"), "schedule",styleIcons],
                ["Liked videos", "LikedVideosButton", "#", styleHyperlinks("LikedVideosButton"), "thumb_up",styleIcons]
              ])) : 
              (this.props.generateSidebarButtons(0,[
                ["You", "YouButton2", "#", styleHyperlinks("YouButton2"), "account_circle",styleIcons],
                ["History", "HistoryButton", "#", styleHyperlinks("HistoryButton"), "history",styleIcons]
              ]))
            }
        </div>
          
        <div className="flex flex-col gap-[20px]"
             style={{
              "padding": "10px 26px 25px 6px",
              "margin": `10px 0px 0px ${this.props.marginLeft}`,
              "fontSize": "15px",
              "borderBottom": "1px solid #e6e6e6"
        }}>
          <p style={styleSignInLabel}>Sign in to like videos, comment and subscribe.</p>
          <button id="SignInButton2" 
                  className="flex gap-[8px] w-[60%] items-center justify-center text-blue-500 py-[4px] px-[8px] border-2 border-solid rounded-[30px]"
                  style={{
                    "backgroundColor": this.props.mouseSelectIndex==="SignInButton2" ? "#def1ff" : "#FFFFFF",
                  }}
                  onMouseEnter={() => this.handleMouseEnter("SignInButton2")} 
                  onMouseLeave={this.handleMouseLeave}
          >
            <i className="material-symbols-outlined  w-[30px] text-[26px] font-[50] color-[#065fd4]">account_circle</i>
            <span className="text-[13px] font-bold">Sign In</span>
          </button>
        </div>
        
        <div className="flex flex-col border-b-[1px] border-b-solid border-b-[#e6e6e6] p-[10px] mb-[5px] w-[240px]">
          <p style={styleHeader}>Explore</p>
          {this.props.generateSidebarButtons(0, [
            ["Trending", "TrendingButton", "#", styleHyperlinks("TrendingButton"), "local_fire_department",styleIcons],
            ["Music", "MusicButton", "#", styleHyperlinks("MusicButton"), "music_note",styleIcons],
            ["Movies & TV", "MoviesAndTVButton", "#", styleHyperlinks("MoviesAndTVButton"), "movie",styleIcons],
            ["Live", "LiveButton", "#", styleHyperlinks("LiveButton"), "sensors",styleIcons],
            ["Gaming", "GamingButton", "#", styleHyperlinks("GamingButton"), "sports_esports",styleIcons],
            ["News", "NewsButton", "#", styleHyperlinks("NewsButton"), "newspaper",styleIcons],
            ["Sports", "SportsButton", "#", styleHyperlinks("SportsButton"), "trophy",styleIcons],
            ["Courses", "CoursesButton", "#", styleHyperlinks("CoursesButton"), "school",styleIcons]
                  ])};
        </div>
          
        <div className="flex flex-col" style={styleContainer}>
          <p style={styleHeader}>More from YouTube</p>
          {this.props.generateSidebarButtons(0, [
            ["YouTube Premium", "YouTubePremiumButton", "#", styleHyperlinks("YouTubePremiumButton"), ["https://www.svgrepo.com/download/475700/youtube-color.svg"],styleIcons],
            ["YouTube Studio", "YouTubeStudioButton", "#", styleHyperlinks("YouTubeStudioButton"),["https://static.vecteezy.com/system/resources/previews/017/396/826/non_2x/youtube-studio-icons-free-png.png","26","40"],styleIcons],
            ["YouTube Music", "YouTubeMusicButton", "#", styleHyperlinks("YouTubeMusicButton"), ["https://www.svgrepo.com/download/343535/youtube-music-song-multimedia-audio.svg"],styleIcons],
            ["YouTube Kids", "YouTubeKidsButton", "#", styleHyperlinks("YouTubeKidsButton"), ["https://www.svgrepo.com/download/475700/youtube-color.svg"],styleIcons]
                  ])};
        </div>
          
        <div className="flex flex-col" style={styleContainer}>
          {this.props.generateSidebarButtons(0, [
            ["Settings", "SettingsButton", "#", styleHyperlinks("SettingsButton"), "settings",styleIcons],
            ["Report History", "ReportHistoryButton", "#", styleHyperlinks("ReportHistoryButton"), "flag",styleIcons],
            ["Help", "HelpButton", "#", styleHyperlinks("HelpButton"), "help",styleIcons],
            ["Send Feedback", "SendFeedbackButton", "#", styleHyperlinks("SendFeedbackButton"), "feedback",styleIcons]
                  ])};
        </div>
          
         <div className="flex flex-col flex-wrap" style={styleBottomLinksContainer}>
           <div style={styleSubContainer}>
             {this.props.generateBottomLinks([
                ["About","",styleBottomLinks],
                ["Press","",styleBottomLinks],
                ["Copyright","",styleBottomLinks]])}
           </div>
           <div style={styleSubContainer}>
             {this.props.generateBottomLinks([
              ["Contact us","",styleBottomLinks],
              ["Creators","",styleBottomLinks]])}
           </div>
           <div style={styleSubContainer}>
             {this.props.generateBottomLinks([
              ["Advertise","",styleBottomLinks],
              ["Developers","",styleBottomLinks]])}
           </div>
          </div>
          
          <div className="" style={styleBottomLinksContainer}>
           <div style={styleSubContainer}>
             {this.props.generateBottomLinks([
              ["Terms","",styleBottomLinks],
              ["Privacy","",styleBottomLinks],
              ["Policy & Safety","",styleBottomLinks]])}
           </div>
           <div style={styleSubContainer}>
             {this.props.generateBottomLinks([
              ["How YouTube Works","",styleBottomLinks]])}
           </div>
           <div style={styleSubContainer}>
             {this.props.generateBottomLinks([
              ["Test new features","",styleBottomLinks]])}
            </div>
         </div>
        
        <p style={styleCopyright}>(c) 2025 Google LLC</p>
          
          {!(this.props.widthMode === 0) ? <div style={styleBlocker}></div> : null}
      </div>
      )
    }
}