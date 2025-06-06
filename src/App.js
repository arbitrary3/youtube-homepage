import React from 'react';
import ErrorBoundary from './ErrorBoundary.js';
import Navbar from './Navbar.js';
import Searchbar from './Searchbar.js';
import SmallNavbar from './SmallNavbar.js';
import Topbar from './Topbar.js';
import Videos from './Videos.js'; 
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: new Date(),
      region: "US",
      key: "AIzaSyD7n8knDGvidtAfdIlauv_3TjIBC0asskE",
      key2: "AIzaSyCk30ae4lC5voRzAW4jiClSpqci063QPgw",
      screenWidth: 0,
      mobileScreenWidth: 540,
      canLoad: true,
      searchInput: "",
      toggleMenu: true,
      isDark: false,
      mouseSelectIndex: null,
      sidebarWidth: "68px",
      navbarWidth: "242px",
      topbarHeight: "60px",
      isSignedIn: false,
      marginLeft: "10px",
      data: null,
      profilePicsData: [],
      LoadedVideosStartIndex: 0,
      LoadedVideosEndIndex: 15,
      initialLoad: 500,
      widthMode: 0, //0 = fullscreen; 1 = minimized screen; 2 = mobile screen
      isAPILoaded: false,
      ip: '',//'49.145.170.8',
      latitude: null,
      longitude: null,
      error: null
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.mouseSelect = this.mouseSelect.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.generateSidebarButtons = this.generateSidebarButtons.bind(this);
    this.generateBottomLinks = this.generateBottomLinks.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchProfile = this.fetchProfile.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.LoadMore = this.LoadMore.bind(this);
    this.shouldAPIUpdate = this.shouldAPIUpdate.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.getI18nRegion = this.getI18nRegion.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    this.fetchData();
    this.handleResize();
    //this.getUserLocation();
  } 

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    //If full screen, the Navbar.js is visible.
    //If not and the screenWidth is greater than the mobileScreenWidth, SmallNavbar.js is visible
    //Else, mobile mode is activated (widthMode = 2)
    const isFullScreen = (window.screen.width >= 1366);
    this.setState({ screenWidth: window.innerWidth }, () => {
      if (isFullScreen) {
        this.setState({ widthMode: 0, toggleMenu: true });
      } else {
        if (this.state.screenWidth > this.state.mobileScreenWidth) {
          this.setState({ widthMode: 1, toggleMenu: false });
        } else {
          this.setState({ widthMode: 2, toggleMenu: false });
        }
      }
    });
  }

  async getUserLocation() {
    try {
      const res = await axios.get("https://api.ipify.org/?format=json");
      const { countryCode } = res.data;
      this.setState({ ip: res.data.ip, region: countryCode  },() => {
        this.getI18nRegion(this.state.ip);
      });
    } catch (error) {
      alert("Error fetching location");
      console.error('Error fetching user location:', error);
    }
  };

  async getI18nRegion(ip) {
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
  
      if (data.status === "success") {
        const countryCode = data.countryCode;
        alert(`IP Address: ${this.state.ip}, Country Code: ${countryCode}`);

        return countryCode; // This is the i18nRegion (e.g., "US", "IN", "PH")
      } else {
        throw new Error("Failed to fetch region");
      }
    } catch (error) {
      console.error("Error fetching i18nRegion:", error);
      return null;
    }
  }
  
  //Toggles between Navbar.js and SmallNavbar.js
  toggleMenu() {
    this.setState(prevState => ({
      toggleMenu: !prevState.toggleMenu
    }));
  }
  
  //MOUSE HOVER AND LEAVE ENGINE START
  //The style attribute in every hoverable objects has a condition when mouseSelectIndex is equal to its id.
  //So when mouseSelectIndex is "SignIn", the hover condition of the Sign In button activated 
  mouseSelect(id) {
    this.setState({
      mouseSelectIndex: id
    });
  }
  
  //When the mouse leaves a hovered object, mouseSelectIndex goes back to null again
  mouseLeave(id) {
    this.setState({
      mouseSelectIndex: null
    });
  }  
  //MOUSE HOVER AND LEAVE ENGINE END

  //FETCH DATA SECTION
  fetchData = async(endIndex) => {
    const today = new Date();
    console.log(today);
    const key = this.state.key2;
    const region = this.state.region;
    const URLVideos = `https://www.googleapis.com/youtube/v3/videos?key=${key}&chart=mostPopular&part=snippet,contentDetails,statistics&regionCode=${region}&maxResults=${this.state.initialLoad}`;
    //localStorage.removeItem(URLVideos+"US");
    //localStorage.removeItem(URLVideos+"PH");
    //localStorage.removeItem(URLVideos+"GB");
    const cached = JSON.parse(localStorage.getItem(URLVideos+region));
    const lastUpdate = JSON.parse(localStorage.getItem(URLVideos+region+"last_update"));
    if (cached && !this.shouldAPIUpdate(today,lastUpdate)) {
      console.log("Loading existing cache data for video data...");
      this.setState({ data: cached.items }, () => {
        this.setState({ canLoad: true });
        const list = cached.items.map(video => video.snippet.channelId);
        if (!this.state.profilePicsData || this.state.profilePicsData.length === 0) {
          this.fetchProfile(list,key);
        }
        return;
      });
    } else {
    
      fetch(URLVideos)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) {
          console.error("Error: data.items is undefined", data); 
          this.setState({ canLoad: false });
          return;
        }
        this.setState({ data: data.items }, () => {
          this.fetchProfile(data.items.map(video => video.snippet.channelId),key);
        });
        localStorage.setItem(URLVideos+region,JSON.stringify(data));
        localStorage.setItem(URLVideos+region+"last_update",JSON.stringify(today));
      })
      .catch((err) => {
        console.log(`There was an error loading the videos (Videos).`,err);
        this.setState({ canLoad: false });
        return;
      });
    }
  }
  
  fetchProfile = async(channelIds,key) => {
    if (!channelIds.length) {
      console.log("No channels found")
      return
    }
    const region = this.state.region;
    const today = new Date();
    const list = this.state.data.map(video => video.snippet.channelId);
    const URLProfilePics = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${list.join(",")}&fields=items(id%2Csnippet%2Fthumbnails)&key=${key}`;
    //const cached = JSON.parse(localStorage.getItem(URLProfilePics+region));

    //const lastUpdate = JSON.parse(localStorage.getItem(URLProfilePics+region));
    fetch(URLProfilePics)
        .then((res) => res.json())
        .then((data) => {
          const profilePicMap = {};
          if (!data.items) {
            console.error("Error: data.items is undefined (Profile Pics)", data); 
            this.setState({ canLoad: false });
            return;
          }
          data.items.forEach(profile => {
            profilePicMap[profile.id] = profile.snippet.thumbnails.default.url;
          });
          const matchedProfilePics = channelIds.map(id => profilePicMap[id] || ""); 
          this.setState({ profilePicsData: matchedProfilePics });
          localStorage.setItem(URLProfilePics+region,JSON.stringify(matchedProfilePics));
          localStorage.setItem(URLProfilePics+region+"last_update",JSON.stringify(today));
        })
        .catch((err) => {
          console.log(`There was an error loading the videos (Profile Pics).`);
        });
  }
  
  generateSidebarButtons(isSmallSidebar,arrayOfOptions) {
    if (isSmallSidebar===0) {
      return arrayOfOptions.map((element,index) => {
        var attributes ={
          name: element[0] ? element[0] : "(no name)",
          id: element[1] ? element[1] : "sidea"+index,
          link: element[2] ? element[2] : "",
          style: element[3] ? element[3] : {},
          icon: element[4] ? element[4] : "",
          iconStyles: element[5] ? element[5] : {}
        };
        return (
          <a key={index} 
             id={attributes.id} 
            className="flex justify-start items-center" 
            href={attributes.link} 
            style={attributes.style} 
            onMouseEnter={() => this.mouseSelect(attributes.id)} 
            onMouseLeave={this.mouseLeave}>
              {Array.isArray(attributes.icon) ? 
                (<img src={attributes.icon[0]}
                      className="my-auto" 
                      width={attributes.icon[1] ? attributes.icon[1] : "26"} 
                      height={attributes.icon[2] ? attributes.icon[2] : "26"} 
                      style={attributes.iconStyles} alt="" 
                  />) : 
                (<i className="material-symbols-outlined my-auto" style={attributes.iconStyles}>{attributes.icon}</i>)}
              {attributes.name}
          </a>);
      });
    }
  }
  
  generateBottomLinks(arrayOfOptions) {
    return arrayOfOptions.map((element,index) => {
      return <a style={element[2]} href={element[1]} key={index}>{element[0]}</a>
    });
  }
  
  LoadMore() {
    this.setState(endIndex => ({
      LoadedVideosEndIndex: (this.state.LoadedVideosEndIndex + 15 < this.state.initialLoad) ? this.state.LoadedVideosEndIndex + 15 : this.state.initialLoad 
    }));
    
  }
  
  //Updates the API if the difference between the two dates is greater than 2 days
  shouldAPIUpdate(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = Math.abs(d2 - d1);
    const dayDiff = timeDiff / (1000 * 3600);
    return dayDiff >= 1;
  }
  
  //RENDER SECTION
  render() {
    return (
      <ErrorBoundary>
        <div className="flex fixed w-full">
          <Topbar mouseSelectIndex={this.state.mouseSelectIndex}isDark={this.state.isDark} 
                  toggleMenu={this.toggleMenu} 
                  mouseSelect={this.mouseSelect} 
                  topbarHeight={this.state.topbarHeight} 
                  navbarWidth={this.state.navbarWidth} 
                  mobileScreenWidth={this.state.mobileScreenWidth}  
                  ip={this.state.ip}
                  region={this.state.region}
                  widthMode={this.state.widthMode}
          />
          <Searchbar mouseSelectIndex={this.state.mouseSelectIndex}
                     isDark={this.state.isDark} 
                     mouseSelect={this.mouseSelect} 
                     topbarHeight={this.state.topbarHeight} 
                     navbarWidth={this.state.navbarWidth} 
                     toggleMenu={this.state.toggleMenu} 
                     screenWidth={this.state.screenWidth} 
                     widthMode={this.state.widthMode} 
                     mobileScreenWidth={this.state.mobileScreenWidth} 
                     sidebarWidth={this.state.sidebarWidth} 
          />
        </div>
        
        <div className="flex">
          {this.state.toggleMenu ? 
            <Navbar mouseSelectIndex={this.state.mouseSelectIndex} 
              isDark={this.state.isDark} 
              mouseSelect={this.mouseSelect} 
              navbarWidth={this.state.navbarWidth} 
              topbarHeight={this.state.topbarHeight} 
              generateSidebarButtons={this.generateSidebarButtons} 
              generateBottomLinks={this.generateBottomLinks} 
              marginLeft={this.state.marginLeft} 
              widthMode={this.state.widthMode} 
              isSignedIn={this.state.isSignedIn}
            /> : 
            (window.innerWidth>=this.state.mobileScreenWidth ? 
              <SmallNavbar mouseSelectIndex={this.state.mouseSelectIndex} 
                          isDark={this.state.isDark} 
                          mouseSelect={this.mouseSelect} 
                          sidebarWidth={this.state.sidebarWidth} 
                          topbarHeight={this.state.topbarHeight} 
                          isSignedIn={this.state.isSignedIn} 
              /> : 
              null)}
          <Videos sidebarWidth={this.state.sidebarWidth} 
            navbarWidth={this.state.navbarWidth} 
            mouseSelectIndex={this.state.mouseSelectIndex} 
            topbarHeight={this.state.topbarHeight} 
            toggleMenu={this.state.toggleMenu} 
            data={this.state.data} 
            LoadedVideoNumbers={this.state.LoadedVideosEndIndex} 
            fetchData={this.fetchData} 
            canLoad={this.state.canLoad} 
            profilePicsData={this.state.profilePicsData} 
            mouseSelect={this.mouseSelect} 
            screenWidth={this.state.screenWidth} 
            LoadMore={this.LoadMore} 
            mobileScreenWidth={this.state.mobileScreenWidth} 
            widthMode={this.state.widthMode} 
            isAPILoaded={this.state.isAPILoaded}
          />
        </div>
      </ErrorBoundary>
    );
  }
}
export default App;
