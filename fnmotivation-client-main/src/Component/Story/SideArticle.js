/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';

const SideArticle = () => {
    const [load, setLoad] = useState(false)
    const [allArticle, setAllArticle] = useState([])
    const getAllArticle = useCallback(() => {
        setLoad(true)
        fetch('/getAllArticle?show=' + 0)
            .then(res => res.json())
            .then(data => {
                setAllArticle([...allArticle, ...data])
                setLoad(false)
            })
    }, [])

    useEffect(() => {
        getAllArticle()
    }, [getAllArticle])


    return (
        <div className="article-left-right">
            <div className="article-stories">
                <div className="title">
                    <h3>NEWS STORIES</h3>
                    <a href="/articles">View all</a>
                </div>
                {load ?
                    <div className="article-stories-box">
                        <span className="text-center">...Loading Article...</span>
                    </div>
                    :
                    allArticle.map(article =>
                        <div key={article.id} className="article-stories-box">
                            <span>{article.community_title}</span>
                            <a href={"/article/" + article.id}><h3>{article.title.substring(0, 60)}...</h3></a>
                            <h4>Source: {article.source_text.match(/(?:www\.)?(\w*)\./)[1]}</h4>
                            <p>{article.description && article.description.substring(0, 150)}...</p>
                            <div className="text-center">
                                <a href={"/article/" + article.id}>Read more</a>
                            </div>
                        </div>)}
            </div>
        </div>
    );
};

export default SideArticle;