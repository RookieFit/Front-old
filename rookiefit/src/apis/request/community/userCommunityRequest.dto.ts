export default interface UserCommunityRequestDto {
    communityListId?: number
    communityTitle: string
    communityContent: string
    isModified?: boolean
    communityImageUrl?: string
    communityContentType: string
}