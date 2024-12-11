/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface GetUserBodyDataResponseDto extends ResponseDto {
    userAge: number;
    userWeight: number;
    userHeight: number;
    userMuscleMass: number;
    userFatMass: number;
    inbodydate: string;
}