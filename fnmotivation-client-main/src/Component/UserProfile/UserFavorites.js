import React, { useContext, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import UserFavoritesStory from './UserFavoritesStory';
import UserFavoritesArticle from './UserFavoritesArticle';
import { UserContext } from '../contexts/User/userContext';

const UserFavorites = ({ userBookMark, fetchFunc, loading }) => {

    const [favshow, setFavShow] = useState('story')

    const {userBookMarkArticle} = useContext(UserContext)

    return (
        <div>

            <div className="text-center user-fav mb-5">
                <span className={favshow === 'story' ? "fav-title activefav" : "fav-title"} onClick={() => setFavShow('story')}><span className="p-2">Stories</span></span>

                <span className={favshow === 'article' ? "fav-title activefav" : "fav-title"} onClick={() => setFavShow('article')}><span className="p-2">Articles</span></span>
            </div>

            {favshow === 'story' && <UserFavoritesStory userBookMark={userBookMark} />}

            {favshow === 'article' && <UserFavoritesArticle userBookMarkArticle={userBookMarkArticle} />}

            {loading ? <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
        </div>

    );
};

export default UserFavorites;