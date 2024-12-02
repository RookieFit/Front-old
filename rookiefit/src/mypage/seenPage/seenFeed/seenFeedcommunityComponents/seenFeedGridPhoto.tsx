import React from 'react';
import ImageUploader from '../../../../components/imageUploader';
import './seenFeedGridPhoto.css';

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
                    <ImageUploader
                        onImageUpload={(image: File | null) => {
                            console.log('Uploaded:', image);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default SeenFeedGridPhoto;
