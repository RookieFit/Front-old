import React, { useState } from 'react';
import './imageUploader.css'

interface ImageUploaderProps {
    onImageUpload: (image: File | null) => void; // 업로드된 이미지를 부모 컴포넌트로 전달
    maxSizeMB?: number; // 최대 업로드 크기 (MB)
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, maxSizeMB = 5 }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 이미지 URL

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 파일 크기 확인
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            alert(`파일 크기는 최대 ${maxSizeMB}MB까지 업로드 가능합니다.`);
            return;
        }

        // 미리보기 URL 생성 및 부모에 전달
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result as string);
            onImageUpload(file);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        onImageUpload(null); // 이미지 제거 시 부모에 알림
    };

    return (
        <div className="image-uploader">
            {previewUrl ? (
                <div className="image-preview">
                    <img src={previewUrl} alt="Uploaded preview" />
                    <button onClick={handleRemoveImage}>이미지 제거</button>
                </div>
            ) : (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            )}
        </div>
    );
};

export default ImageUploader;
