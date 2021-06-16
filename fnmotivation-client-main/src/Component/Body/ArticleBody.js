import React, { useState } from 'react';
import OgData from '../OgData';
import AllStories from '../Story/AllStories';
import ShortStory from '../Story/ShortStory';

const ArticleBody = () => {

    const [fetchData, setfetchData] = useState(0)
    const [artfetchData, setArtfetchData] = useState(0)
    const fetchFunc = () => {
        setfetchData(fetchData + 12)
        setArtfetchData(artfetchData + 4)
    }

    return (
        <div>
            <OgData url={'http://fnmotivation.com/'} title={'FNMotivation'} description={'This new social network is a unique platform that is centered around health and wellness. This platform will provide a central location for people to like-minded people to connect.'} image={'http://68.183.178.196/api//fnmotivation-logo.png'} />
            <section className="article-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-lg-8 col-md-12">
                            <AllStories fetchData={fetchData} fetchFunc={fetchFunc} />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-12">
                            <ShortStory artfetchData={artfetchData} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticleBody;