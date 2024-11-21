import SeenFeed from './seenFeed/seenFeed';
import SeenProfile from './seenProfile/seenProfile';
import './seenPage.css';


const TopMainBox = () => {
    return (
        <div className="seen-page-left-right-page">
            <SeenProfile smallvalueReview={50} smallvalueClass={100}/>
            <SeenFeed /> 
        </div>
    )
};
export default TopMainBox;
