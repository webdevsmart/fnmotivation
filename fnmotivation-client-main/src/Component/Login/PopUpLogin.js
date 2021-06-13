import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'reactstrap';

const PopUpLogin = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    setTimeout(() => {
        handleShow()
    }, 15000);
    
    return (
        <Modal isOpen={show}>
            <div class="login_register-modal">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><img src="images/closs-icon.svg" alt="" /></span>
                        </button>
                        <h3 class="mb-md-5 mb-4 mt-md-4">Please register or login to interact on the FNMotivation Community Platform</h3>
                        <div class="">
                            <Link class="subscribe-btn mb-4" to="/login">Login</Link>
                            <div class="or">
                                <span>OR</span>
                            </div>
                            <Link class="subscribe-btn" to="/register">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PopUpLogin;