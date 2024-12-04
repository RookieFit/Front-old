import { useState } from 'react';
import './writeBox.css'; // 공통 스타일 파일
import ImageUploaderMany from './imageUploaderMany'; // ImageUploaderMany 컴포넌트 임포트
import { UserCommunityRequest } from '../apis/api/communityApi';
import { getJwtToken } from '../authCheck/storageUtils';

interface WriteBoxProps {
    categories: string[]; // 카테고리 목록
    onSubmit: (title: string, detail: string, images: File[]) => void; // 제출 핸들러, images는 File[] 배열로 받음
    maxImages: number; // 최대 이미지 수
}

const WriteBox = ({ categories, onSubmit, maxImages }: WriteBoxProps) => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [previewImages, setPreviewImages] = useState<File[]>([]); // 업로드된 이미지 상태 관리
    const token = getJwtToken()
    const createdDate = "24242424"

    // 제목 입력 처리
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // 내용 입력 처리
    const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetail(e.target.value);
    };

    // 이미지 업로드 핸들러
    const handleImageUpload = (images: File[]) => {
        setPreviewImages(images); // 이미지를 배열로 저장
    };

    // 등록 버튼 클릭 처리
    const handleSubmit = () => {
        onSubmit(title, detail, previewImages); // 모든 이미지를 전달
    };

    // 카테고리 변경 처리
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };
    const onIdButtonClickHandler = async () => {
        if (!title || !detail || !selectedCategory) return;
        try {
            const response = await UserCommunityRequest({
                token: token,
                createdDate: createdDate,
                communityTitle: title,
                communityContent: detail,
                communityContentType: selectedCategory,
            });
            console.log("response", response)
        } catch {
            console.log("response")
        }
    };

    return (
        <div className="write-box-top">
            <div className="write-box-body">
                <div className="write-box-category">
                    <select
                        className="write-box-category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        disabled={categories.length === 1} // 카테고리가 하나면 비활성화
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="write-box-title"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <textarea
                    className="write-box-detail"
                    placeholder="내용을 입력하세요"
                    value={detail}
                    onChange={handleDetailChange}
                />
                <div className="write-box-footer">
                    <ImageUploaderMany
                        maxImages={maxImages}
                        onImageUpload={handleImageUpload} // 업로드된 이미지 처리
                        previewImages={previewImages} // 미리보기 이미지 전달
                    />
                    <button className="write-box-submit" onClick={onIdButtonClickHandler}>
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WriteBox;
