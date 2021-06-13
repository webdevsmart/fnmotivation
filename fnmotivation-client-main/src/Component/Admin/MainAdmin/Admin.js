import React from 'react';
import { Link, Route } from 'react-router-dom';
import {
    Switch
} from "react-router-dom";
import AdminArticles from '../AdminArticles/AdminArticles';
import AdminStories from '../AdminStories.js/AdminStories';
import AdminUsers from '../AdminUsers/AdminUsers';
import './Admin.css';
import { FaUserFriends, FaBell, FaTextWidth, FaHighlighter, FaSignOutAlt } from "react-icons/fa";
import AdminReports from '../AdminReports/AdminReports';
import AdminCommentStories from '../AdminCommentStory.js/AdminCommentStories';
import AdminCommentArticles from '../AdminArticleComments/AdminCommentArticles'
import AdminStoryReport from '../AdminReports/AdminStoryReport/AdminStoryReport';
import AdminArticleReport from '../AdminReports/AdminArticleReport/AdminArticleReport';
import AdminStoryCmntReport from '../AdminReports/AdminStoryCmntReport/AdminStoryCmntReport';
import AdminArticleCmntReport from '../AdminReports/AdminArticleCmntReport/AdminArticleCmntReport';
import AdminArticleCmntReplyReport from '../AdminReports/AdminArticleCmntReplyReport/AdminArticleCmntReplyReport';
import AdminStoryCmntReplyReport from '../AdminReports/AdminStoryCmntReplyReport/AdminStoryCmntReplyReport';
import { ReportStoryProvider } from '../AdminReports/AdminStoryContext/AdminStoryContext';

const Admin = () => {

    const logOutAdmin = () => {
        localStorage.removeItem('admiNToken')
        window.location = "/admin-login"
    }
    return (
        <div className="admin">
            <div className="sidenav">
                <a href="/"><img src={require('../../../images/logoPng.png').default} alt="logo" className="p-2" /></a>
                <a href="/admin"><FaUserFriends color="#ffc107" /> <span className="ml-2">Users</span></a>
                <a href="/admin/all-stories"><FaTextWidth color="#ffc107" /> <span className="ml-2">Stories</span></a>
                <a href="/admin/all-articles"><FaHighlighter color="#ffc107" /> <span className="ml-2">Articles</span></a>
                <a href="/admin/reports"><FaBell color="#ffc107" /> <span className="ml-2">Reports</span></a>
                <Link to="#" onClick={logOutAdmin}><FaSignOutAlt color="#ffc107" /> <span className="ml-2">Sign Out</span></Link>
            </div>
            <div className="main">
                <ReportStoryProvider>
                    <Switch>
                        <Route exact path="/admin">
                            <AdminUsers />
                        </Route>
                        <Route path="/admin/all-stories">
                            <AdminStories />
                        </Route>
                        <Route path="/admin/stories/comment/:storyID/">
                            <AdminCommentStories />
                        </Route>
                        <Route path="/admin/articles/comment/:adminArticleID/">
                            <AdminCommentArticles />
                        </Route>
                        <Route path="/admin/all-articles">
                            <AdminArticles />
                        </Route>
                        <Route exact path="/admin/reports">
                            <AdminReports />
                        </Route>
                        <Route exact path="/admin/reports/story">
                            <AdminStoryReport />
                        </Route>
                        <Route path="/admin/reports/story/comment-reply">
                            <AdminStoryCmntReplyReport />
                        </Route>
                        <Route path="/admin/reports/story/comment">
                            <AdminStoryCmntReport />
                        </Route>
                        <Route exact path="/admin/reports/article">
                            <AdminArticleReport />
                        </Route>
                        <Route path="/admin/reports/article/comment">
                            <AdminArticleCmntReport />
                        </Route>
                        <Route path="/admin/reports/article/comment-reply">
                            <AdminArticleCmntReplyReport />
                        </Route>
                    </Switch>
                </ReportStoryProvider>
            </div>
        </div>
    );
};

export default Admin;