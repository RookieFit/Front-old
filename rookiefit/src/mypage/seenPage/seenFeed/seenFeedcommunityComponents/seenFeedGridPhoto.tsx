import React, { useState } from 'react';
import './seenFeedGridPhoto.css';
import ImageUploaderMany from '../../../../components/imageUploaderMany';
import PostGrid from '../../../../components/postGrid';


const SeenFeedGridPhoto = () => {
    const [images, setImages] = useState<File[][]>(Array(1).fill([]));

    const handleImageUpload = (index: number) => (newImages: File[]) => {
        const updatedImages = [...images];
        updatedImages[index] = newImages;
        setImages(updatedImages);
    };

    return (
        <div className="seen-feed-container">
            <div className="seen-feed-grid">
                {images.map((imageSet, index) => (
                    <div key={index} className="seen-feed-grid-item">
                        <PostGrid
                            posts={[]}
                            onPostClick={function (id: number): void {
                                throw new Error('Function not implemented.');
                            }}
                            renderItem={function (item: { id: number; }): React.ReactNode {
                                throw new Error('Function not implemented.');
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeenFeedGridPhoto;