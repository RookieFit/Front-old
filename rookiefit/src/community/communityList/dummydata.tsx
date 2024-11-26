type Category = '바프' | '고민' | '정보' | '친목' | '공지';

type Comment = {
    id: number;
    postId: string; // postId도 string으로 변경
    author: string;
    date: string;
    content: string;
};

const funComments = [
    '와 진짜 대박이네요!',
    '이건 좀 아닌 것 같아요...',
    '굿굿 정말 도움되는 글이에요',
    '다음에 더 자세히 설명해주세요',
    '완전 공감됩니다 ㅋㅋ',
    '헬스장에서 이런 일이?',
    '저도 비슷한 경험 있어요',
    '추천합니다!',
    '아 이거 완전 중요한 팁이네요',
    '처음 들어보는 정보예요',
    '웃긴 얘기네요 ㅋㅋㅋ',
    '뭔가 이상한데요?',
    '나도 해봐야겠다',
    '전문가의 조언 같아요',
    '똥이나 드세요.',
    '좀 더 자세히 알려주세요',
];

export const dummyPosts = Array.from({ length: 100 }, (_, index) => {
    const categories: Category[] = ['바프', '고민', '정보', '친목', '공지']; // '전체' 카테고리 제외
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    // 댓글 생성 (최소 1개 이상)
    const comments: Comment[] = Array.from(
        { length: Math.max(1, Math.floor(Math.random() * 5) + 1) },
        (_, commentIndex) => ({
            id: commentIndex + 1,
            postId: (index + 1).toString(), // postId를 string으로 변경
            author: `운동러 ${Math.floor(Math.random() * 100) + 1}`,
            date: `2024-11-${(commentIndex % 30) + 1}`,
            content: funComments[Math.floor(Math.random() * funComments.length)],
        })
    );

    // 0개부터 6개의 이미지를 랜덤으로 생성
    const imageCount = Math.floor(Math.random() * 7);
    const images = Array.from(
        { length: imageCount },
        (_, imageIndex) =>
            `https://via.placeholder.com/400x200?text=Image+${index * 7 + imageIndex + 1}`
    );

    return {
        id: (index + 1).toString(), // id를 string으로 변경
        category: randomCategory,
        title: `게시글 제목 ${index + 1}`,
        author: `작성자 ${index + 1}`,
        date: `2024-11-${(index % 30) + 1}`,
        images, // 랜덤 이미지 배열
        content: `여기에 게시글 내용 ${index + 1}이 들어갑니다. 글의 본문을 여기에 작성합니다. 
        이 글은 카테고리 "${randomCategory}"에 속합니다.
        피크민은 닌텐도의 인기 게임 시리즈로, 
        귀여운 식물 생명체 '피크민'을 주인공으로 합니다. 
        다양한 색깔의 피크민이 각각 고유한 능력을 가지고 있으며,
         플레이어는 이들을 지휘하여 탐험하고 문제를 해결합니다. 
         최신작 '피크민 4'는 닌텐도 스위치용으로 출시되었고, 
         모바일 AR 게임 '피크민 블룸'은 현실 세계를 걸으며 즐기는 방식을 채택했습니다. 
         이 게임 시리즈는 전략적 요소와 힐링 요소를 동시에 갖추고 있어 다양한 연령층에게 인기가 있습니다.`,
        comments, // 댓글 배열
    };
});