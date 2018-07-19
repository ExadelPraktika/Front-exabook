import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Poster from './Poster';

class MarketFeed extends Component {
    render() {
        const { posts } = this.props;
        return posts.map((post, index) => <Poster
                name={post.name}
                avatar={post.avatar}
                category={post.category}
                description={post.description}
                title={post.title}
                timePosted={post.timePosted}
                descriptionOpened={post.descriptionOpened}
                comments={post.comments}
                rating={post.rating}
                anchorEl={post.anchorEl}
                images={post.images}
                activeStep={post.activeStep}
        />
        )
    }
}

MarketFeed.propTypes = {
    posts: PropTypes.array.isRequired
};

export default MarketFeed;