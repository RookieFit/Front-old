import React, { useState } from 'react';
import ImageUploaderMany from '../components/imageUploaderMany';
import './marketPost.css';
import { useNavigate } from 'react-router-dom';

interface MarketPostForm {
    category: '판매' | '구매';
    title: string;
    price: number | string;
    condition: string;
    location: string;
    delivery: string;
    description: string;
    images: File[];
}

const MarketPost = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<MarketPostForm>({
        category: '판매',
        title: '',
        price: '',
        condition: '새상품',
        location: '',
        delivery: '직거래',
        description: '',
        images: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (images: File[]) => {
        setFormData((prev) => ({
            ...prev,
            images,
        }));
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.price || !formData.location) {
            alert('모든 필드를 채워주세요.');
            return;
        }
        console.log('등록된 데이터:', formData);
        navigate('/market');
    };

    return (
        <div className="market-post-wrapper">
            <div className="market-post-form">
                <div className="market-post-header">
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="market-post-category-select"
                    >
                        <option value="판매">판매</option>
                        <option value="구매">구매</option>
                    </select>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="제목을 입력해주세요"
                    />
                </div>

                <div className="market-post-detail-row">
                    <span className="market-post-detail-label">가격</span>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="가격을 입력해주세요"
                    />
                </div>

                <div className="market-post-details">
                    <div className="market-post-detail-row">
                        <span className="market-post-detail-label">상품상태</span>
                        <select name="condition" value={formData.condition} onChange={handleChange}>
                            <option value="새상품">새상품</option>
                            <option value="거의 새것">거의 새것</option>
                            <option value="중고">중고</option>
                        </select>
                    </div>
                    <div className="market-post-detail-row">
                        <span className="market-post-detail-label">거래지역</span>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="market-post-detail-row">
                        <span className="market-post-detail-label">배송방법</span>
                        <select name="delivery" value={formData.delivery} onChange={handleChange}>
                            <option value="직거래">직거래</option>
                            <option value="택배거래">택배거래</option>
                            <option value="직거래/택배">직거래/택배</option>
                        </select>
                    </div>
                </div>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="market-post-description"
                    placeholder="상품 설명을 입력해주세요"
                />
                <ImageUploaderMany
                    maxImages={6}
                    onImageUpload={handleImageUpload}
                    previewImages={formData.images}
                />

                <button className="market-post-submit" onClick={handleSubmit}>
                    등록하기
                </button>
            </div>
        </div>
    );
};

export default MarketPost;
