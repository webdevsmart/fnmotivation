import React, { useContext, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import SpecifiFavoritesArticle from './SpecifiFavoritesArticle';
import SpecifiFavoritesStory from './SpecifiFavoritesStory';
import { SpecificUserContext } from '../contexts/User/specificUserContext';

const SpecificUserFavorites = ({ userBookMark,  fetchFunc, loading  }) => {

    const [favshow, setFavShow] = useState('story')

    const {userBookMarkArticle} = useContext(SpecificUserContext)
    return (
        <div>

            <div className="text-center user-fav mb-5">
                <span className={favshow === 'story' ? "fav-title activefav" : "fav-title"} onClick={() => setFavShow('story')}><span className="p-2">Stories</span></span>

                <span className={favshow === 'article' ? "fav-title activefav" : "fav-title"} onClick={() => setFavShow('article')}><span className="p-2">Articles</span></span>
            </div>

            {favshow === 'story' && <SpecifiFavoritesStory userBookMark={userBookMark} />}

            {favshow === 'article' && <SpecifiFavoritesArticle userBookMarkArticle={userBookMarkArticle} />}

            {loading ? <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }}><CircularProgress color="#fbc02d" /></h4> : <h4 className="text-warning text-center mt-5" style={{ cursor: 'pointer' }} onClick={fetchFunc}>Load More</h4>}
        </div>

    );
};

export default SpecificUserFavorites;