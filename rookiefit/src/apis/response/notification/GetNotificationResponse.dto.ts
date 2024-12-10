/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface GetNotificationResponseDto extends ResponseDto {
    notificationId: string;
    notificationAuthor: string;
    notificationContent: string;
    notificationTitle: string;
    notificationCreatedTime: string;
    notificationIsModified: Boolean;
    notificationImageUri: string;
    notificationBoardDown: Boolean;
    notificationBoardUpdatedTime: string;
}
