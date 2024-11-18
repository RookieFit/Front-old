enum ResponseMessage {
    SUCCESS = "Success..",
    VALIDATION_ERROR = "Validation failed..",
    DATABASE_ERROR = "Database Error..",
    Sign_IN_FAIL = "Login Information mismatched error",
    CERTIFICATION_FAIL = "Certification Error..",
    DUPLICATE_ID = "Duplicated ID ..",
    DUPLICATE_PHONENUMBER = "Duplicated PhoneNumber ..",
    PASSWORD_MISMATCH = "Password Mismatch ..",
    SMS_FAIL = "SMS SEND FAIL ..",
    PhoneNumber_NOT_FOUND = "PhoneNumber is not found..",
    ID_NOT_FOUND = "Id not Found..",
}

export default ResponseMessage