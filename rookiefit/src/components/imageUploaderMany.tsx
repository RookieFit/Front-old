import React, { useState, useEffect } from 'react';
import './imageUploaderMany.css';
import Slider from 'react-slick';

interface ImageUploaderProps {
    maxImages: number;
    onImageUpload: (images: File[]) => void; // 부모 컴포넌트로 이미지를 전달할 콜백 함수
    previewImages: string[]; // 기존 이미지 프리뷰를 부모 컴포넌트에서 받아옴
}

const ImageUploaderMany = ({ maxImages, onImageUpload, previewImages }: ImageUploaderProps) => {
    const [images, setImages] = useState<File[]>([]);

    // 기존 이미지를 받아와서 이미지 상태에 초기화
    useEffect(() => {
        setImages([]); // 이 부분은 기존 이미지 프리뷰를 사용할 때 필요하지 않으므로 수정이 필요할 수 있음
    }, [previewImages]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (images.length + files.length > maxImages) {
            alert(`이미지는 최대 ${maxImages}장까지 업로드 가능합니다.`);
            return;
        }
        const newImages = [...images, ...files];
        setImages(newImages);
        onImageUpload(newImages); // 부모 컴포넌트로 이미지를 전달
    };

    const handleImageRemove = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index); // 삭제된 이미지를 필터링
        setImages(updatedImages); // 상태 업데이트
        onImageUpload(updatedImages); // 부모 컴포넌트로 업데이트된 이미지 전달
    };

    const sliderSettings = {
        dots: true,
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
                    {/* 기존 이미지를 프리뷰로 보여주기 */}
                    {previewImages.map((image, index) => (
                        <div key={index} className="image-uploader-many-preview">
                            <img src={image} alt={`Preview ${index}`} />
                            <button onClick={() => handleImageRemove(index)}>삭제</button>
                        </div>
                    ))}
                    {/* 새로 업로드된 이미지들을 프리뷰로 보여주기 */}
                    {/* {images.map((image, index) => (
                        <div key={index} className="image-uploader-many-preview">
                            <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                            <button onClick={() => handleImageRemove(index)}>삭제</button>
                        </div>
                    ))} */}
                </Slider>
            </div>
        </div>
    );
};

export default ImageUploaderMany;
