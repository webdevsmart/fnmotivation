/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, useCallback } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './Component/Navbar/Navbar';
import Banner from './Component/Banner/Banner';
import Subscribe from './Component/Subscriber/Subscribe';
import Footer from './Component/Footer/Footer';
import ArticleBody from './Component/Body/ArticleBody';
import Login from './Component/Login/Login';
import PostArticle from './Component/PostArticle/PostArticle';
import Community from './Component/Community/Community';
import UserProfile from './Component/UserProfile/UserProfile';
import Register from './Component/Login/Register';
import AllStory from './Component/Body/AllStory';
import AllArticle from './Component/Body/AllArticle';
import communityData from './Component/DB/DBCommunity';
import MainCommunityPage from './Component/Community/MainCommunityPage';
import EditStory from './Component/PostStory/EditStory';
import EditUserProfile from './Component/UserProfile/EditUserProfile';
import UserNotificationSettings from './Component/UserProfile/UserNotificationSettings/UserNotificationSettings';
import SearchStory from './Component/Search/SearchStory';
import TermsModal from './Component/Login/TermsModal';
import PrivacyModal from './Component/Login/PrivacyModal';
import About from './Component/About/About';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import { ParicualrUserDataProvider } from './Component/contexts/User/userContext'
import UnKnownPage from './Component/UnKnownPage';
import MainArticlePage from './Component/Article/MainArticlePage';
import Contact from './Component/Contact.js/Contact';
import ResetPassword from './Component/Login/ResetPassword';
import VerifyEmail from './Component/Login/VerifyEmail';
import UserVerify from './Component/Login/UserVerify';
import PopUpLogin from './Component/Login/PopUpLogin';
import ReactGA from 'react-ga';
import AfterLoginSubscribe from './Component/Subscriber/AfterLoginSubscribe';
import TagStoryPage from './Component/Story/TagStoryPage';
import TestBody from './Component/TestBody';
import Admin from './Component/Admin/MainAdmin/Admin';
import AdminPrivate from './Component/Admin/AdminPrivate';
import AdminLogin from './Component/Admin/AdminLogin/AdminLogin';
import SpecificUserPage from './Component/SpecificUser/SpecificUserPage';



export const useScrollToBottom = (ref) => {
  const scrollToBottom = () => {
    ref.current.style.scrollBehavior = 'smooth';
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  return {
    scrollToBottom,
  }
}

export const Communities = createContext()
export const NotificationSettingsUI = createContext()

export const scrollToTop = () => {
  window.scrollTo(0, 0)
}

function App() {

  // API
  const userID = JSON.parse(localStorage.getItem('userID'))
  const token = localStorage.getItem('token')
  const [notifications, setNotifications] = useState([])
  const [notiCount, setnotiCount] = useState(null)
  const [preloaderVisibale, setPreloaderVisible] = useState(true)

  const [fetchData, setfetchData] = useState(0)
  const fetchFunc = () => {
    setfetchData(fetchData + 12)
  }
  const [loader, setloader] = useState(false)
  const IDdata = `${userID},${fetchData}`
  const getNotifications = useCallback(() => {
    setloader(true)
    fetch('http://localhost:5000/getNotifications?id=' + IDdata, {
      method: 'GET',
      headers: {
        authorization: token
      },
    })
      .then(res => res.json())
      .then(data => {
        setNotifications([...notifications, ...data.doc])
        setnotiCount(data.count[0].notiCount)
        setPreloaderVisible(false)
        setloader(false)
      })

  }, [userID, fetchData, IDdata, token]);

  useEffect(() => {
    getNotifications()
  }, [getNotifications])

  const fc = localStorage.getItem('fc')

  const [category, setCategory] = useState([])
  useEffect(() => {
    setCategory(communityData)
  }, [])


  const [notificationUI, setNotificationUI] = useState({
    story_likes: JSON.parse(localStorage.getItem('story_likes')),
    story_comments: JSON.parse(localStorage.getItem('story_comments')),
    success_posts: JSON.parse(localStorage.getItem('success_posts')),
    article_likes: JSON.parse(localStorage.getItem('article_likes')),
    article_comments: JSON.parse(localStorage.getItem('article_comments')),
    successful_articles: JSON.parse(localStorage.getItem('successful_articles')),
    followers: JSON.parse(localStorage.getItem('followers')),
    email_story_likes: JSON.parse(localStorage.getItem('email_story_likes')),
    email_story_comments: JSON.parse(localStorage.getItem('email_story_comments')),
    email_successful_posts: JSON.parse(localStorage.getItem('email_successful_posts')),
    email_article_likes: JSON.parse(localStorage.getItem('email_article_likes')),
    email_article_comments: JSON.parse(localStorage.getItem('email_article_comments')),
    email_article_successfull: JSON.parse(localStorage.getItem('email_article_successfull')),
    email_follower: JSON.parse(localStorage.getItem('email_follower')),
    email_subscription: JSON.parse(localStorage.getItem('email_subscription')),
    email_following_alerts: JSON.parse(localStorage.getItem('email_following_alerts')),
  })

  const [search, setSearch] = useState([])


  const handleChange = (e) => {
    function change(text) {
      return text.replace("'", " ")
    }
    const reply = change(e.target.value)
    setSearch(reply)
    // History.push('/search?q=' + search)

  }

  useEffect(() => {
    ReactGA.initialize('G-FW4D8DD832')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])


  return (
    <div>
      <ParicualrUserDataProvider>
        <Communities.Provider value={[category, setCategory]}>
          <NotificationSettingsUI.Provider value={[notificationUI, setNotificationUI]}>

            <Router >

              <Switch>
                <Route exact path="/">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  {fc ? '' : <PopUpLogin />}
                  {!userID && <Banner />}
                  <ArticleBody />
                  {fc ? <AfterLoginSubscribe /> : <Subscribe />}
                  <Footer />
                </Route>
                <Route path="/search">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  {fc ? '' : <PopUpLogin />}
                  <SearchStory search={search} handleChange={handleChange} />
                  <Footer />
                </Route>

                <Route path="/tags/:str">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  {fc ? '' : <PopUpLogin />}
                  <TagStoryPage />
                  <Footer />
                </Route>

                <Route path="/about">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <About />
                  <Footer />
                </Route>
                <Route path="/contact">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <Contact />
                  <Footer />
                </Route>
                <Route path="/login">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  {token ? <Redirect to="/" /> : <Login />}
                  <Footer />
                </Route>
                <Route path="/resetPassword">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <ResetPassword />
                  <Footer />
                </Route>
                <Route path="/verifyEmail">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <VerifyEmail />
                  <Footer />
                </Route>

                <Route path="/community/:communityID/:communityTitle">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  {fc ? '' : <PopUpLogin />}
                  <MainCommunityPage />
                  <Footer />
                </Route>

                {/* Admin */}


                <Route path="/admin-login">
                  <AdminLogin />
                </Route>

                <AdminPrivate path="/admin">
                  <Admin />
                </AdminPrivate>

                <Route path="/Register">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <Register />
                  <Footer />
                </Route>
                <Route path="/terms-and-conditions">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <TermsModal />
                  <Footer />
                </Route>
                <Route path="/privacy-policy">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <PrivacyModal />
                  <Footer />
                </Route>
                <PrivateRoute path="/post-story">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <TestBody />
                  <Footer />
                </PrivateRoute>
                <PrivateRoute path="/post/edit/:storyID">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <EditStory />
                </PrivateRoute>
                <Route path="/post/:id/:title">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  {fc ? '' : <PopUpLogin />}
                  <AllStory getNotifications={getNotifications} />
                  <Footer />
                </Route>
                <Route path="/articles">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  {fc ? '' : <PopUpLogin />}
                  <MainArticlePage />
                  <Footer />
                </Route>
                <Route path="/article/:articleID">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  {fc ? '' : <PopUpLogin />}
                  <AllArticle getNotifications={getNotifications} />
                  <Footer />
                </Route>
                <PrivateRoute path="/post-article">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <PostArticle />
                  <Footer />
                </PrivateRoute>
                <Route path="/community">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  {fc ? '' : <PopUpLogin />}
                  <Community />
                  <Footer />
                </Route>


                <PrivateRoute path="/edit/:username">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <EditUserProfile />
                  <Footer />
                </PrivateRoute>
                <PrivateRoute path="/user/:username">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <UserProfile />
                  <Footer />
                </PrivateRoute>
                <Route path="/:user/:name">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <SpecificUserPage getNotifications={getNotifications} />
                  <Footer />
                </Route>
                <Route path="/verifyUser">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <UserVerify />
                  <Footer />
                </Route>
                <PrivateRoute path="/notification-settings">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <UserNotificationSettings />
                  <Footer />
                </PrivateRoute>


                <Route path="*">
                  <Navbar notiCount={notiCount} getNotifications={getNotifications} handleChange={handleChange} notifications={notifications} preloaderVisibale={preloaderVisibale} fetchFunc={fetchFunc} loader={loader} search={search} />
                  <UnKnownPage />
                  <Footer />
                </Route>

              </Switch>
            </Router>

          </NotificationSettingsUI.Provider>
        </Communities.Provider>
      </ParicualrUserDataProvider>
    </div >

  );
}

export default App;
