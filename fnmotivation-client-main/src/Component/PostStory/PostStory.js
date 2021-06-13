import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import communityData from '../DB/DBCommunity';
import OgData from '../OgData';


const PostStory = () => {
    const [preloaderVisibale, setPreloaderVisibale] = useState(false)
    const token = localStorage.getItem('token')
    const userID = JSON.parse(localStorage.getItem('userID'))
    const { register, handleSubmit, errors } = useForm();
    const [category, setCategory] = useState([])
    const [tags, setTags] = useState([])


    const [image, setImage] = useState({
        viewImage: ''
    })
    const [error, setError] = useState({
        summary: false,
    })
    const handleChange = (e) => {
        if (e.target.name === 'postSummary') {
            if (e.target.value.length > 25) {
                setError({ summary: true })
            }
            if (e.target.value.length <= 25) {
                setError({ summary: false })
            }
        }
    }
    const [file, setFile] = useState(null)

    const filterTag = (removeIndex) => {
        const existingTags = tags.filter((_, index) => index !== removeIndex)
        setTags(existingTags)
    }
    const addTags = (e) => {
        if (e.code === "Space") {
            setTags([...tags, e.target.value.trim()])
            e.target.value = ''
        }
        if (e.code === "Enter") {
            setTags([...tags, e.target.value.trim()])
            e.target.value = ''
        }
    }

    const checkKeyDown = (e) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    const [body, setBody] = useState([])
    const refineBody = (e) => {
        setBody([e.target.value])
        if (e.code === "Enter") {
            setBody([body, ...`/n`])
        }
    }

    const handleCategory = (e) => {
        const data = {}
        data[e.target.name] = e.target.value
        setCategory(data)
    }

    const imageHandler = (e) => {
        const newFile = e.target.files[0];
        setFile(e.target.files[0])
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage({ viewImage: reader.result })
            }
        }
        if (newFile) {
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const removeImage = () => {
        setFile(null)
        setImage({ viewImage: '' })
    }

    const [reultError, setReultError] = useState([])

    const onSubmit = async (data) => {
        setPreloaderVisibale(true)
        const formData = new FormData()
        formData.append('storyTitle', data.postTitle)
        formData.append('category', category.category)
        formData.append('storySummary', data.postSummary)
        formData.append('storyBody', body)
        formData.append('storyTags', tags)
        formData.append('userID', userID)

        if (data.file[0]) {
            data.file[0] && formData.append('file', data.file[0])
            fetch('http://68.183.178.196/postStory', {
                method: 'POST',
                headers: {
                    authorization: token
                },
                body: formData
            })
                .then(res => res.json())
                .then(result => {
                    if (result.affectedRows > 0) {
                        if (typeof window !== 'undefined') {
                            // it's safe to use window now
                            window.location = '/'
                          }
                        setPreloaderVisibale(true)
                    }
                    if (result.msg) {
                        setReultError(result.msg)
                        setPreloaderVisibale(true)
                    }
                })
        }


        if (!data.file[0]) {
            const imageData = communityData.find(img => img.id == category.category)
            const url = `http://68.183.178.196/${imageData.community_title}.png`
            fetch(url)
                .then(r => r.blob())
                .then(blobFile => {
                    const newFile = new File([blobFile], "imageData", { type: "image/png" })
                    formData.append('file', newFile)
                    fetch('http://68.183.178.196/postStory', {
                        method: 'POST',
                        headers: {
                            authorization: token
                        },
                        body: formData
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.affectedRows > 0) {
                                if (typeof window !== 'undefined') {
                                    // it's safe to use window now
                                    window.location = '/'
                                  }
                                setPreloaderVisibale(true)
                            }
                            if (result.msg) {
                                setReultError(result.msg)
                                setPreloaderVisibale(true)
                            }
                        })
                })


        }
    }

    return (
        <section className="post-story-sec">
            <div className="container-fluid">
                <OgData url={'http://fnmotivation.com/post-story'} title={'Post Story - FNMotivation'} description={'This new social network is a unique platform that is centered around health and wellness. This platform will provide a central location for people to like-minded people to connect.'} image={'http://68.183.178.196/fnmotivation-logo.png'} />
                <div className="row">
                    <div className="col-12">
                        <div className="post-story-inner">
                            <h3>Post your story here</h3>

                            <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input type="text" name="postTitle" className="form-control" placeholder="" ref={register({ required: true })} />
                                            {errors.postTitle && <span>This field is required</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Community Categories</label>
                                            <select className="form-control" name="category" onChange={handleCategory}>
                                                <option>Select Community</option>
                                                <option value="3">Eating Disorder</option>
                                                <option value="4">Weight Issues</option>
                                                <option value="5">Heart Diseases</option>
                                                <option value="6">Anxiety</option>
                                                <option value="7">Depression</option>
                                                <option value="1">Drug Addiction</option>
                                                <option value="8">Insecurity</option>
                                                <option value="9">Mental Health</option>
                                                <option value="10">Stress</option>
                                                <option value="2" >Alchohol Addiction</option>
                                                <option value="11" >Smoking</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Short Summary of Story</label>
                                            <input type="text" name="postSummary" className="form-control" onChange={handleChange} placeholder="" ref={register} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Thumbnail for Story</label>
                                    <label className="upload-file"> Upload
                                        <input type="file" name="file" onChange={imageHandler} ref={register} />
                                    </label>
                                    {!image.viewImage && <span>No file selected</span>}
                                    {image.viewImage && <span style={{ cursor: 'pointer' }} onClick={removeImage}><b>X</b> Remove Image</span>}
                                    {image.viewImage && <img src={image.viewImage} alt="imageUplaod" className="w-25 mt-2" />}
                                </div>
                                <div className="form-group">
                                    <label>Body</label>
                                    <textarea name="postBody" onKeyUp={refineBody} className="form-control" placeholder="" ref={register({ required: true })} />
                                    {errors.postBody && <span>This field is required</span>}
                                </div>
                                <div className="form-group">
                                    <label>Tags</label>
                                    <div className="bs-example">
                                        <div className="bootstrap-tagsinput">
                                            {tags.map((tags, index) =>
                                                <span key={index} className="tag label label-info">{tags}<span style={{ cursor: 'pointer' }} data-role="remove"><b onClick={() => filterTag(index)}>X</b></span></span>)}
                                        </div>
                                        <input type="text" placeholder="Enter Tag" name="tags" className="form-control" onKeyUp={addTags} data-role="tagsinput" />
                                    </div>
                                    {reultError && <h2 className="mt-5">{reultError}</h2>}
                                </div>
                                {preloaderVisibale ?
                                    <div className="alert alert-warning m-3 text-center" role="alert">
                                        <CircularProgress className="mt-2" /><br></br>...Posting...
                                        </div>
                                    :
                                    <div className="form-group">
                                        <button className="post-btn" type="submit">Post Story</button>
                                    </div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostStory;