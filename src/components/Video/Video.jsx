import React from "react";

import video from "../../../public/IOT's Advertisement.mp4";

export default function VideoCom()
{
    return(
        <div className="video-container">

             <video
                      className="md:w-full md:h-auto mt-4 h-fit md:mt-[-90px]"
                      autoPlay
                      loop
                      muted
                      src={video}
                    ></video>
        </div>
    )
}