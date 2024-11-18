import { ResponseDto } from "../response";

type ResponseBody<T> = T | ResponseDto | null;

export type {
    ResponseBody
}