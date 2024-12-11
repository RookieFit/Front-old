/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface GetUserProfileResponseDto extends ResponseDto {
    userProfileImageUri: string;
    gymName: string;
    userMessage: string;
    userName: string;
    userAddress: string;
    userNickname: string;
}