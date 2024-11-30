import { useState, useRef } from 'react';
import './writeBox.css'; // 공통 스타일 파일

interface WriteBoxProps {
    categories: string[]; // 카테고리 목록
    onSubmit: (title: string, detail: string, file?: File) => void; // 제출 핸들러
    headerTitle: string; // 헤더 제목
    headerContent: string; // 헤더 내용
}

const WriteBox = ({ categories, onSubmit, headerTitle, headerContent }: WriteBoxProps) => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const inputEl = useRef<HTMLInputElement | null>(null);

    // 제목 입력 처리
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // 내용 입력 처리
    const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetail(e.target.value);
    };

    // 등록 버튼 클릭 처리
    const handleSubmit = () => {
        const file = inputEl.current?.files?.[0];
        onSubmit(title, detail, file);
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
                    <input
                        type="file"
                        className="write-box-file"
                        accept="image/*"
                        ref={inputEl}
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
