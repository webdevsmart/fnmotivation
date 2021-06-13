import React from 'react';
import OgData from '../OgData';
import SearchResultStory from './SearchResultStory';

const SearchStory = ({ search, handleChange }) => {
    return (
        <section className="article-sec">
            <OgData url={'http://fnmotivation.com/'} title={'Search - FNMotivation'} description={'This new social network is a unique platform that is centered around health and wellness. This platform will provide a central location for people to like-minded people to connect.'} image={'/fnmotivation-logo.png'} />
            <div className="container-fluid">
                <SearchResultStory search={search} handleChange={handleChange} />
            </div>
        </section >
    );
};

export default SearchStory;