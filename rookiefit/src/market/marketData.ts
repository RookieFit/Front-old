export interface MarketItem {
    id: number;
    category: '판매' | '구매';
    title: string;
    location: string;
    price: number;
    image: string;
    condition: string;
    delivery: string;
    description: string;
    timestamp: string;
    userName: string;
}

export const marketItems: MarketItem[] = [
    {
        id: 1,
        category: '판매',
        title: '5키로 아령 2개 팝니다',
        location: '부산 해운대',
        price: 5000000,
        image: 'https://via.placeholder.com/150',
        condition: '거의 새것',
        delivery: '직거래 및 택배',
        description: '웨이트 전용 아령 팝니다.\n딱 웨이트룸 왔어나 갈까 되었습니다 거의 새 제품이에요\n부산에서 직거래나 택배면 택배비 희망합니다! 채팅주세요',
        timestamp: '2024.11.04',
        userName: '똥똥한 토끼'
    },
    {
        id: 2,
        category: '판매',
        title: '맥북 프로 16인치',
        location: '서울 강남구',
        price: 2500000,
        image: 'https://via.placeholder.com/150',
        condition: '거의 새것',
        delivery: '직거래 및 택배',
        description: '맥북 프로 16인치 판매합니다. 구매한지 3개월 되었고 상태 매우 좋습니다.',
        timestamp: '2024.11.25',
        userName: '행복한 사자'
    },
    {
        id: 3,
        category: '판매',
        title: '겨울 코트',
        location: '경기도 성남시',
        price: 80000,
        image: 'https://via.placeholder.com/150',
        condition: '중고',
        delivery: '택배만 가능',
        description: '따뜻한 겨울 코트입니다. 작년에 구매했고 몇 번 착용했습니다.',
        timestamp: '2024.11.25',
        userName: '즐거운 곰돌이'
    },
    {
        id: 4,
        category: '판매',
        title: '원목 책상',
        location: '부산 해운대구',
        price: 120000,
        image: 'https://via.placeholder.com/150',
        condition: '새제품',
        delivery: '직거래',
        description: '원목 책상 판매합니다. 조립은 했지만 사용하지 않은 새제품입니다.',
        timestamp: '2024.11.25',
        userName: '신나는 판다'
    },
    {
        id: 5,
        category: '판매',
        title: '러닝머신',
        location: '대구 중구',
        price: 300000,
        image: 'https://via.placeholder.com/150',
        condition: '중고',
        delivery: '직거래만 가능',
        description: '러닝머신 판매합니다. 6개월 사용했고 상태 좋습니다.',
        timestamp: '2024.11.25',
        userName: '건강한 기린'
    },
    {
        id: 6,
        category: '판매',
        title: '에어컨',
        location: '광주 북구',
        price: 150000,
        image: 'https://via.placeholder.com/150',
        condition: '중고',
        delivery: '직거래 및 택배',
        description: '벽걸이 에어컨 판매합니다. 작동 상태 좋습니다.',
        timestamp: '2024.11.25',
        userName: '시원한 펭귄'
    },
    {
        id: 7,
        category: '구매',
        title: '스탠드 조명',
        location: '인천 남동구',
        price: 40000,
        image: 'https://via.placeholder.com/150',
        condition: '무관',
        delivery: '직거래 선호',
        description: '스탠드 조명 구매하고 싶습니다. 상태 좋은 제품이면 좋겠습니다.',
        timestamp: '2024.11.25',
        userName: '밝은 햇님'
    },
    {
        id: 8,
        category: '구매',
        title: '기타',
        location: '울산 남구',
        price: 200000,
        image: 'https://via.placeholder.com/150',
        condition: '중고가능',
        delivery: '직거래',
        description: '통기타 구매합니다. 초급자용으로 적당한 제품 찾습니다.',
        timestamp: '2024.11.25',
        userName: '음악하는 고양이'
    },
    {
        id: 9,
        category: '판매',
        title: '소설책 세트',
        location: '서울 종로구',
        price: 30000,
        image: 'https://via.placeholder.com/150',
        condition: '거의 새것',
        delivery: '택배만 가능',
        description: '소설책 세트 판매합니다. 한 번씩만 읽은 상태입니다.',
        timestamp: '2024.11.25',
        userName: '책읽는 여우'
    },
    {
        id: 10,
        category: '구매',
        title: '금목걸이',
        location: '대전 서구',
        price: 500000,
        image: 'https://via.placeholder.com/150',
        condition: '새제품만',
        delivery: '직거래',
        description: '금목걸이 구매합니다. 새제품만 구매하고 싶습니다.',
        timestamp: '2024.11.25',
        userName: '반짝이는 별'
    },
    {
        id: 11,
        category: '판매',
        title: '아이패드 프로',
        location: '서울 강북구',
        price: 1500000,
        image: 'https://via.placeholder.com/150',
        condition: '거의 새것',
        delivery: '직거래 및 택배',
        description: '아이패드 프로 최신형 판매합니다. 구매한지 1개월 되었습니다.',
        timestamp: '2024.11.25',
        userName: '디지털 달인'
    },
    {
        id: 12,
        category: '판매',
        title: '레드향 150Kg',
        location: '제주 서귀포시',
        price: 1800000,
        image: 'https://via.placeholder.com/150',
        condition: '중고',
        delivery: '직거래',
        description: '감귤 100Kg 팝니다. 맛있어요',
        timestamp: '2024.11.26',
        userName: '감귤싫어'
    }
];