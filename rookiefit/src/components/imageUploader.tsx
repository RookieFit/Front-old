import React, { useState } from 'react';
import './imageUploader.css';

interface ImageUploaderProps {
    onImageUpload: (image: File | null) => void;
    maxSizeMB?: number;
}

const ImageUploader = ({ onImageUpload, maxSizeMB = 5 }: ImageUploaderProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            alert(`파일 크기는 최대 ${maxSizeMB}MB까지 업로드 가능합니다.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result as string);
            onImageUpload(file);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        onImageUpload(null);
    };

    return (
        <div className="image-uploader">
            {previewUrl ? (
                <div className="image-preview">
                    <img src={previewUrl} alt="Uploaded preview" />
                    <button onClick={handleRemoveImage} className="remove-button">이미지 제거</button>
                </div>
            ) : (
                <label className="upload-label">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <span className="upload-icon">사진</span> {/* + 아이콘처럼 보이게 스타일링 */}
                </label>
            )}
        </div>
    );
};

export default ImageUploader;
