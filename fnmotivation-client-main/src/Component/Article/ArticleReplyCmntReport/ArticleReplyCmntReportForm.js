import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const ArticleReplyCmntReportForm = (props) => {
    console.log(props)
    const { register, handleSubmit, errors } = useForm();

    const [errMsg, setErrMsg] = useState('')
    const [msg, setMsg] = useState(false)
    const [loader, setLoader] = useState(false)

    const token = localStorage.getItem('token')
    const userID = JSON.parse(localStorage.getItem('userID'))

    const onSubmit = async (data) => {
        const info = { from_user_id: userID, post_id: props.reply.postID, reported_post_comment_reply_id: props.reply.replyID, report_msg: data.report_msg }
        setLoader(true)
        await fetch('/articleReplyCmntReport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                if (data.msg) {
                    setErrMsg(data.msg)
                    setLoader(false)
                } else if (data.affectedRows > 0) {
                    setErrMsg('')
                    setMsg(true)
                    setLoader(false)
                }
            })
    }
    return (
        <div className="categories-modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" onClick={props.toggle}><img src={require(`../../../images/closs-icon.svg`).default} alt="close" /></span>
                        </button>
                        {!msg && <h4 className="text-center">You are reporting for:</h4>}
                        {!msg && <p>{props.reply.pc_reply_text}</p>}

                        {errMsg &&
                            <div className="alert alert-danger m-3 text-center" role="alert">
                                {errMsg}
                            </div>}

                        {!msg && <div className="login-inner form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label>Reason</label>
                                    <textarea type="text" rows="5" name="report_msg" className="form-control" ref={register({ required: true, maxLength: 250 })} />
                                    {errors.report_msg?.type === "required" && <p className="password-must">*Reason is required</p>}
                                    {errors.report_msg?.type && <p className="password-must">*Max 250 characters</p>}
                                </div>

                                {loader ? <div className="form-group">
                                    <input disabled className="btn btn-default" value="Submitting" />
                                </div>
                                    : <div className="form-group">
                                        < input type="submit" className="btn btn-default" value="Submit" />
                                    </div>}

                            </form>
                        </div>}
                        {msg && <> <p><b>Thank You</b></p><p> For your feedback, We will review this reply.</p> </>}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleReplyCmntReportForm;