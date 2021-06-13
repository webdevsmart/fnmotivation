import React from 'react';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SubscribeModal from './SubscribeModal';

const Subscribe = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <div>
            <section className="stay-connected-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="stay-connected-inner">
                                <h2>Stay connected <br></br>
                                    Have stories sent to your inbox</h2>
                                <a href="#CategoriesModal" data-toggle="modal" onClick={toggle}>Edit Categories</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SubscribeModal modal={modal} toggle={toggle} />

        </div>
    );
};

export default Subscribe;