import React, {useState} from 'react';
import AfterLoginModal from './AfterLoginModal'

const AfterLoginSubscribe = () => {

const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

    return (
        <div>
            <section className="stay-connected-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="stay-connected-inner">
                                <h2>Click below to view or edit the<br></br>
                                community categories that<br></br>
                                you are subscribed to:</h2>
                                <a href="#CategoriesModal" data-toggle="modal" onClick={toggle}>Edit Categories</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          
            <AfterLoginModal modal={modal} toggle={toggle}/>
        </div>
    );
};

export default AfterLoginSubscribe;