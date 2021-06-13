/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { scrollToTop } from '../../App';
import { ArticleContext } from '../contexts/Article/ArticleContext';
import { UserContext } from '../contexts/User/userContext';
import PreloaderOne from '../Preloader/PreloaderOne';
import ArticleBookMark from './ArticleBookMark';
import ArticleComment from './ArticleComment';
import ArticleLikes from './ArticleLikes';
import SocialModalArticle from './SocialModalArticle';
import moment from 'moment';
import OgData from '../OgData';
import ArticleReport from './ArticleReport/ArticleReport';

const ArticleDetails = ({ getNotifications }) => {

    const fc = localStorage.getItem('fc')
    const articleInfo = useContext(ArticleContext)
    const userData = useContext(UserContext)
    const activityID = JSON.parse(localStorage.getItem('userID'))

    const { followed, setFollowed } = articleInfo
    const { follow, setFollowing } = articleInfo

    useEffect(() => {
        articleInfo.allarticleLikes()
    }, [articleInfo.allarticleLikes])

    useEffect(() => {
        articleInfo.getArticlebookmarks()
    }, [articleInfo.getArticlebookmarks])

    useEffect(() => {
        userData.getUserFollower()
    }, [userData.getUserFollower, followed])

    useEffect(() => {
        userData.getUserFollowing()
    }, [userData.getUserFollowing, followed])


    const token = localStorage.getItem('token')

    const prssedFollow = () => {

        if (follow === 'follow') {
            setFollowing('following')
        } else if (follow === 'following') {
            setFollowing('follow')
        }


        fetch('http://68.183.178.196/prssedFollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                authorization: token
            },
            body: JSON.stringify({ followerID: articleInfo.userID, followeeID: activityID })
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    setFollowed(true)
                    getNotifications()
                }
            })
    }


    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    let { articleID } = useParams();

    return (
        <>
            { articleInfo.preloaderVisibale ? <PreloaderOne />
                :
                <div className="article-left">
                    {articleInfo.article.map((article, index) =>
                        <>
                            <div key={index} className="breadcrumb-main">
                                <OgData url={`http://fnmotivation.com/article/${articleID}`} title={article.title && article.title.substring(0, 60)} description={article.description && article.description.substring(0, 100)} image={article.img_link} />
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item"><Link to="/">{article.community_title}</Link></li>
                                    <li className="breadcrumb-item active">{article.title.substring(0, 60)}...</li>
                                </ol>
                            </div>
                            <div className="article-blog">
                                <ArticleReport article={article} user_id={article.user_id}/>
                                <div className="text-box">
                                    <span>{article.community_title}</span>
                                    <div className="article-title">
                                        <div className="article-title-left">
                                            <h2>{article.title}</h2>
                                            <p>{moment(article.created_at.split('T')[0]).format('MM-DD-YYYY')}</p>
                                            <div className="article-title-user">
                                                <div className="user-holder">
                                                    <img src={`http://68.183.178.196/${article.avatar}`} alt="user" className="image-Short" />
                                                </div>
                                                <div className="text-inner">
                                                    <Link to={"/" + article.user_id + "/" + article.username}> <h3>{article.username}</h3></Link>
                                                    {!articleInfo.disabledFollow &&
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
                                                    <SocialModalArticle open={open} handleClose={handleClose} title={article.title} />

                                                    <ArticleLikes articleID={articleID} allLikes={articleInfo.allLikes} getNotifications={getNotifications} />
                                                    <ArticleBookMark articleID={articleID} />
                                                </ul>
                                            </div>}
                                    </div>
                                </div>
                                <div className="image-holder">
                                    <img src={article.img_link} alt="articleImage" className="img-fluid" />
                                    <h5 className="mt-3">Source: {article.source_text.match(/(?:www\.)?(\w*)\./)[1]}</h5>
                                    <h5 className="mt-3">{article.description}</h5>
                                    <a target="_blank" rel="noopener noreferrer" href={article.redirect_link}>{article.redirect_link}</a>
                                </div>
                                {fc &&
                                    <div className="article-title-right mobile-version">
                                        <ul>
                                            <li onClick={handleOpen} style={{ cursor: 'pointer' }} className="d-flex justify-content-center p-3">
                                                <img src={require(`../../images/share-icon.svg`).default} className="simple-state" alt="share" />
                                            </li>
                                            <SocialModalArticle open={open} handleClose={handleClose} title={article.title} />
                                            <ArticleLikes articleID={articleID} allLikes={articleInfo.allLikes} getNotifications={getNotifications} />
                                            <ArticleBookMark articleID={articleID} />
                                        </ul>
                                    </div>}
                            </div>


                            <ArticleComment articleID={articleID} getNotifications={getNotifications} />

                            <div className="related-articles">
                                <h3>Related News & Articles in {article.community_title}</h3>
                                <div className="row">
                                    <div key={article.article_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Link target="_blank" to={"/article/" + article.id} onClick={scrollToTop}>
                                            <div className="related-articles-box">
                                                <div className="image-holder">
                                                    <img src={`http://68.183.178.196/${article.community_title}.png`} alt="articleImage" className="img-fluid content-image" />
                                                </div>
                                                <div className="text-box">
                                                    <h4>{article.community_name}</h4>
                                                    <h4>{article.title.slice(0, 35)}...</h4>
                                                    <span><strong>{article.username}</strong></span>
                                                    <span><strong>Source: {article.source_text.match(/(?:www\.)?(\w*)\./)[1]}</strong></span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>)}
                </div>}
        </>
    );
};

export default ArticleDetails;