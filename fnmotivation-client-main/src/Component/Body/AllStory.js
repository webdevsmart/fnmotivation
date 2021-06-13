import React from 'react';
import { ReportStoryProvider } from '../Admin/AdminReports/AdminStoryContext/AdminStoryContext';
import { StoryInfoProvider } from '../contexts/Story/StoryContext';
import SideArticle from '../Story/SideArticle';
import StoryDetails from '../Story/StoryDetails';


const AllStory = ({ getNotifications }) => {
    return (
        <StoryInfoProvider>
            <section className="article-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-lg-8 col-md-12">
                            <ReportStoryProvider>
                                <StoryDetails getNotifications={getNotifications} />
                            </ReportStoryProvider>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-12">
                            <SideArticle />
                        </div>
                    </div>
                </div>
            </section>
        </StoryInfoProvider>
    );
};

export default AllStory;