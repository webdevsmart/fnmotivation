import React from 'react';
import { Link } from 'react-router-dom';

const UnKnownPage = () => {
    return (
        <div className="p-5 text-center">
            <h1 style={{fontSize: '5rem'}}  className='text-warning'>404</h1>
            <h3  style={{fontSize: '2rem'}} className='text-warning'>The page you are looking for is not there</h3>
            <Link to="/"><button className="un-btn m-4"><h4><b>Home</b></h4></button></Link>
        </div>
    );
};

export default UnKnownPage;