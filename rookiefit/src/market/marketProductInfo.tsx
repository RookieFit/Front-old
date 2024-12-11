import { MarketItem } from "./marketData";
import { useNavigate } from 'react-router-dom';

interface ProductInfoProps {
    item: MarketItem;
    onChat: () => void;
    onDelete: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="market-detail-info-row">
        <span className="market-detail-info-label">{label}</span>
        <span className="market-detail-info-value">{value}</span>
    </div>
);

export const ProductInfo = ({ item, onChat, onDelete }: ProductInfoProps) => {
    const navigate = useNavigate();

    // 수정 페이지로 이동하는 함수
    const handleEdit = () => {
        navigate(`/market/edit/${item.id}`);  // 수정할 상품의 id를 가지고 수정 페이지로 이동
    };

    return (
        <div className="market-detail-info">
            <div className="market-detail-main-info">
                <div className="market-detail-title-section">
                    <span className="market-detail-category-tag">{item.category}</span>
                    <h2>{item.title}</h2>
                </div>
                <div className="market-detail-user-info">
                    <div className="market-detail-user-name">{item.userName}</div>
                    <div className="market-detail-timestamp">{item.timestamp}</div>
                </div>
                <h3 className="market-detail-price">₩{item.price.toLocaleString()}</h3>
            </div>

            <div className="market-detail-info-table">
                <InfoRow label="상품상태" value={item.condition} />
                <InfoRow label="배송방법" value={item.delivery} />
                <InfoRow label="거래지역" value={item.location} />
            </div>

            <div className="market-detail-description">{item.description}</div>

            <button className="market-detail-inquiry-button" onClick={onChat}>
                거래 문의 및 채팅
            </button>

            <div className="market-detail-author-buttons">
                <button className="market-detail-edit-button" onClick={handleEdit}>
                    수정
                </button>
                <button className="market-detail-delete-button" onClick={onDelete}>
                    삭제
                </button>
            </div>
        </div>
    );
};
