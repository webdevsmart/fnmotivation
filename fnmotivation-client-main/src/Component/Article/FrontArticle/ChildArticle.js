import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../App';

const ChildArticle = ({ preloaderVisibale, allArticle }) => {
    console.log(allArticle)
    return (
        <div>
            <div className="row">

                {allArticle.map(article =>
                    <div key={article.post_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                        <Link to={"/article/" + article.post_id} onClick={scrollToTop}>
                            <div className="related-articles-box">
                                <div className="image-holder">
                                    <img src={article.img_link} alt="articleImage" className="img-fluid content-image cropped" />
                                </div>
                                <div className="text-box">
                                    <h4>{article.community_title}</h4>
                                    <span><strong>Source: {article.source_text.match(/(?:www\.)?(\w*)\./)[1]}</strong></span>
                                    <p>{article.title.slice(0, 35)}...</p>
                                    <span><strong>{article.username}</strong></span>
                                </div>
                            </div>
                        </Link>
                    </div>)}
            </div>
        </div>
    );
};

export default ChildArticle;