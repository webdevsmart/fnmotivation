import React from 'react';
import { useParams } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon } from 'react-share';

const SocialShare = () => {
    let {id} = useParams()
    let url = `https://www.npmjs.com/package/react-share`;
    return (
        <div>
            <FacebookShareButton url={url} appid={360186812075686}>
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
        </div>
    );
};

export default SocialShare;