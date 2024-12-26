import React from 'react'

import video from '../../../../images/video.mp4';
import video2 from '../../../../images/video2.mp4';
import video3 from '../../../../images/video3.mp4';

const VideoPlayer = () => {
    return (
        <div className='p-1 flex gap-2 sm:h-[170px] md:h-[200px] lg:h-[180px] xl:h-[200px]'>
            <video className='rounded-md ' autoPlay muted controls >
                <source src={video3} type="video/mp4" />
            </video>

            <video className='rounded-md hidden sm:block' autoPlay muted controls >
                <source src={video} type="video/mp4" />
            </video>

            <video className='rounded-md hidden lg:block' autoPlay muted controls >
                <source src={video2} type="video/mp4" />
            </video>



        </div>
    )
}

export default VideoPlayer