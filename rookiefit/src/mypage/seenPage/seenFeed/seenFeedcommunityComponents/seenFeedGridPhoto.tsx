import React, { useState } from 'react';
import './seenFeedGridPhoto.css';
import ImageUploaderMany from '../../../../components/imageUploaderMany';


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
                        <ImageUploaderMany
                            maxImages={3}
                            onImageUpload={handleImageUpload(index)}
                            previewImages={imageSet}
                            className="seen-feed-uploader"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeenFeedGridPhoto;