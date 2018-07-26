import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Poster from './UI-components/PostComponents/Poster';

class MarketFeed extends Component {
    render() {
        const { marketFeed } = this.props;
        return (marketFeed.map(post => <Poster key={post._id} post={post}/>)).reverse();
    }
}

MarketFeed.propTypes = {
    marketFeed: PropTypes.array.isRequired
};

export default MarketFeed;