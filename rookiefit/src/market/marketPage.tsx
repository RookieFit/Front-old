import React from 'react'
import CommunityHeader from '../community/communityComponents/communityHeader'
import MarketItemList from './marketItemList'

const MarketPage = () => {
    return (
        <div>
            <CommunityHeader title="Market" content="루키핏 마켓 입니다." />
            <div className="community-divider"></div>
            <MarketItemList />
        </div>
    )
}

export default MarketPage
