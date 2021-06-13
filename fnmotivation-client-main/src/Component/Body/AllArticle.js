import React from 'react';
import ArticleDetails from '../Article/ArticleDetails';
import { AricleInfoProvider } from '../contexts/Article/ArticleContext';
import SideArticle from '../Story/SideArticle';

const AllArticle = ({getNotifications}) => {
    return (
        <AricleInfoProvider>
            <section className="article-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-lg-8 col-md-12">
                            <ArticleDetails getNotifications={getNotifications}/>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-12">
                            <SideArticle />
                        </div>
                    </div>
                </div>
            </section>
        </AricleInfoProvider>
    );
};

export default AllArticle;