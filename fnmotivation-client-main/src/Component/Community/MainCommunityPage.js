import React, {useState} from 'react';
import { useParams } from 'react-router';
import CommunityDetailsLeft from './CommunityDetailsLeft';
import ShortCommunityStory from './ShortCommunityStory';

const MainCommunityPage = () => {
   
    const [fetchData, setfetchData] = useState(0)
    const [artfetchData, setArtfetchData] = useState(0)
    const fetchFunc = () => {
        setfetchData(fetchData + 12)
        setArtfetchData(artfetchData + 4)
    }
    let {communityID} = useParams()
    return (
        <div>
            <section className="article-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-lg-8 col-md-12">
                            <CommunityDetailsLeft fetchData={fetchData} fetchFunc={fetchFunc} />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-12">
                            <ShortCommunityStory artfetchData={artfetchData} community={communityID}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainCommunityPage;