import React from 'react'
import ImageUploader from '../../../../components/imageUploader'

const seenFeedGridPhoto = () => {
    return (
        <div className="seen-feed-container">
            <ImageUploader onImageUpload={function (image: File | null): void {
                throw new Error('Function not implemented.');
            }} />
        </div>
    )
}

export default seenFeedGridPhoto