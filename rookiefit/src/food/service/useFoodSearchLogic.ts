import { GetDietDataResponseDto } from "../../apis/response/diet";

export const useFoodSearchLogic = (filteredEntries: GetDietDataResponseDto[]) => {
    // 한글 포함 여부 확인 함수
    const containsKorean = (text: string) => /[가-힣]/.test(text);

    // 정렬된 데이터 생성
    const sortedEntries = filteredEntries
        .slice() // 원본 배열 복사
        .sort((a, b) => {
            // 한글 우선 정렬
            const aContainsKorean = containsKorean(a.foodName);
            const bContainsKorean = containsKorean(b.foodName);

            if (aContainsKorean && !bContainsKorean) return -1; // a가 앞에
            if (!aContainsKorean && bContainsKorean) return 1; // b가 앞에
            return a.foodName.localeCompare(b.foodName, "ko", { sensitivity: "base" });
        });

    return { sortedEntries, containsKorean };
};
