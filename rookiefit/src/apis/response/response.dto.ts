import { ResponseCode, ResponseMessage } from "../types/enums";

export default interface ResponseDto {
    code: ResponseCode;
    message: ResponseMessage;
}
