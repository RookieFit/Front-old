import { useState } from 'react';
import InformationMiniBoxEdit from '../informationBox/informationMiniBox/informationMiniBoxEdit';
import MyProfileEdit from '../profileBox/myProfile/myProfileEdit';
import './topMainBox.css';
import SeenProfileEdit from '../../../seenPage/seenProfile/seenProfileEdit';

interface Props {
    role: string
}

const TopMainBoxEdit = ({ role }: Props) => {

    return (
        <div className="top-mainbox-left-right-page">
            {role === 'trainer' ? (
                <>
                    <SeenProfileEdit userId={'1'} name={'나불끈'} message={'사람이든 몸이든 조져드립니다!!'} />
                    <InformationMiniBoxEdit role={'trainer'} value={false} />
                </>
            ) : (
                <>
                    <MyProfileEdit userId={'2'} name={'뚱인데용'} message={'사뢍해용~~'} />
                    <InformationMiniBoxEdit role={'user'} value={false} />
                </>
            )}
        </div>
    )
};

export default TopMainBoxEdit;
