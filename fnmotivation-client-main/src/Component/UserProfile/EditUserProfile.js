/* eslint-disable no-unused-vars */
import { CircularProgress } from '@material-ui/core';
import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../Preloader/Preloader';
import imageCompression from 'browser-image-compression';

toast.configure()

const EditUserProfile = () => {
    const notifyProfile = () => {
        toast.warning('Profile Updated', {
            position: toast.POSITION.TOP_LEFT,

        })
    }
    const [preloaderVisibale, setPreloaderVisible] = useState(true)
    const token = localStorage.getItem('token')
    const userID = JSON.parse(localStorage.getItem('userID'))
    // User Data
    const [userData, setUserData] = useState([])
    const getParticularUserData = useCallback(() => {
        fetch('/getParticularUser?id=' + userID)
            .then(res => res.json())
            .then(data => {
                setUserData(data)

                setPreloaderVisible(false)
            })
    }, [userID])

    useEffect(() => {
        getParticularUserData()
    }, [getParticularUserData])

    //User Email & Username
    const [userName, setUserName] = useState([])
    useEffect(() => {
        fetch('/getAllUser')
            .then(res => res.json())
            .then(data => {
                setUserName(data)
            })
    }, [])

    const [error, setError] = useState({
        sendError: false,
        userError: false,
        userEmailError: false

    })
    const [imageError, setImageError] = useState(false)

    const AlluserName = userName.map(user => user.username)
    const AlluserEmail = userName.map(user => user.email)

    const handleChange = (e) => {
        if (e.target.name === 'username') {
            const userTest = AlluserName.find(user => user === e.target.value.toLowerCase())
            if (userTest === e.target.value.toLowerCase()) {
                setError({ userError: true })
            } else if (userTest !== e.target.value.toLowerCase()) {
                setError({ userError: false })
            }
        }
        if (e.target.name === 'email') {
            const userEmailTest = AlluserEmail.find(user => user === e.target.value.toLowerCase())
            if (userEmailTest === e.target.value.toLowerCase()) {
                setError({ userEmailError: true })
            } else if (userEmailTest !== e.target.value.toLowerCase()) {
                setError({ userEmailError: false })
            }
        }
    }

    const { register, handleSubmit, errors } = useForm();

    //Image
    const [image, setImage] = useState({
        viewImage: ''
    })
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage({ viewImage: reader.result })
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const [validation, setValidation] = useState({
        email: true
    })
    const [load, setLoad] = useState(false)
    let { username } = useParams()
    const onSubmit = async (data) => {
        setLoad(true)
        function change(text) {
            return text.replace("'", "///")
        }
        const about = change(data.about)
        function n(name) {
            return name.replace("'", " ")
        }
        const name = n(data.name)


        if (data.email) {
            validation.email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email)
        }


        const formData = new FormData()
        if (data.email && validation.email && !error.username && !error.userEmailError) {
            const newEmail = data.email
            if (!data.file[0]) {
                formData.append('userID', userID)
                formData.append('name', name)
                formData.append('username', data.username.toLowerCase())
                formData.append('email', data.email.toLowerCase())
                formData.append('about', about)
                fetch('/editUserDataWithOutImage', {
                    method: 'POST',
                    headers: {
                        authorization: token
                    },
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.affectedRows > 0) {
                            fetch('/getParticularUser?id=' + userID)
                                .then(res => res.json())
                                .then(data => {

                                    if (data[0].username) {
                                        localStorage.setItem('username', JSON.stringify(data[0].username))
                                        notifyProfile()
                                        setLoad(false)
                                        if (typeof window !== 'undefined') {
                                            // it's safe to use window now
                                            window.location = "/user/" + username

                                        }
                                    }
                                })
                        }
                        if (data.msg) {
                            setError(data.msg)
                            setLoad(false)
                        }
                    })
            } else if (!data.check && data.file.length === 0) {
                setImageError(true)
                setLoad(false)
            }

            else if (data.file.length && data.file[0].type.split('/')[0] === 'image') {
                const options = {
                    maxSizeMB: 0.5,
                    useWebWorker: true
                }
                const compressedFile = data.file[0] && await imageCompression(data.file[0], options);
                console.log(compressedFile)

                formData.append('userID', userID)
                formData.append('file', compressedFile)
                formData.append('name', name)
                formData.append('username', data.username.toLowerCase())
                formData.append('email', data.email.toLowerCase())
                formData.append('about', about)
                fetch('/editUserData', {
                    method: 'POST',
                    headers: {
                        authorization: token
                    },
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.msg) {
                            setError({ sendError: true })
                            setLoad(false)
                        }
                        else if (data.affectedRows > 0) {
                            fetch('/getParticularUser?id=' + userID)
                                .then(res => res.json())
                                .then(data => {

                                    if (data[0].username) {
                                        localStorage.setItem('username', JSON.stringify(data[0].username))
                                        localStorage.setItem('avatar', JSON.stringify(data[0].avatar))
                                        notifyProfile()
                                        setLoad(false)
                                        if (typeof window !== 'undefined') {
                                            // it's safe to use window now
                                            window.location = "/user/" + username

                                        }
                                    }
                                })
                        }
                    })
            }


        }
    }
    return (
        <div className="wrapper">
            { preloaderVisibale ? <Preloader />
                :
                <section className="profile-sec profile-edit">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 col-md-12">
                                <div className="section-title d-md-flex align-items-center">
                                    <h3 className="mr-5">Edit your profile</h3>
                                    <div className="btn-group mt-md-0 mt-4">
                                        <a className="delete-btn ml-md-4 mr-4" href="/">Delete Profile</a>
                                        <a className="reset-btn ml-2" href="/verifyEmail">Reset Password</a>
                                    </div>
                                </div>
                            </div>
                            {userData.map(user =>
                                <div key={user.user_id} className="offset-lg-1 col-lg-6 col-md-8 col-xl-5" >
                                    <form className="profile-edit-form" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group change-avatar mt-5">
                                            <label className="mb-2">Change profile picture</label>
                                            {!image.viewImage && <img src={`/${user.avatar}`} alt="user" className="img-fluid rounded-image cropped" />}
                                            {image.viewImage && <>
                                                <img src={image.viewImage} alt="user" />
                                            </>}
                                            <label className="upload-picture">Upload picture
                                    <input name="file" onChange={imageHandler} type="file" ref={register} />
                                            </label>
                                        </div>
                                        <div className="form-group mt-5 mb-4">
                                            <label >Full Name</label>
                                            <input name="name" type="text" defaultValue={user.fullname} id="full-name" className="form-control" ref={register({ required: true })} />
                                            {errors.name && <span>This field is required</span>}

                                        </div>
                                        <div className="form-group mb-4">
                                            <label>Email</label>
                                            <input name="email" defaultValue={user.email} onChange={handleChange} type="text" id="email" className="form-control" ref={register({ required: true })} />
                                            {errors.email && <span>This field is required</span>}
                                            {error.userEmailError && <p className="password-must">Email Adress Exist</p>}
                                            {validation.email === false && <p className="password-must">Please give a valid Email</p>}
                                        </div>
                                        <div className="form-group mb-4">
                                            <label>Username</label>
                                            <input name="username" defaultValue={user.username} onChange={handleChange} type="text" id="username" className="form-control" ref={register({ required: true })} />
                                            {errors.username && <span>This field is required</span>}
                                            {error.userError && <p className="user-text">Username Exist. Try New One</p>}
                                        </div>
                                        <div className="form-group mb-4">
                                            <label >About Me</label>
                                            <textarea name="about" defaultValue={user.about && user.about.replace(/\/+/g, "'")} className="form-control" id="about-me" ref={register({ required: true, maxLength: 500 })} />
                                            {errors.about?.type === 'required' && <span>This field is required</span>}
                                            {errors.about?.type === 'maxLength' && <span>Text Limit 500</span>}
                                        </div>
                                        <div className="form-group mb-5">
                                            <label className="check">Use avatar
                                        <input checked name="check" type="checkbox" ref={register} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        {error.sendError && <span>Image is Too big. Upload less than 500 kb </span>}
                                        {imageError && <span>Please Upload a Image</span>}
                                        {load ?
                                            <div className="alert alert-warning m-3 text-center" role="alert">
                                                <CircularProgress className="mt-2" /><br></br>...Updating...
                                         </div>
                                            :
                                            <div className="">
                                                <button className="theme-btn mt-5" type="submit">Update Profile</button>
                                            </div>}
                                    </form>
                                </div>)}
                        </div>
                    </div>
                </section>}
        </div >
    );
};

export default EditUserProfile;