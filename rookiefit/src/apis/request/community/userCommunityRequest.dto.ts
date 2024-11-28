export default interface UserCommunityRequestDto {
    token: string
    communityListId: number
    communityTitle: string
    communityContent: string
    createdDate: string
    isModified: boolean
    communityImageUrl: string
    communityContentType: string
}