import React from 'react';

interface PostImagesProps {
    images: string[];
}

function PostImages({ images }: PostImagesProps) {
    return (
        <div className="post-images-wrapper">
            {images.slice(0, 6).map((image, index) => (
                <div
                    key={index}
                    className="post-image"
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
        </div>
    );
}

export default PostImages;
