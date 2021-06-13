import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../App';

const UserFavoritesStory = ({ userBookMark,  fetchFunc, loading  }) => {

    return (
        <div>
            <div className="table-responsive">
                <table >
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category <img src={require('../../images/double-arrow.svg').default} alt="" /></th>
                            <th>Date <img src={require('../../images/double-arrow.svg').default} alt="" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userBookMark.map((story) =>
                            <tr key={story.story_id}>
                                <Link to={"/post/" + story.story_id + "/" + story.title.replace(/\s/g, '-').substring(0, 60)} onClick={scrollToTop}>
                                    <td><p>{story.title.substring(0, 60)}...</p></td>
                                </Link>
                                <td>{story.community_title}</td>
                                <td>{moment(story.created_at.split('T')[0]).format('MMMM D YYYY')}</td>

                            </tr>)}
                    </tbody>
                </table>
            </div>
            
        </div>

    );
};

export default UserFavoritesStory;