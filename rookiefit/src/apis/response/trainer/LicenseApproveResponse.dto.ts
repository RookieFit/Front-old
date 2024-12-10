/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface LicenseApproveResponseDto extends ResponseDto {
    request_cnt: string;
    match_cnt: string;
    status_code: string;
    data: Data[];
}

interface Data {
    b_no: String;
    b_stt: string;
    b_stt_cd: string;
    tax_type: String;
    tax_type_cd: String;
    end_dt: String;
    enerc: String;
    utcc_yn: String;
    tax_type_change_dt: string;
    invoice_apply_dt: string;
    rbf_tax_type: String;
    rbf_tax_type_cd: String;

}