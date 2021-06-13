/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { scrollToTop } from '../../App';
import { StoryContext } from '../contexts/Story/StoryContext';
import { UserContext } from '../contexts/User/userContext';
import OgData from '../OgData';
import PreloaderOne from '../Preloader/PreloaderOne';
import SocialModalStory from './SocialModalStory';
import StoryBookMark from './StoryBookMark';
import StoryComment from './StoryComment';
import StoryLikes from './StoryLikes';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import ReportStory from './ReportStory/ReportStory';
import { Helmet } from 'react-helmet';

const StoryDetails = ({ getNotifications }) => {

    const fc = localStorage.getItem('fc')
    const storyInfo = useContext(StoryContext)
    const userData = useContext(UserContext)

    const { followed, setFollowed } = useContext(StoryContext)
    const { follow, setFollowing } = useContext(StoryContext)
    //Like

    useEffect(() => {
        storyInfo.allStoryLikes()
    }, [storyInfo.allStoryLikes])

    //BookMArk

    useEffect(() => {
        storyInfo.getStorybookmarks()
    }, [storyInfo.getStorybookmarks])

    // User BookMArk 

    useEffect(() => {
        userData.getUserbookmarks()
    }, [storyInfo.bookMarkUpdate])


    useEffect(() => {
        userData.getUserFollower()
    }, [followed])

    useEffect(() => {
        userData.getUserFollowing()
    }, [followed])





    const activityID = JSON.parse(localStorage.getItem('userID'))

    //Follow

    const token = localStorage.getItem('token')


    let { id } = useParams()

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    //BookMArk




    const prssedFollow = () => {

        if (follow === 'follow') {
            setFollowing('following')
        } else if (follow === 'following') {
            setFollowing('follow')
        }


        fetch('/prssedFollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                authorization: token
            },
            body: JSON.stringify({ followerID: storyInfo.userID, followeeID: activityID })
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    setFollowed(true)
                    getNotifications()
                }
            })
    }

    useEffect(() => {
        userData.getUserFollower()
    }, [followed])

    useEffect(() => {
        userData.getUserFollowing()
    }, [followed])



    // shuffle(allStories);

    let body = storyInfo.story.map(story => story.body)
    body = body && body.map(e => e.replace(/watch\?v=/g, "embed/").replace(/youtu.be/g, 'youtube.com/embed').replace(/<oembed url/g, '<iframe allowfullscreen=""  width="100%" height="450px" src').replace(/oembed/g, "iframe").replace('///', "'"))



    const title = storyInfo.story.map(story => story.title)
    const des = storyInfo.story.map(story => story.body.substring(0, 100))
    const url = storyInfo.story.map(story => (`https://fnmotivation.com/post/` + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)))
    const img = storyInfo.story.map(story => (`/${story.post_thumbnail}`))

    // const setTitle = async title => {
    //     const el = document.querySelector("meta[name='title']");
    //     await el.setAttribute('content', title)
    // }
    // setTitle(title)

    // const setDescription = async description => {
    //     const el = document.querySelector("meta[name='description']");
    //     await el.setAttribute('content', description)
    // }
    // setDescription(des)

    // const setOgTitle = async title => {
    //     const el = document.querySelector("meta[property='og:title']");
    //     await el.setAttribute('content', title)
    // }
    // setOgTitle(title)

    // const setOgdescription = async description => {
    //     const el = document.querySelector("meta[property='og:description']");
    //     await el.setAttribute('content', description)
    // }
    // setOgdescription(des)

    // const setOgImg = async img => {
    //     const el = document.querySelector("meta[property='og:image']");
    //     await el.setAttribute('content', img)
    // }
    // setOgImg(img)

    // const setOgurl = async url => {
    //     const el = document.querySelector("meta[property='og:url']");
    //     await el.setAttribute('content', url)
    // }
    // setOgurl(url)



    return (
        <>
          <Helmet>
                <meta charset="utf-8" />
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={des} />
                <meta property="og:title" content={title} />
                <meta property="og:image" content={img} />
                <meta property="og:description" content={des} />
                <meta property="og:url" content={url} />
            </Helmet>
            
            {
                storyInfo.preloaderVisibale ? <PreloaderOne />
                    :
                    <div>

                        {
                            storyInfo.story.map((story, index) =>
                                <div key={index} className="article-left">

                                    <OgData title={story.title}
                                        description={story.body.substring(0, 100)}
                                        url={`https://fnmotivation.com/post/` + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)}
                                        image={`/${story.post_thumbnail}`} />

                                    <div className="breadcrumb-main">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                                            <li className="breadcrumb-item"><Link to={"/community/" + story.community_id}>{story.community_title}</Link></li>
                                            <li className="breadcrumb-item active">{story.title.substring(0, 60)}...</li>
                                        </ol>
                                    </div>
                                    <div className="article-blog">

                                        <div className="text-box">


                                            {fc && <ReportStory story={story} user_id = {story.user_id}/>}
                                            <span>{story.community_title}</span>
                                            <div className="article-title">
                                                <div className="article-title-left">
                                                    <h2>{story.title}</h2>
                                                    <p>{moment(story.created_at.split('T')[0]).format('MM-DD-YYYY')}</p>
                                                    <div className="article-title-user">
                                                        <div className="user-holder">
                                                            <img src={`/${story.avatar}`} alt="user" className="image-Short" />
                                                        </div>
                                                        <div className="text-inner">
                                                            <Link to={"/" + story.user_id + "/" + story.username}> <h3>{story.username}</h3></Link>
                                                            {!storyInfo.disabledFollow &&
                                                                <>
                                                                    <h4 style={{ cursor: 'pointer' }} onClick={prssedFollow}>{follow}</h4>
                                                                </>}
                                                        </div>
                                                    </div>
                                                </div>
                                                {fc &&
                                                    <div className="article-title-right">
                                                        <ul>
                                                            <li onClick={handleOpen} style={{ cursor: 'pointer' }} className="d-flex justify-content-center p-3">
                                                                <img src={require(`../../images/share-icon.svg`).default} className="simple-state" alt="share" />
                                                            </li>

                                                            {/* Modal Social */}

                                                            <SocialModalStory open={open} handleClose={handleClose} title={story.title}/>

                                                            {/* All likes and sole Like */}

                                                            <StoryLikes id={id} allLikes={storyInfo.allLikes} getNotifications={getNotifications} />

                                                            <StoryBookMark id={id} />

                                                        </ul>
                                                    </div>}
                                            </div>
                                        </div>
                                        <div className="story-page-text">
                                            <div className="storyBody">
                                                {/* {story.body.split('\n').map((str, index) => <p key={index}>{str}</p>)} */}
                                                <div>{ReactHtmlParser(body)}</div>

                                            </div>
                                        </div>
                                        {fc &&
                                            <div className="article-title-right mobile-version">
                                                <ul>
                                                    <li onClick={handleOpen} style={{ cursor: 'pointer' }} className="d-flex justify-content-center p-3">
                                                        <img src={require(`../../images/share-hover.svg`).default} className="hover-state" alt="share" />
                                                    </li>


                                                    <StoryLikes id={id} allLikes={storyInfo.allLikes} getNotifications={getNotifications} />

                                                    {/* Book Mark */}

                                                    <StoryBookMark id={id} myBookMark={storyInfo.myBookMark} />

                                                </ul>
                                            </div>}
                                        <div className="story-tag">
                                            <h3>Tags</h3>

                                            {story.tags && <>
                                                <ul>
                                                    {story.tags.split(',').map((str, index) =>
                                                        <li key={index}>
                                                            <Link to={"/tags/" + str.replace('#', '')} onClick={scrollToTop}>{str}</Link>
                                                        </li>)}
                                                </ul>
                                            </>}
                                        </div>
                                    </div>


                                    <StoryComment userID={storyInfo.userID} activityID={activityID} storyID={story.story_id} getNotifications={getNotifications} />

                                    <div className="related-articles">
                                        <h3>Related Stories in {story.community_title}</h3>
                                        <div className="row">
                                            {storyInfo.relatedStories.map(story =>
                                                <div key={story.story_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                                                    <Link target='_blank' to={"/post/" + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>
                                                        <div className="related-articles-box">
                                                            <div className="image-holder">
                                                                <img src={`/${story.community_title}.png`} alt="" className="img-fluid" />
                                                            </div>
                                                            <div className="text-box">
                                                                <h4>{story.community_title}</h4>
                                                                <span><strong>{story.username}</strong></span>
                                                                <p>{story.title}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>)}
                                        </div>
                                    </div>
                                </div>)}
                    </div>}
        </>
    );
};

export default StoryDetails;