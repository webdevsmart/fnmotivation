/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { scrollToTop } from '../../App';
import OgData from '../OgData';
import Preloader from '../Preloader/Preloader';


const TagStoryPage = () => {
    let { str } = useParams();

    const [preloaderVisibale, setPreloaderVisibale] = useState(true)
    const [allStories, setAllStories] = useState([])

    const [visible, setVisible] = useState(12)

    const [fetchData, setfetchData] = useState(0)

    const fetchFunc = () => {
        setfetchData(fetchData + 12)
        setVisible(visible + 12)
    }

    const [loading, setLoading] = useState(false)


    const ids = `${str},${fetchData}`

    const AllStoryWithUser = useCallback(  () => {
        setLoading(true)
        fetch('http://localhost:5000/getTagPosts?tag=' + ids)
            .then(res => res.json())
            .then(data => {
                setAllStories(data)
                setPreloaderVisibale(false)
                setLoading(false)
            })

    }, [fetchData]);

    useEffect(() => {
        AllStoryWithUser()
    }, [AllStoryWithUser])

    // const [postPerPage, setPostPerPage] = useState(12)
    // const [currentPage, setCurrentpage] = useState(1)
    // const indexOfLastPost = currentPage * postPerPage;
    // const indexofFirstPost = indexOfLastPost - postPerPage;
    // const currentPosts = allStories.slice(indexofFirstPost, indexOfLastPost)
    // const paginate = pageNumber => setCurrentpage(pageNumber)

    return (
        <div className="related-articles pl-5 pr-5">
            <OgData url={'http://fnmotivation.com/'} title={`Tag - ${str} - FNMotivation`} description={'This new social network is a unique platform that is centered around health and wellness. This platform will provide a central location for people to like-minded people to connect.'} image={'http://localhost:5000/fnmotivation-logo.png'} />
            <div className="story-tag">
                <h3>Tag :</h3>
                <ul>
                    <li>{str}</li>
                </ul>
            </div>

            {preloaderVisibale ? <Preloader />
                :
                <div className="row mt-5">

                    {allStories.map(story =>
                        <div key={story.story_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                            <Link to={"/post/" + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>
                                <div className="related-articles-box">
                                    <div className="image-holder">
                                    {story.post_thumbnail ?
                                        <img src={`http://localhost:5000/${story.post_thumbnail}`} alt="postImage" className="img-fluid content-image cropped" /> :
                                        <img src={require(`../../images/com/${story.community_id}.png`).default} alt="postImage" className="img-fluid content-image" />}
                                    </div>
                                    <div className="text-box">
                                    <h4>{story.community_title}</h4>
                                    <span><strong>{story.username}</strong></span>
                                    <p>{story.title}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>)}
                </div>}
            {loading ? <h4 className="text-warning text-center mt-5 mb-5" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center mt-5 mb-5" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}


        </div>
    );
};

export default TagStoryPage;