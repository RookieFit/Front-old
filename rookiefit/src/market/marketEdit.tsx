import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MarketEdit.css';  // CSS 파일 임포트
import { MarketItem } from './marketData';  // MarketItem 타입 임포트

const MarketEdit = () => {
    const { id } = useParams();  // URL에서 id 가져오기
    const navigate = useNavigate();
    const [item, setItem] = useState<MarketItem | null>(null);  // item 상태 관리

    // 상품 정보 가져오기
    useEffect(() => {
        // 여기에 id를 사용하여 서버에서 상품 정보를 가져오는 코드 추가
        // 예: fetch(`/api/items/${id}`)
        // setItem(fetchedItem);

        // 예시 데이터
        const fetchedItem: MarketItem = {
            id: id!,
            title: '상품명',
            category: '카테고리',
            userName: '사용자명',
            price: 10000,
            condition: '새상품',
            delivery: '택배',
            location: '서울',
            timestamp: '2024-12-09',
            description: '상품 설명',
        };
        setItem(fetchedItem);
    }, [id]);

    // 수정된 상품 저장
    const handleSave = () => {
        if (item) {
            // 여기에 상품 정보를 서버에 저장하는 코드 추가
            // 예: saveItem(item);

            // 수정 후 상세 페이지로 이동
            navigate(`/market/detail/${id}`);
        }
    };

    if (!item) return <div>Loading...</div>;  // 데이터가 없으면 로딩 화면 표시

    return (
        <div className="market-edit-container">
            <h1>상품 수정</h1>
            <div className="form-group">
                <label>상품명</label>
                <input
                    type="text"
                    value={item.title}
                    onChange={(e) => setItem({ ...item, title: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>카테고리</label>
                <input
                    type="text"
                    value={item.category}
                    onChange={(e) => setItem({ ...item, category: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>가격</label>
                <input
                    type="number"
                    value={item.price}
                    onChange={(e) => setItem({ ...item, price: parseInt(e.target.value) })}
                />
            </div>
            <div className="form-group">
                <label>상품 상태</label>
                <input
                    type="text"
                    value={item.condition}
                    onChange={(e) => setItem({ ...item, condition: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>배송 방법</label>
                <input
                    type="text"
                    value={item.delivery}
                    onChange={(e) => setItem({ ...item, delivery: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>거래 지역</label>
                <input
                    type="text"
                    value={item.location}
                    onChange={(e) => setItem({ ...item, location: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>상품 설명</label>
                <textarea
                    value={item.description}
                    onChange={(e) => setItem({ ...item, description: e.target.value })}
                />
            </div>
            <button className="save-button" onClick={handleSave}>저장</button>
        </div>
    );
};

export default MarketEdit;
