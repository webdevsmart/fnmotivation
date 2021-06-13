import moment from 'moment';
import React from 'react';
import { scrollToTop } from '../../App';

const UserFavoritesArticle = ({userBookMarkArticle}) => {
    console.log(userBookMarkArticle)
    return (

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
                    {userBookMarkArticle.map((article) =>
                        <tr key={article.p_bookmark_id}>
                            <a href={"/article/" + article.post_id} onClick={scrollToTop}>
                                <td><p>{article.title.substring(0, 60)}...</p></td>
                            </a>
                            <td>{article.community_title}</td>
                            <td>{moment(article.created_at.split('T')[0]).format('MMMM D YYYY')}</td>


                        </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default UserFavoritesArticle;