import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../App';

const StoryChild = ({ preloaderVisibale, allStories }) => {
    return (
        <div className="related-articles">
            <div className="row">

                {allStories.map(story =>
                    <div key={story.story_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                        <Link to={"/post/" + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>
                            <div className="related-articles-box">
                                <div className="image-holder">
                                    {story.post_thumbnail ?
                                        <img src={`http://68.183.178.196/api//${story.post_thumbnail}`} alt="postImage" className="img-fluid content-image cropped" /> :
                                        <img src={require(`../../../images/com/${story.community_id}.png`).default} alt="postImage" className="img-fluid content-image" />}
                                </div>
                                <div className="text-box">
                                    <h4>{story.community_title}</h4>
                                    <span><strong>{story.username}</strong></span>
                                    <p>{story.title}</p>
                                    {/* <p>{story.short_story === 'null' ? <div>{story.body.substring(0, 65).replace(/<\/?[a-zA-Z]+>/gi,'').replace('&nbsp;', ' ')}</div> : story.short_story.substring(0, 25)}</p> */}
                                </div>
                            </div>
                        </Link>
                    </div>)}
            </div>
        </div>
    );
};

export default StoryChild;