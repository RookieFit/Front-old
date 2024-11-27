import React, { useState } from 'react'
import './imageUploaderMany.css'
interface ImageUploaderProps {
    maxImages: number;
}

const ImageUploaderMany = ({ maxImages }: ImageUploaderProps) => {
    const [images, setImages] = useState<File[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (images.length + files.length > maxImages) {
            alert(`이미지는 최대 ${maxImages}장까지 업로드 가능합니다.`);
            return;
        }
        setImages(prev => [...prev, ...files]);
    };
    const handleImageRemove = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="image-uploader-many">
            <label className="image-uploader-many-label">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={images.length >= maxImages}
                    style={{ display: 'none' }}
                />
                <span className="upload-icon">이미지 업로드 ({images.length}/{maxImages})</span>
            </label>
            <div className="image-uploader-many-preview-grid">
                {images.map((image, index) => (
                    <div key={index} className="image-uploader-many-preview">
                        <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                        <button onClick={() => handleImageRemove(index)}>삭제</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ImageUploaderMany
