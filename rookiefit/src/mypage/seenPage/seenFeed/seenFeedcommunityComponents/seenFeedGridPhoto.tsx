import React from 'react';
import './seenFeedGridPhoto.css';
import ImageUploaderMany from '../../../../components/imageUploaderMany';

interface SeenFeedGridPhotoProps {
    itemsPerRow: number;
    totalItems: number;
}

const SeenFeedGridPhoto = ({ itemsPerRow, totalItems}: SeenFeedGridPhotoProps) => {
    return (
        <div
            className="seen-feed-container"
            style={{
                gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
            }}
        >
            {[...Array(totalItems)].map((_, index) => (
                <div className="seen-feed-item" key={index}>
                  <ImageUploaderMany maxImages={1} onImageUpload={function (images: File[]): void {
                        throw new Error('Function not implemented.');
                    } } previewImages={[]}/>
                </div>
            ))}
        </div>
    );
};

export default SeenFeedGridPhoto;
