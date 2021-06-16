/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Preloader from '../Preloader/Preloader';
import { CircularProgress } from '@material-ui/core';

toast.configure()

const EditStory = () => {
    const token = localStorage.getItem('token')
    let { storyID } = useParams();

    const [preload, setPreLoad] = useState(true)

    const [story, setStory] = useState([])
    const [tags, setTags] = useState([])
    const getParticularStory = useCallback(() => {

        fetch('http://68.183.178.196/api//getParticularStoryWithsUser?id=' + storyID)
            .then(res => res.json())
            .then(data => {
                setStory(data)

                const tag = (data.map(tag => tag.tags))
                for (var i = 0; i < tag.length; i++) {
                    var res = tag[i]
                    const finalTags = res.split(',')
                    setTags(finalTags)
                }
                setPreLoad(false)
            })

    }, [storyID])

    useEffect(() => {
        getParticularStory()
    }, [getParticularStory])


    const { register, handleSubmit, errors } = useForm();
    const [category, setCategory] = useState([])



    const [bodyTxt, setBodyTxt] = useState([])
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
        if (e.keyCode == 32) {
            setTags([...tags, e.target.value.trim()])
            e.target.value = ''
        }
        if (e.keyCode == 13) {
            setTags([...tags, e.target.value.trim()])
            e.target.value = ''
        }

    }

    const checkKeyDown = (e) => {
        if (e.keyCode === 13) e.preventDefault();
    };

    const handleCategory = (e) => {
        const data = {}
        data[e.target.name] = e.target.value
        setCategory(data)
    }

    const imageHandler = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile)
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage({ viewImage: reader.result })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const [reultError, setReultError] = useState([])

    const [load, setLoad] = useState(false)

    const onSubmit = async (data) => {
        setLoad(true)
        const community = story.map(community => community.community_id)
        const img = story.map(img => img.post_thumbnail)
        const storyID = story.map(id => id.story_id)
        const storyBody = story.map(story => story.body)
        const mainBody = await bodyTxt.length === 0 ? storyBody.toString() : bodyTxt

        function change(body) {
            return body.replace(/'/g, "///")
        }
        const title = change(data.postTitle)
        const summary = change(data.postSummary)
        const body = change(mainBody)
        const tag = change(tags.toString())

        // const formData = new FormData()

        // formData.append('storyTitle', data.postTitle)
        // formData.append('category', community.toString())
        // formData.append('storySummary', data.postSummary)
        // formData.append('storyBody', data.postBody)
        // !file && formData.append('imgName', img.toString())
        // file && formData.append('file', file)
        // formData.append('storyTags', tags.toString())
        // formData.append('storyID', storyID.toString())

        // console.log('title', data.postTitle, 'categ', community.toString(), 'summary', data.postSummary, 'body', bodyTxt.length === 0 ? storyBody.toString() : bodyTxt, 'file', !file ? img.toString() : file, 'tag', tags.toString(), 'id', storyID)

        fetch('http://68.183.178.196/api//editStory', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            },
            body: JSON.stringify({
                storyTitle: title,
                storySummary: summary,
                storyBody: body,
                storyTags: tag,
                storyID: storyID.toString()
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.msg) {
                    setReultError(result.msg)
                }
                if (result.affectedRows > 0) {
                    if (typeof window !== 'undefined') {
                        // it's safe to use window now

                        window.location = `/post/${storyID}/${data.postTitle.replace(/\s/g, '-').substring(0, 60)}`

                    }
                }
                setLoad(false)
            })
    }

    const handleBody = (event, editor) => {
        const data = editor.getData()
        setBodyTxt(data)

    }

    return (
        <section className="post-story-sec">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="post-story-inner">
                            <h3>Edit story</h3>

                            {preload ? <Preloader />
                                :
                                <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
                                    {story.map((story, index) =>
                                        <><div key={index} className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <input type="text" name="postTitle" className="form-control" defaultValue={story.title} placeholder="" ref={register({ required: true })} />
                                                    {errors.postTitle && <span>This field is required</span>}
                                                </div>
                                            </div>
                                        </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Community Categories</label>
                                                        <input disabled type="text" name="category" className="form-control" value={story.community_title} placeholder="" ref={register({ required: true })} />
                                                        {<span>Can't Update</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Short Summary of Story</label>
                                                        <input type="text" name="postSummary" defaultValue={story.short_story} className="form-control" onChange={handleChange} placeholder="" ref={register({ required: true })} />
                                                        {errors.postSummary && <span>This field is required</span>}
                                                        {error.summary && <span>25 characters only</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Thumbnail for Story</label>
                                                <label className="upload-file"> Upload
                                        {/* <input type="file" size="60" onChange={imageHandler} /> */}
                                                </label>
                                                {<span>Can't Update</span>}
                                                {!image.viewImage && story.post_thumbnail ? <img src={`http://68.183.178.196/api//${story.post_thumbnail}`} alt="imageUplaod" className="w-25 mt-2" />
                                                    :
                                                    <img src={require(`../../images/com/${story.community_id}.png`).default} alt="postImage" className="img-fluid content-image" />}

                                                {image.viewImage && <img src={image.viewImage} alt="imageUplaod" className="w-25 mt-2" />}

                                            </div>
                                            <div className="form-group">
                                                <label>Body</label>
                                                {/* <textarea name="postBody" defaultValue={story.body} onKeyUp={refineBody} className="form-control" placeholder="" ref={register({ required: true })} /> */}

                                                <CKEditor
                                                    data={story.body}
                                                    editor={ClassicEditor}
                                                    onInit={editor => {
                                                    }}
                                                    config={{
                                                        ckfinder: {
                                                            uploadUrl: 'http://68.183.178.196/api//imageUpload'
                                                        }
                                                    }}
                                                    onChange={handleBody}
                                                />
                                                {/* {errors.postBody && <span>This field is required</span>} */}
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
                                            {load ?
                                                <div className="alert alert-warning m-3 text-center" role="alert">
                                                    <CircularProgress className="mt-2" /><br></br>...Posting...
                                        </div>
                                                :
                                                <div className="form-group">
                                                    <button className="post-btn" type="submit">Edit Story</button>
                                                </div>}
                                        </>)}
                                </form>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default EditStory;