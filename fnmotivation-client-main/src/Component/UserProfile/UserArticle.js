/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../App';
import moment from 'moment';
import { UserContext } from '../contexts/User/userContext';
import { CircularProgress } from '@material-ui/core';

const UserArticle = ({ userAllArticle, fetchFunc, loading, fetchData }) => {

    const userAllData = useContext(UserContext)

    const token = localStorage.getItem('token')

    const [searchTxt, setSearchTxt] = useState([])

    const handleChange = (e) => {
        function change(text) {
            return text.replace("'", '///')
        }
        const reply = change(e.target.value)
        setSearchTxt(reply)
    }


    const userID = JSON.parse(localStorage.getItem('userID'))

    //SEacrhc Post of a User


    const searchID = `${userID},${searchTxt}`
    const [userSearchAllStory, setSearchUserAllStory] = useState([])

    const getUserSearchAllArticle = useCallback(  () => {

        fetch('http://68.183.178.196/getUserSearchAllArticle?search=' + searchID)
            .then(res => res.json())
            .then(data => {
                setSearchUserAllStory(data)
            })
    }, [searchID])

    useEffect(() => {
        getUserSearchAllArticle()
    }, [getUserSearchAllArticle])

    const [loader, setLoader] = useState(null)

    const deleteArticle = (id) => {
        setLoader(id)
        fetch('http://68.183.178.196/deleteParticularArticle?id=' + id, {
            method: 'POST',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    userAllData.getAllArticleOfParticularUser()
                    setLoader(null)
                }
            })
    }



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
                <div className="table">
                    <table >
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category <img src={require('../../images/double-arrow.svg').default} alt="" /></th>
                                <th>Date <img src={require('../../images/double-arrow.svg').default} alt="" /></th>
                                <th>Action</th>
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
                                        <td>
                                            {loader === article.id ? <p>...Deleting..</p>
                                                :
                                                <ul>
                                                    <li><a style={{ cursor: 'pointer' }} className="delet-btn" onClick={() => deleteArticle(article.id)}>Delete</a></li>
                                                </ul>}
                                        </td>


                                    </tr>)}
                            </tbody>
                            :
                            <tbody>
                                {userSearchAllStory.slice(0, userAllData.visible).map((article) =>
                                    <tr key={article.id}>
                                        <Link to={"/article/" + article.id} onClick={scrollToTop}>
                                            <td><p>{article.title.substring(0, 60)}...</p></td>
                                        </Link>
                                        <td>{article.community_title}</td>
                                        <td>{moment(article.created_at.split('T')[0]).format('MMMM D YYYY')}</td>
                                        <td>
                                            <ul>
                                                <li><a style={{ cursor: 'pointer' }} className="delet-btn" onClick={() => deleteArticle(article.id)}>Delete</a></li>
                                            </ul>
                                        </td>
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
        </div >

    );
};

export default UserArticle;