import React, { useEffect, useState } from 'react'
import VCard from './VCard'
import './CSS/vcard.css'
import LoadingSpin from './LoadingSpin'

function Home() {
    const [video, setVideo] = useState([])
    const fetchData = async () => {
        let data = await fetch('https://vast-goat-slacks.cyclic.app/displayvideo', {
            method: "GET"
        });
        let videoData = await data.json()
        setVideo(videoData.videos)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        fetchData();
        // eslint-disable-next-line
    }, [])
    return (<>
    {
        !video.length && <LoadingSpin/>
    }
        <div className="card-main  d-flex flex-wrap justify-content-center">
            {
                video !== [] && video.map((data, i) => {
                    return (

                        <VCard key={i}
                            title={data.title}
                            image={data.img}
                            source={data.sources}
                           
                        />
                    )
                })
            }


        </div>
        </>)
}

export default Home