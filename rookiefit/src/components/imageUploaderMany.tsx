import React, { useState, useEffect } from 'react';
import './imageUploaderMany.css';
import Slider from 'react-slick';

interface ImageUploaderProps {
    maxImages: number;
    onImageUpload: (images: File[]) => void;
    previewImages: File[];
    className?: string; // 외부에서 전달받을 사용자 정의 클래스
}

const ImageUploaderMany = ({ maxImages, onImageUpload, previewImages, className }: ImageUploaderProps) => {
    const [images, setImages] = useState<File[]>([]);

    useEffect(() => {
        setImages([]);
    }, [previewImages]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (previewImages.length + files.length > maxImages) {
            alert(`이미지는 최대 ${maxImages}장까지 업로드 가능합니다.`);
            return;
        }
        onImageUpload([...previewImages, ...files]);
    };

    const handleImageRemove = (index: number) => {
        const updatedImages = previewImages.filter((_, i) => i !== index);
        onImageUpload(updatedImages);
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: Math.min(3, images.length + previewImages.length), // 최대 3개까지 한 번에 표시
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: false,
    };

    return (
        <div className={`image-uploader-many ${className || ''}`}>
            <label className="image-uploader-many-label">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={previewImages.length >= maxImages}
                    style={{ display: 'none' }}
                />
                <span className="upload-icon">
                    이미지 업로드 ({previewImages.length}/{maxImages})
                </span>
            </label>
            <div className="image-uploader-many-preview-grid">
                <Slider {...sliderSettings}>
                    {previewImages.map((image, index) => (
                        <div key={index} className="image-uploader-many-preview">
                            <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                            <button onClick={() => handleImageRemove(index)}>삭제</button>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ImageUploaderMany;
