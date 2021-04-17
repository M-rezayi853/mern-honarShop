import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'به هنرشاپ خوش آمدید',
    description: 'ما بهترین محصولات را با بهترین قیمت بفروش میرسانیم',
    keywords: 'هنری، صنایع دستی، کارهای هنری'
}

export default Meta;
