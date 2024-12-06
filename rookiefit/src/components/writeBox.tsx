import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './writeBox.css';
import ImageUploaderMany from './imageUploaderMany';
import { UserCommunityRequest } from '../apis/api/communityApi';
import { getJwtToken } from '../authCheck/storageUtils';

interface WriteBoxProps {
    categories: string[];
    onSubmit: (title: string, detail: string, images: File[]) => void;
    maxImages: number;
}

const WriteBox = ({ categories, maxImages }: WriteBoxProps) => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const navigate = useNavigate();
    const [previewImages, setPreviewImages] = useState<File[]>([]);
    const [token, setToken] = useState<string | null>(null); // token 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        // 비동기적으로 token을 설정하는 작업
        const fetchToken = async () => {
            const storedToken = await getJwtToken(); // 비동기 호출
            setToken(storedToken); // 토큰 상태 설정
            setIsLoading(false); // 로딩 완료
            console.log(storedToken)
        };
        fetchToken();
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetail(e.target.value);
    };

    const handleImageUpload = (images: File[]) => {
        setPreviewImages(images);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const onIdButtonClickHandler = async () => {
        if (!title || !detail || !selectedCategory || !token) return; // token이 없으면 요청하지 않음
        console.log("제목:", title);
        console.log("내용:", detail);
        console.log("카테고리:", selectedCategory);
        console.log("이미지 미리보기 목록:", previewImages);

        try {
            const response = await UserCommunityRequest({
                communityTitle: title,
                communityContent: detail,
                communityContentType: selectedCategory,
            });
            console.log("token", token);
            console.log("response", response);

            navigate('/community'); // 리스트 페이지로 이동
        } catch (error) {
            console.log("Error in request:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // 로딩 중에는 로딩 화면을 표시
    }

    return (
        <div className="write-box-top">
            <div className="write-box-body">
                <div className="write-box-category">
                    <select
                        className="write-box-category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        disabled={categories.length === 1}
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
                        onImageUpload={handleImageUpload}
                        previewImages={previewImages}
                    />
                    <button
                        className="write-box-submit"
                        onClick={onIdButtonClickHandler}
                        disabled={!token} // token이 없으면 버튼 비활성화
                    >
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WriteBox;
