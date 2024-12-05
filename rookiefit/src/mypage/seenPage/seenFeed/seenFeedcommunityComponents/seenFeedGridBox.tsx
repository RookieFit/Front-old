import { dummyPosts } from '../../../../community/communityList/dummydata';
import SeenPostGridProps from './seenPostGridProps';


const SeenFeedGrid = () => {
    return (
        <div className="seen-feed-grid">
            <SeenPostGridProps posts={dummyPosts} />
        </div>
    );
};
export default SeenFeedGrid;