// dummyData.ts

type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';

export const dummyPosts = Array.from({ length: 100 }, (_, index) => {
  const categories: Category[] = ['전체', '바프', '고민', '정보', '친목', '공지'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];

  return {
    id: index + 1,  // 각 게시글에 고유한 id 추가
    category: randomCategory,
    title: `게시글 제목 ${index + 1}`,
    author: `작성자 ${index + 1}`,
    date: `2024-11-${(index % 30) + 1}`,
    images: [
      `https://via.placeholder.com/400x200?text=Image+${index * 3 + 1}`,
      `https://via.placeholder.com/400x200?text=Image+${index * 3 + 2}`,
      `https://via.placeholder.com/400x200?text=Image+${index * 3 + 3}`,
    ],
    content: `여기에 게시글 내용 ${index + 1}이 들어갑니다. 글의 본문을 여기에 작성합니다. 이 글은 카테고리 "${randomCategory}"에 속합니다.`,
  };
});
