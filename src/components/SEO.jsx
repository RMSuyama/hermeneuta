import React from 'react';

const SEO = ({ type, data }) => {
    const getSchema = () => {
        switch (type) {
            case 'NewsArticle':
                return {
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "headline": data.title,
                    "image": [data.image, ...(data.images?.map(img => img.url) || [])],
                    "datePublished": data.created_at || data.date,
                    "author": [{
                        "@type": "Person",
                        "name": data.author,
                        "url": window.location.origin
                    }]
                };
            case 'ScholarlyArticle':
                return {
                    "@context": "https://schema.org",
                    "@type": "ScholarlyArticle",
                    "headline": data.title,
                    "author": {
                        "@type": "Person",
                        "name": data.author
                    },
                    "datePublished": data.year,
                    "publisher": {
                        "@type": "Organization",
                        "name": data.institution || "Hermeneuta"
                    },
                    "description": data.resume
                };
            case 'JobPosting':
                return {
                    "@context": "https://schema.org",
                    "@type": "JobPosting",
                    "title": data.title,
                    "description": data.description,
                    "datePosted": data.created_at || new Date().toISOString(),
                    "hiringOrganization": {
                        "@type": "Organization",
                        "name": data.company
                    },
                    "jobLocation": {
                        "@type": "Place",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": data.location
                        }
                    },
                    "employmentType": data.type
                };
            default:
                return null;
        }
    };

    const schema = getSchema();
    if (!schema) return null;

    return (
        <script type="application/ld+json">
            {JSON.stringify(schema)}
        </script>
    );
};

export default SEO;
