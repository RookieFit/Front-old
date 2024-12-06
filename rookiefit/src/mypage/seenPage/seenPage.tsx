import SeenFeed from './seenFeed/seenFeed';
import SeenProfile from './seenProfile/seenProfile';
import './seenPage.css';
import MyPageFooter from '../components/myPageFooter';

const SeenPage = () => {
    
    return (
        <div className="seen-page-left-right-page">
            <SeenProfile name={'1'} message={'1'}  />
            <div className='seen-page-right-back'>
                <SeenFeed role={'trainer'} showBackground={true}/>
            </div>
            <footer>
                <MyPageFooter />
            </footer>
        </div>
    )
};
export default SeenPage;

