/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { CircularProgress } from '@material-ui/core';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import OgData from '../OgData';
import ShortPreloader from '../Preloader/ShortPreloader';

const PostArticle = () => {
    const token = localStorage.getItem('token')
    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()

    const userID = JSON.parse(localStorage.getItem('userID'))

    const [preloaderVisibale, setPreloaderVisible] = useState(false)
    const [preloaderSendArticle, setPreloaderSendArticle] = useState(false)

    const [articleDetails, setArticleDetails] = useState([])
    const [category, setCategory] = useState([])
    const [msg, setMsg] = useState(null)
    const { register, handleSubmit, errors } = useForm();
    
    const mail = localStorage.getItem('email_article_successfull')
    console.log(mail)

    const onSubmit = (data) => {
        setPreloaderVisible(true)

        fetch('http://68.183.178.196/api//getArticlePreview?url=' + data.articleLink, {
            method: 'GET',
            headers: { authorization: token }
        })
            .then(res => res.json())
            .then(result => {
                if (result.msg) {
                    setMsg(result.msg)
                }
                else {
                    setArticleDetails(result)
                }
                setPreloaderVisible(false)
                executeScroll()
            })
    }
    const handleCategory = (e) => {
        const data = {}
        data[e.target.name] = e.target.value
        setCategory(data)
    }
    const [catErr, setCatErr] = useState(false)
    const postArticle = () => {
        if (category.length == 0) {
            setCatErr(true)
        }
        if(category.length !== 0){
            setPreloaderSendArticle(true)
        fetch('http://68.183.178.196/api//postArticle', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            },
            body: JSON.stringify({
                articleTitle: articleDetails.ogTitle,
                articleCommunity: category.category,
                sourceText: articleDetails.ogUrl,
                link: articleDetails.ogUrl,
                articleDescription: articleDetails.ogDescription,
                articleImageLink: articleDetails.ogImage ? articleDetails.ogImage : 'http://68.183.178.196/api//no-image.jpg',
                userID: userID,
                mail: mail
            })
        })
            .then(res => res.json())
            .then(data => {

                if (data.affectedRows > 0) {
                    if (typeof window !== 'undefined') {
                        // it's safe to use window now
                        
                        window.location = "/articles"
                        
                      }
                    setPreloaderSendArticle(false)
                }
            })
        }
    }

    return (
        <section className="post-story-sec">
            <OgData url={'http://fnmotivation.com/post-article'} title={'Post Article - FNMotivation'} description={'This new social network is a unique platform that is centered around health and wellness. This platform will provide a central location for people to like-minded people to connect.'} image={'http://68.183.178.196/api//fnmotivation-logo.png'} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="post-story-inner">
                            <h3>Enter the link of the article you want to share:</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="form-group">
                                            <label>Article Link</label>
                                            <input type="text" name="articleLink" className="form-control" placeholder="Post Your Article Link" ref={register({ required: true })} />
                                            {errors.articleLink && <span>This field is required</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <button className="post-btn preview-article" type="submit">Preview Article</button>
                                </div>
                                {msg &&
                                    <div className="alert alert-danger m-3 text-center" role="alert">
                                        {msg}
                                    </div>}
                                {preloaderVisibale ? <ShortPreloader />
                                    :
                                    <div className="row" ref={myRef}>
                                        {articleDetails.length !== 0 &&
                                            <div className="col-md-4">
                                                <div className="related-articles-box">
                                                    <div className="image-holder">
                                                        {articleDetails.ogImage ? <img src={articleDetails.ogImage} alt="artcileImage" className="img-fluid" /> : <img src="http://68.183.178.196/api//no-image.jpg" alt="no-show" />}
                                                    </div>
                                                    <div className="text-box">
                                                        <h4>{articleDetails.ogTitle ? articleDetails.ogTitle : <p>No Url available</p>}</h4>
                                                        <span>{articleDetails.ogUrl ? articleDetails.ogUrl : <p>No Url available</p>}</span>
                                                    </div>
                                                </div>
                                            </div>}
                                    </div>}
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Select Category</label>
                                            <select name="category" onChange={handleCategory} className="form-control">
                                                <option>Select Community</option>
                                                <option value="3">Eating Disorder</option>
                                                <option value="4">Weight Issues</option>
                                                <option value="5">Heart Diseases</option>
                                                <option value="6">Anxiety</option>
                                                <option value="7">Depression</option>
                                                <option value="1">Drug Addiction</option>
                                                <option value="8">Insecurity</option>
                                                <option value="9">Mental Health</option>
                                                <option value="10">Stress</option>
                                                <option value="2" >Alchohol Addiction</option>
                                                <option value="11" >Smoking</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {catErr && <h4 className="mt-5 mb-5">**Must Select a community</h4>}
                                {preloaderSendArticle ?
                                    <div className="alert alert-warning m-3 text-center form-group" role="alert">
                                        <CircularProgress className="mt-2" /><br></br>...Posting...
                                        </div>
                                    :
                                    <div className="form-group">
                                        <a className="post-btn" onClick={postArticle}>Post Article</a>
                                    </div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostArticle;