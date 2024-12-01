import { useState } from 'react';
import './writeBox.css'; // 공통 스타일 파일
import ImageUploaderMany from './imageUploaderMany'; // ImageUploaderMany 컴포넌트 임포트

interface WriteBoxProps {
    categories: string[]; // 카테고리 목록
    onSubmit: (title: string, detail: string, images: File[]) => void; // 제출 핸들러, images는 File[] 배열로 받음
    headerTitle: string; // 헤더 제목
    headerContent: string; // 헤더 내용
    maxImages: number; // 최대 이미지 수
}

const WriteBox = ({ categories, onSubmit, headerTitle, headerContent, maxImages }: WriteBoxProps) => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [previewImages, setPreviewImages] = useState<File[]>([]); // 업로드된 이미지 상태 관리

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

    return (
        <div className="write-box-top">
            <div className="write-box-header">
                <h2>{headerTitle}</h2>
                <p>{headerContent}</p>
            </div>
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
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            width: '300px',
                            fontSize: '16px',
                            color: '#666',
                            backgroundColor: '#f0f0f0',
                            border: 'none',
                            borderRadius: '7px',
                            textAlign: 'left',
                            paddingLeft: '5px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                        maxImages={maxImages}
                        onImageUpload={handleImageUpload} // 업로드된 이미지 처리
                        previewImages={previewImages} // 미리보기 이미지 전달
                    />
                    <button className="write-box-submit" onClick={handleSubmit}>
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WriteBox;
