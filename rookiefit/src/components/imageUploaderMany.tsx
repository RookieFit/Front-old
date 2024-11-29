import React, { useState, useEffect } from 'react';
import './imageUploaderMany.css';
import Slider from 'react-slick';

interface ImageUploaderProps {
    maxImages: number;
    onImageUpload: (images: File[]) => void;
    previewImages: File[];
}

const ImageUploaderMany = ({ maxImages, onImageUpload, previewImages }: ImageUploaderProps) => {
    const [images, setImages] = useState<File[]>([]);

    // 기존 이미지를 받아와서 이미지 상태에 초기화
    useEffect(() => {
        setImages([]); // 이 부분은 기존 이미지 프리뷰를 사용할 때 필요하지 않으므로 수정이 필요할 수 있음
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
        infinite: false,  // 무한 스크롤 비활성화
        speed: 500,
        slidesToShow: Math.min(3, images.length + previewImages.length), // 최대 3개까지 한 번에 표시
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        focusOnSelect: true, // 클릭하면 선택된 이미지로 포커스
        arrows: false, // 화살표 비활성화
    };

    return (
        <div className="image-uploader-many">
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
