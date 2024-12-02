export default interface UserCommunityAnswerRequestDto {
    communityListId: number
    communityAnswerListId: number
    token: string
    answerContent: string
    answerCreatedDate: string
    answerIsModified: boolean
}