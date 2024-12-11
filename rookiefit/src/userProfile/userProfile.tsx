import { ProfileProvider } from './userProfileContext';
import LeftProfilePage from './leftProfilePage/leftProfilePage';
import RightProfilePage from './rightProfilePage/rightProfilePage';
import UserProfileChart from './userProfileChart/graphBox';
import { useState } from 'react';

const UserProfile = () => {
    const [isToggled, setIsToggled] = useState<boolean>(true);
    return (
        <div>
            <ProfileProvider>
                <div className="left-right-page">
                    <LeftProfilePage
                        isToggled={isToggled}
                        setIsToggled={setIsToggled}
                    />
                    <RightProfilePage
                        isToggled={isToggled}
                        setIsToggled={setIsToggled}
                    />
                </div>
                <UserProfileChart />
            </ProfileProvider>
        </div>
    );
};

export default UserProfile;
