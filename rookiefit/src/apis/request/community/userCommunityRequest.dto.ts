export default interface UserCommunityRequestDto {
    token: string | null;  // null을 허용하도록 수정
    communityListId?: number
    communityTitle: string
    communityContent: string
    createdDate: string
    isModified?: boolean
    communityImageUrl?: string
    communityContentType: string
}