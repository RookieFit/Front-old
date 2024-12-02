/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface SignInResponseDto extends ResponseDto {
    token: string;
    expirationTime: number;
}