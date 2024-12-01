import React from 'react';
import './trainerAuth.css';

// 트레이너 인증을 요청한 회원 데이터 타입
type TrainerRequest = {
    name: string;
    businessCertificateImage: string; // 사업자 증명 이미지 (필수)
    certificateName?: string; // 자격증 명 (선택)
    certificateImage?: string; // 자격증 이미지 (선택)
};

// 예시로 사용할 회원 데이터
const trainerRequests: TrainerRequest[] = [
    {
        name: '김철수',
        businessCertificateImage: '/images/business-certificate1.jpg', // 사업자 증명 이미지
        certificateName: '헬스 트레이너 자격증',
        certificateImage: '/images/certificate1.jpg',
    },
    {
        name: '이영희',
        businessCertificateImage: '/images/business-certificate2.jpg', // 사업자 증명 이미지
        certificateName: '피트니스 트레이너 자격증',
        certificateImage: '/images/certificate2.jpg',
    },
    {
        name: '박지훈',
        businessCertificateImage: '/images/business-certificate3.jpg', // 사업자 증명 이미지
        // 자격증 명과 자격증 이미지 없음
    },
    // 추가적인 데이터...
];

const TrainerAuth = (): JSX.Element => {
    return (
        <div className="trainerAuth-container">
            <h1 className="trainerAuth-title">트레이너 인증 요청</h1>
            <table className="trainerAuth-table">
                <thead>
                    <tr className="trainerAuth-tr">
                        <th className="trainerAuth-th">회원 이름</th>
                        <th className="trainerAuth-th">자격증 명</th>
                        <th className="trainerAuth-th">자격증 사진</th>
                        <th className="trainerAuth-th">사업자 증명 사진</th>
                    </tr>
                </thead>
                <tbody>
                    {trainerRequests.map((request, index) => (
                        <tr key={index} className="trainerAuth-tr">
                            <td className="trainerAuth-td">{request.name}</td>
                            <td className="trainerAuth-td">
                                {request.certificateName || '없음'}
                            </td>
                            <td className="trainerAuth-td">
                                {request.certificateImage ? (
                                    <img
                                        className="trainerAuth-img"
                                        src={request.certificateImage}
                                        alt={request.certificateName || '자격증 이미지'}
                                        width={100}
                                    />
                                ) : (
                                    '없음'
                                )}
                            </td>
                            <td className="trainerAuth-td">
                                <img
                                    className="trainerAuth-img"
                                    src={request.businessCertificateImage}
                                    alt="사업자 증명"
                                    width={100}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainerAuth;
