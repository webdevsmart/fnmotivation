import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import MetaTags from 'react-meta-tags';

const OgData = ({ title, description, url, image }) => {
    const [meta] = useState({
        title: title,
        description: description,
        url: url,
        image: image
    })
    return (
        <>
            <MetaTags>
                <meta name="title" content={meta.title} />
                <meta
                    name="description"
                    content={meta.description}
                />

                <meta property="og:title" content={meta.title} />
                {meta.image && <meta property="og:image" content={meta.image} />}
                <meta
                    property="og:description"
                    content={meta.description}
                />
                <meta property="og:url" content={meta.url} />
            </MetaTags>
            <Helmet>
                <meta charset="utf-8" />
                <title>{meta.title}</title>
                <meta name="title" content={meta.title} />
                <meta name="description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:url" content={meta.url} />
            </Helmet>
        </>
    );
};

export default OgData;