import SeenFeed from './seenFeed/seenFeed';
import SeenProfile from './seenProfile/seenProfile';
import './seenPage.css';
import MyPageFooter from '../components/myPageFooter';


const TopMainBox = () => {
    return (
        <div className="seen-page-left-right-page">
            <SeenProfile smallvalueReview={50} smallvalueClass={100} />
            <div className='seen-page-right-back'>
                <SeenFeed />
            </div>
            <footer>
                <MyPageFooter/>
            </footer>
        </div>
    )
};
export default TopMainBox;

