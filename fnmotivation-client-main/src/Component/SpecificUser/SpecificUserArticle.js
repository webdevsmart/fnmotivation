/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../App';
import { SpecificUserContext } from '../contexts/User/specificUserContext';
import moment from 'moment';
import { CircularProgress } from '@material-ui/core';

const SpecificUserArticle = ({ userAllArticle, fetchFunc, loading }) => {

    const userAllData = useContext(SpecificUserContext)

    const [searchTxt, setSearchTxt] = useState([])

    const handleChange = (e) => {
        function change(text) {
            return text.replace("'", " ")
        }
        const reply = change(e.target.value)
        setSearchTxt(reply)
    }

    const { userID } = useContext(SpecificUserContext)

    //SEacrhc Post of a User

    const [userSearchAllArticle, setSearchUserAllArticle] = useState([])

    const searchID = `${userID},${searchTxt}`

    const getUserSearchAllArticle = useCallback(  () => {

        fetch('http://68.183.178.196/getUserSearchAllArticle?search=' + searchID)
            .then(res => res.json())
            .then(data => {
                setSearchUserAllArticle(data)
            })
    }, [searchID])

    useEffect(() => {
        getUserSearchAllArticle()
    }, [getUserSearchAllArticle])


    return (
        <div>
            <div className="profile-posts-view mt-5 p-4">
                <form>
                    <input type="text" onChange={handleChange} className="form-control" placeholder="Search Articles" />
                    <a><img src={require('../../images/search-icon.svg').default} alt="searchicon" /></a>
                </form>
                <a className="view-all" href="/articles">View all Articles</a>
            </div>
            <div className="profile-posts-inner">
                <div className="table-responsive">
                    <table >
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category <img src={require('../../images/double-arrow.svg').default} alt="" /></th>
                                <th>Date <img src={require('../../images/double-arrow.svg').default} alt="" /></th>
                            </tr>
                        </thead>
                        {searchTxt.length === 0 ?
                            <tbody>
                                {userAllArticle.map((article) =>
                                    <tr key={article.id}>
                                        <Link to={"/article/" + article.id} onClick={scrollToTop}>
                                            <td><p>{article.title.substring(0, 60)}...</p></td>
                                        </Link>
                                        <td>{article.community_title}</td>
                                        <td>{moment(article.created_at.split('T')[0]).format('MMMM D YYYY')}</td>
                                    </tr>)}
                            </tbody>
                            :
                            <tbody>
                                {userSearchAllArticle.slice(0, userAllData.visible).map((article) =>
                                    <tr key={article.id}>
                                        <Link to={"/article/" + article.id} onClick={scrollToTop}>
                                            <td><p>{article.title.substring(0, 60)}...</p></td>
                                        </Link>
                                        <td>{article.community_title}</td>
                                        <td>{moment(article.created_at.split('T')[0]).format('MMMM D YYYY')}</td>
                                    </tr>)}
                            </tbody>}
                    </table>
                </div>
            </div>
            {searchTxt.length === 0 ?
                <>
                    {loading ?
                        <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4>
                        :
                        <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
                </>
                :
                <>
                    {loading ?
                        <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4>
                        :
                        <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }} onClick={userAllData.handleVisible}>Load More</h4>}
                </>}
        </div>

    );
};

export default SpecificUserArticle;