import React, { useState } from 'react';
import ArticlePage from './ArticlePage';

const MainArticlePage = () => {
    
    const [fetchData, setfetchData] = useState(0)
    const fetchFunc = () => {
        setfetchData(fetchData + 12)
    }
    

    return (
        <div>
            <section className="article-sec">
                <div className="container-fluid">
                    <ArticlePage  fetchData={fetchData} fetchFunc={fetchFunc} />
                </div>
            </section >
        </div >
    );
};

export default MainArticlePage;