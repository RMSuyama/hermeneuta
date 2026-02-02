import React from 'react';

const ImageWrapper = ({ src, alt, className, style }) => {
    return (
        <div className={`img-wrapper ${className || ''}`} style={{ ...style, overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.05)', position: 'relative' }}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={(e) => e.target.style.opacity = 1}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0,
                    transition: 'opacity 0.4s ease-in-out',
                    display: 'block'
                }}
            />
            <style jsx>{`
        .img-wrapper {
          border-radius: inherit;
        }
      `}</style>
        </div>
    );
};

export default ImageWrapper;
