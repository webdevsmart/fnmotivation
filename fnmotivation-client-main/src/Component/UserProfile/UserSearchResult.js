import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../App';
import moment from 'moment';

const UserSearchResult = ({ userSearchAllStory }) => {
    const token = localStorage.getItem('token')
    const deleteStory = (id) => {
        fetch('http://68.183.178.196/api//deleteParticularStory?id=' + id, {
            method: 'POST',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    if (typeof window !== 'undefined') {
                        // it's safe to use window now
                        window.location.reload()
                      }
                }
            })
    }

    return (
        <div>
            <div className="table-responsive">
                <table >
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category <img src={require('../../images/double-arrow.svg').default} alt="" /></th>
                            <th>Date <img src={require('../../images/double-arrow.svg').default} alt="" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userSearchAllStory.map((story, index) =>
                            <tr key={story.story_id}>
                                <Link to={"/post/" + story.story_id} onClick={scrollToTop}>
                                    <td><p>{story.title}</p></td>
                                </Link>
                                <td>{story.community_name}</td>
                                <td>{moment(story.created_at.split('T')[0]).format('MMMM D YYYY')}</td>
                                <td>
                                    <ul>
                                        <Link to={"/post/edit/" + story.story_id} onClick={scrollToTop}>
                                            <li> <a style={{ cursor: 'pointer' }}>Edit</a></li>
                                        </Link>
                                        <li><a style={{ cursor: 'pointer' }} className="delet-btn" onClick={() => deleteStory(story.story_id)}>Delete</a></li>
                                    </ul>
                                </td>


                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserSearchResult;