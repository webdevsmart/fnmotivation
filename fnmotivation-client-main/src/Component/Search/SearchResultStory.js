/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../App';
import Preloader from '../Preloader/Preloader';
import ReactHtmlParser from 'react-html-parser';
import Pagination from '../Story/Pagination';

const SearchResultStory = ({ search, location, handleChange, checkKeyDown }) => {

    const [preloaderVisibale, setPreloaderVisible] = useState(true)
    const [allStories, setAllStories] = useState([])

    // const [visible, setVisible] = useState(12)

    // const [fetchData, setfetchData] = useState(0)

    // const fetchFunc = () => {
    //     setfetchData(fetchData + 12)
    //     setVisible(visible + 12)
    // }

    const [loading, setLoading] = useState(false)

    const data = search

    const SearchedStory = useCallback(  () => {
        setLoading(true)
        fetch('http://localhost:5000/getSearchedStory?search=' + data)
            .then(res => res.json())
            .then(data => {
                setAllStories(data)
                setPreloaderVisible(false)
                setLoading(false)
            })

    }, [data]);



    useEffect(() => {
        SearchedStory()
    }, [SearchedStory])

    const [postPerPage, setPostPerPage] = useState(12)
    const [currentPage, setCurrentpage] = useState(1)
    const indexOfLastPost = currentPage * postPerPage;
    const indexofFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = allStories.slice(indexofFirstPost, indexOfLastPost)
    const paginate = pageNumber => setCurrentpage(pageNumber)

    return (
        <div>
            <h5 className="text-center">You Searched for "<b>{search}</b>"</h5>
            <form  className="p-5" onSubmit={e => { e.preventDefault(); }}>
                <input type="text" onChange={handleChange} defaultValue={search} className="form-control" placeholder="Search" />
            </form>
            <div className="article-left">
                <div className="pre-login-inner">

                    {/* Recent */}

                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-recent" role="tabpanel" aria-labelledby="pills-home-tab">
                            <div className="related-articles">
                                
                                {preloaderVisibale ? <Preloader />
                                    :
                                    <div className="row">
                                        {/* data-toggle="modal" data-target="#exampleModal" */}
                                        {currentPosts.map(story =>
                                            <div key={story.story_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                                                <Link to={"/post/" +story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>
                                                    <div className="related-articles-box">
                                                        <div className="image-holder">
                                                            <img src={`http://localhost:5000/${story.post_thumbnail}`} alt="articleImage" className="img-fluid content-image" />
                                                        </div>
                                                        <div className="text-box">
                                                            <h4>{story.community_title}</h4>
                                                            <span><strong>{story.username}</strong></span>
                                                            <p>{story.short_story === 'null' ? <div>{ReactHtmlParser(story.body.substring(0, 65))}</div> : story.short_story.substring(0, 25)}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>)}
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>

                <Pagination postPerPage={postPerPage} totalPosts={allStories.length} paginate={paginate} />

            </div>
        </div >
    );
};

export default SearchResultStory;