import React from 'react';
import ImageUploader from '../../../../components/imageUploader';
import './seenFeedGridPhoto.css';
import ImageUploaderMany from '../../../../components/imageUploaderMany';

interface SeenFeedGridPhotoProps {
    itemsPerRow: number;
    totalItems: number;
}

const SeenFeedGridPhoto = ({ totalItems}: SeenFeedGridPhotoProps) => {
    return (
        <div
            className="seen-feed-container"
        >
            {[...Array(totalItems)].map((_, index) => (
                <div className="seen-feed-item" key={index}>
                  <ImageUploaderMany maxImages={0} onImageUpload={function (images: File[]): void {
                        throw new Error('Function not implemented.');
                    } } previewImages={[]}/>
                </div>
            ))}
        </div>
    );
};

export default SeenFeedGridPhoto;
