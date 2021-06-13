import React from 'react';
import { Modal } from 'reactstrap';
import communityData from '../DB/DBCommunity';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../App';


const SubscribeModal = ({ modal, toggle }) => {

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>

                <div className="categories-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" onClick={toggle}><img src={require(`../../images/closs-icon.svg`).default} alt="close" /></span>
                                </button>
                                <h3>Select Categories to Subscribe</h3>
                                <p>Choose the topics that you are most interested in</p>

                                <div className="row">
                                    {communityData.map(info =>
                                        <div key={info.id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div style={{ cursor: 'pointer' }} className="related-articles-box">
                                                <div className="image-holder">
                                                    <Link to="/login" onClick={scrollToTop}><img src={`http://localhost:5000/${info.community_title}.png`} alt="community" /></Link>
                                                    <span><img src={require(`../../images/check-icon.svg`)} alt="tick" className="img-fluid" /></span>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                                <Link to="/login" onClick={scrollToTop} className="subscribe-btn">SUBSCRIBE </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default SubscribeModal;