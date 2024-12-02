import './topMainBox.css';
import MyProfile from '../profileBox/myProfile/myProfile';
import InformationMiniBox from '../informationBox/informationMiniBox/informationMiniBox';
import { useState } from 'react';
import SeenProfile from '../../../seenPage/seenProfile/seenProfile';

interface Props {
    role: string
}

const TopMainBox = ({ role }: Props) => {

    return (
        <div className="top-mainbox-left-right-page">
            {role === 'trainer' ? (
                <>
                    <SeenProfile userId={'1'} name={'나불끈'} message={'사람이든 몸이든 조져드립니다!!'} />
                    <InformationMiniBox role={'trainer'} value={false} />
                </>
            ) : (
                <>
                    <MyProfile userId={'2'} name={'뚱인데용'} message={'사뢍해용~~'} />
                    <InformationMiniBox role={'user'} value={false} />
                </>
            )}
        </div>
    )
};
export default TopMainBox;
