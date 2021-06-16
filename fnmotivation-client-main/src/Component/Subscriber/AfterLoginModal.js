/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'reactstrap';
import communityData from '../DB/DBCommunity';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreloaderOne from '../Preloader/PreloaderOne';
import { set } from 'react-ga';


const BeforeLoginModal = ({ modal, toggle }) => {



    const userID = JSON.parse(localStorage.getItem('userID'))

    const getParticularUserData = useCallback(() => {
        fetch('http://68.183.178.196/api//getParticularUser?id=' + userID, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                if (data.length !== 0) {
                    const news = data[0].subscribe_newsletter
                    if (news === 0) {
                        toggle()
                    }
                }
            })
    }, [userID])

    useEffect(() => {
        getParticularUserData()
    }, [getParticularUserData])

    const notifySubscribed = () => {
        toggle()
        toast.warning('Subscribed', {
            position: toast.POSITION.TOP_LEFT,

        })

    }
    const [preloaderVisibale, setPreloaderVisible] = useState(true)
    const [alreadySubscribe, setAlreadySubscribe] = useState([])
    const getAlreadySubscribe = useCallback(() => {
        fetch('http://68.183.178.196/api//alreadySubscribe?id=' + userID, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setAlreadySubscribe(data)
                setSelectedCommunity(data)
                const subID = data.map(id => id.CommunityId)
                var filteredCategory = allCommunity.filter(({ id }) => subID.indexOf(id) < 0);
                setAllCommunity(filteredCategory)

                setPreloaderVisible(false)
            })
    }, [])

    useEffect(() => {
        getAlreadySubscribe()
    }, [getAlreadySubscribe])

    const token = localStorage.getItem('token')
    const [allCommunity, setAllCommunity] = useState(communityData)
    const [selectedCommunity, setSelectedCommunity] = useState([])


    const sendSubscribe = (id) => {
        fetch('http://68.183.178.196/api//subscribe', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            },
            body: JSON.stringify({
                userID: userID,
                communityID: id
            })
        })
            .then(res => res.json())
            .then(data => {

                if (data.affectedRows > 0) {
                    getAlreadySubscribe()
                }
            })
    }
    const [type, setType] = useState(false)
    const [infoAudience, setInfoAudience] = useState(null)
    const [audience, setAudience] = useState(null)
    const showTypeDetails = (e) => {
        setInfoAudience(e.target.value)
        if (e.target.value === 'Champion') {
            setAudience('Anyone who is currently facing challenges with their physical health, emotional health and mental wellness')
        } else if (e.target.value === 'Companies and Businesses') {
            setAudience('Service Providers that extend services to support the Champions')
        } else if (e.target.value === 'Winner') {
            setAudience('Anyone who has faced challenges in their life regarding their physical health, emotional health and mental wellness')
        } else if (e.target.value === 'Informed One') {
            setAudience("Inquisitive people who'd like to be aware and well-informed in this area, such as, students and professionals")
        } else if (e.target.value === 'Supporter / Buddy') {
            setAudience('People who either have, or are supporting the Champions. They may be family, friends or colleagues of the Champion')

        }
    }

    const postType = () => {
        fetch(`http://68.183.178.196/api//userType/${userID}/${infoAudience}`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                authorization: token
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(data => {
                setType(true)
            })

    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <div className="categories-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            {type &&
                                <div className="modal-body">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" onClick={toggle}><img src={require(`../../images/closs-icon.svg`).default} alt="close" /></span>
                                    </button>

                                    {selectedCommunity.length !== 0 &&
                                        <>
                                            <h3>You are subscribed to the following categories:</h3>
                                            {preloaderVisibale ? <PreloaderOne className="p-5" />
                                                :
                                                <div className="row">
                                                    {selectedCommunity.map(info =>
                                                        <div key={info.id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                                                            <div style={{ cursor: 'pointer' }} className="related-articles-box">
                                                                <div className="image-holder">
                                                                    <img onClick={() => sendSubscribe(info.id)} src={`http://68.183.178.196/api//${info.community_title}.png`} alt="community" />
                                                                    <span className='active'><img src={require(`../../images/check-icon.svg`).default} alt="tick" className="img-fluid" /></span>
                                                                </div>
                                                            </div>
                                                        </div>)}
                                                </div>}
                                        </>}

                                    {allCommunity.length !== 0 &&
                                        <>
                                            <h3>Select Categories to Subscribe</h3>
                                            <p>Choose the topics that you are most interested in</p>
                                            <div className="row">
                                                {allCommunity.map(info =>
                                                    <div key={info.id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                                                        <div style={{ cursor: 'pointer' }} className="related-articles-box">
                                                            <div className="image-holder">
                                                                <img onClick={() => sendSubscribe(info.id)} src={`http://68.183.178.196/api//${info.community_title}.png`} alt="community" />
                                                                <span><img src={require(`../../images/check-icon.svg`)} alt="tick" className="img-fluid" /></span>
                                                            </div>
                                                        </div>
                                                    </div>)}
                                            </div>
                                        </>}
                                    <a onClick={notifySubscribed} className="subscribe-btn">Edit Categories </a>

                                </div>}

                            {!type &&
                                <div className="modal-body">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" onClick={toggle}><img src={require(`../../images/closs-icon.svg`).default} alt="close" /></span>
                                    </button>

                                    <div className="form-group">
                                        <h1 className="text-center">Select Your Type</h1>
                                        {audience ? <p>*{audience}</p>
                                            : <p>Select type which best describes you</p>}
                                        <div className="select-userType">
                                            <label className="radioUser">Champion
                                                        <input type="radio" name="audience" value="Champion" onChange={showTypeDetails} />
                                                <span className="checkround"></span>
                                            </label><br></br>
                                            <label className="radioUser">Companies and Businesses
                                                        <input type="radio" name="audience" value="Companies and Businesses" onChange={showTypeDetails} />
                                                <span className="checkround"></span>
                                            </label><br></br>
                                            <label className="radioUser">Winner
                                                        <input type="radio" name="audience" value="Winner" onChange={showTypeDetails}  />
                                                <span className="checkround"></span>
                                            </label><br></br>
                                            <label className="radioUser">Informed One
                                                        <input type="radio" name="audience" value="Informed One" onChange={showTypeDetails} />
                                                <span className="checkround"></span>
                                            </label><br></br>
                                            <label className="radioUser">Supporter / Buddy
                                                        <input type="radio" name="audience" value="Supporter / Buddy" onChange={showTypeDetails} />
                                                <span className="checkround"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <a onClick={postType} className="subscribe-btn pl-4 pr-4">Save</a>


                                </div>}

                        </div>
                    </div>
                </div>
            </Modal>
        </div >
    );
};

export default BeforeLoginModal;