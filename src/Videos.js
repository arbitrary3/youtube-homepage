import React from 'react';
import { useEffect } from 'react';


const Videos = React.memo(({ sidebarWidth, navbarWidth, mouseSelectIndex, isDark, toggleMenu, topbarHeight, LoadedVideoNumbers, fetchData, 
                             data, canLoad, profilePicsData, mouseSelect, screenWidth, LoadMore, mobileScreenWidth, widthMode, isAPILoaded}) => {
    
  useEffect(() => {
    window.addEventListener('scroll', loadMore);

    return () => {
      window.removeEventListener('scroll', loadMore);
    };
  },[])
    
  //GENERATING VIDEOS
  const generateVideos = (startIndex,endIndex,styleVideo,styleImage,styleProfileContainer,styleTitleContainer,styleTitle,styleProfilePic) => {
      //If data doesn't exist , set canLoad = true
      if (!data) {canLoad=false;data=[]};

      var videos = canLoad ? data.slice(startIndex,endIndex) : ["","","","","","","","",""];
      
      return videos.map((video,index) => {
        var videoSrc = `https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&modestbranding=1&start=0&end=60`;
        var videoID="video"+index;

        return (
            <a className="flex flex-col gap-[8px] text-decoration-none" 
               href="#Menu" 
               key={index} 
               style={styleVideo} 
               onMouseEnter={() => mouseSelect(videoID)} 
               onMouseLeave={() => mouseSelect(null)}
            >
              {/*VIDEO THUMBNAIL STARTS HERE*/}
              {canLoad ? 
                ((mouseSelectIndex===videoID && canLoad) ? 
                  (<iframe title="video" 
                           width="100%" 
                          height="calc(100% * 0.7576)" 
                          src={videoSrc} 
                          gesture="media" 
                          allow="autoplay; encrypted-media" 
                          style={{"aspectRatio": "330 / 180"}}>
                  </iframe>) : 
                  <img id={videoID} 
                       style={styleImage(videoID)} 
                       src={canLoad ? 
                           ((screenWidth<=mobileScreenWidth && screenWidth>300) ? 
                              video.snippet.thumbnails.high.url : video.snippet.thumbnails.medium.url) : ""} 
                        alt={canLoad ? video.snippet.title : ""} 
                  />
                ) :
                (<div className="w-full h-[200px] bg-black rounded-lg"></div>)
              }
              {/*VIDEO THUMBNAIL ENDS HERE*/}

              {/*VIDEO INFO STARTS HERE*/}
              <div className="flex justify-start"
                   style={{"height": "90px"}} 
              >

                {/*PROFILE PIC STARTS HERE*/}
                <div className="items-center" 
                     style={styleProfileContainer}
                >
                  {canLoad ? 
                    (<img style={styleProfilePic} src={canLoad ? profilePicsData[index] : ""} alt="Thumbnail" />) : 
                    (<div className="w-full h-full bg-[#f2f2f2] rounded-lg"></div>)
                  }
                </div>
                {/*PROFILE PIC ENDS HERE*/}

                <div className="flex flex-col items-left px-2 leading-relaxed" style={styleTitleContainer}>
                  {/*TITLE STARTS HERE*/}
                  <div>
                    {canLoad ? 
                      (<p className="block text-left m-0" style={styleTitle}>{video.snippet.title}</p>) : 
                      (<div className="w-full h-[20px] bg-[#f2f2f2] rounded-lg"></div>)
                    }
                  </div>
                  <div className="flex" style={styleVideoInfo}>
                    {canLoad ? 
                      (<p className="" style={{"color": "#60608c"}}> {`${canLoad ? video.snippet.channelTitle : "YouTube User"} · `}
                        {screenWidth >= mobileScreenWidth ? null : (
                          <>
                            {canLoad ? formatViews(video.statistics.viewCount) : formatViews(420)}{" "}
                            {canLoad ? (video.statistics.viewCount === 1 ? "view" : "views") : "views"} ·{" "}
                            {canLoad ? timeAgo(video.snippet.publishedAt) : "1 hour ago"}
                          </>
                        )}
                      </p>) : 
                      (<div className="mt-[5px] w-full h-[20px] bg-[#f2f2f2] rounded-lg"></div>)
                    }
                    {canLoad ? 
                      (screenWidth>=mobileScreenWidth ? 
                        (<p className="" style={{"color": "#60608c","marginTop": "-12px"}}>
                          {canLoad ? formatViews(video.statistics.viewCount) : formatViews(420)}{" "}
                          {canLoad ? (video.statistics.viewCount === 1 ? "view" : "views") : "2 views"} ·{" "}
                          {canLoad ? timeAgo(video.snippet.publishedAt) : "1 hour ago"}
                        </p>) : null) : 
                      (<div className="mt-[5px] w-full h-[20px] bg-[#f2f2f2] rounded-lg"></div>)}
                  </div>
                </div>
            </div>
            {/*VIDEO INFO ENDS HERE*/}
          </a>);
      });
    };
    
    const loadMore = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
          LoadMore();
      }
    }
    
    const formatViews = views => {
      if (views>=10000000000) {
        return ((views/1000000000).toFixed(0) + "B");
      } else if (views>=1000000000) {
        return ((views/1000000000).toFixed(1) + "B");
      } else if (views>=10000000) {
        return ((views/1000000).toFixed(0) + "M");
      } else if (views>=1000000) {
        return ((views/1000000).toFixed(1) + "M");
      } else if (views>=10000) {
        return ((views/1000).toFixed(0) + "k");
      } else if (views>=1000) {
        return ((views/1000).toFixed(1) + "k");
      }
    }
  
    const timeAgo = time => {
      const currentTime = new Date();
      const lastPost = new Date(time);
  
      const timeDifference = currentTime - lastPost;
      const msPerMinute = 1000 * 60;
  
      const minutesAgo = Math.floor(timeDifference / msPerMinute);
      const hoursAgo = Math.floor(minutesAgo / 60);
      const daysAgo = Math.floor(hoursAgo / 24);
  
      if (minutesAgo < 60) {
        return `${minutesAgo} ${(minutesAgo===1) ? "minute" : "minutes"} ago`;
      }
  
      if (hoursAgo < 24) {
        return `${hoursAgo} ${(hoursAgo===1) ? "hour" : "hours"} ago`;
      }
  
      return `${daysAgo} ${(daysAgo===1) ? "day" : "days"} ago`;
    };
    
    const styleVideo = {
      //"border": "1px solid red",
      "width": screenWidth>=mobileScreenWidth ? "calc(100% - 10px)" : "100%",
      "height": "calc(100% * (250px / 330px))",
      "marginBottom": "15px"
    }
    const styleImage = id => ({
      "marginLeft": screenWidth>=mobileScreenWidth ? "2px" : "0px",
      "width": mouseSelectIndex===id ? "calc(100% - 4px)" :"100%",
      "borderRadius": screenWidth>=mobileScreenWidth ?(mouseSelectIndex===id ? "0px" : "15px") : ("0px")
    })
    const styleProfileContainer = {
      //"border": "1px solid red",
      "width": "15%",
      "height": "100%"
    }
    const styleProfilePic = {
      "width": screenWidth>=mobileScreenWidth ? "93%" : "80%",
      "borderRadius": "50%",
      "margin": "auto"
    }
    const styleTitleContainer = {
      "fontSize": screenWidth>=mobileScreenWidth ? "1em" : (screenWidth>=300 ? "0.9em" : "0.7em"),
      "marginTop": "8px",
      //"border": "1px solid blue",
      "width": "85%",
      "height": "100%",
      "textDecoration": "none",
      "color": "black",
      "overflow": "hidden"
    }
    const styleTitle = {
      "fontSize": (screenWidth>=300 ? "17px" : "15px"),
      "fontWeight": "500",
      "maxHeight": "2.4em",
      "lineHeight": "1.2em",
      "color": "black",
      "overflow": "hidden",
      "textOverflow": "ellipsis"
    }
    const styleVideoInfo = {
      "marginTop": "0px",
      //"border": "1px solid red",
      "flexDirection": screenWidth>=mobileScreenWidth ? "column" : null,
      "gap": "5px"
    }
    
    
    return (
      <div id="videoContainer" 
           className="font-roboto text-decoration-none"
           style={{//
            "width": screenWidth>=mobileScreenWidth ? `calc(100% - ${(toggleMenu && (widthMode === 0)) ? navbarWidth : sidebarWidth})` : "100%",
            "marginTop": topbarHeight,
            "marginLeft": (toggleMenu && (widthMode === 0)) ? `calc(${navbarWidth} + 7px)` : (screenWidth>=mobileScreenWidth ? sidebarWidth : "0px"),
            "marginRight": screenWidth>=mobileScreenWidth ? "auto" : "0px",
            "pointerEvents": (toggleMenu && !(widthMode === 0)) ? "none" : "auto",
            "backgroundColor": (toggleMenu && !(widthMode === 0)) ? "gray" : "white"
          }}
    >         
        <div className="grid gap-[8px]" 
             style={{
              "gridTemplateColumns": screenWidth>=1080 ? "33% 33% 33%" : (screenWidth>=mobileScreenWidth ? "50% 50%": "100%"),
              "width": screenWidth>=mobileScreenWidth ? "calc(100% - 6px)" : "100%",
              "margin": window.width>=mobileScreenWidth ? "30px auto" : "30px 0px"
            }}
        > 
          {generateVideos(0,LoadedVideoNumbers,styleVideo,styleImage,styleProfileContainer,styleTitleContainer,styleTitle,styleProfilePic)}
        </div>
      </div>
    );
  }, (prevProps,nextProps) => {
       return (prevProps.toggleMenu === nextProps.toggleMenu && prevProps.LoadedVideoNumbers === nextProps.LoadedVideoNumbers && prevProps.screenWidth === nextProps.screenWidth && prevProps.mouseSelectIndex === nextProps.mouseSelectIndex && prevProps.data === nextProps.data && prevProps.profilePicsData === nextProps.profilePicsData && prevProps.widthMode === nextProps.widthMode)
     }
);

export default Videos;