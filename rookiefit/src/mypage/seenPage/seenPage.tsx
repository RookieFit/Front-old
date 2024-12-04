import SeenFeed from './seenFeed/seenFeed';
import SeenProfile from './seenProfile/seenProfile';
import './seenPage.css';
import MyPageFooter from '../components/myPageFooter';

const SeenPage = () => {
    
    return (
        <div className="seen-page-left-right-page">
            <SeenProfile userId={'1'} name={'김불끈'} message={'사람이든 어쩌고 저쩌고'} />
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

