import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import Grid from "@material-ui/core/Grid";
import MarketFeed from "./MarketFeed";
import { getMarketPosts, createPost } from "../../actions/marketActions";
import MarketTab from './MarketTab';

class Marketplace extends Component {

  componentDidMount(){
    this.props.getMarketPosts();
    console.log('got market posts');
  }
  render() {
        const { marketFeed, loading } = this.props.market;
        let marketContent;
        if(marketFeed === null || loading){
            marketContent = null;
        }
        else
            marketContent = <MarketFeed marketFeed={marketFeed}/>;
        return (
            <div>
                <MarketTab/>
                    <Grid container spacing = {16}>
                        {marketContent}
                    </Grid>
            </div>
        )
  }
}
Marketplace.propTypes = {
    market: PropTypes.object.isRequired,
    getMarketPosts: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    market: state.market,
});

export default connect(mapStateToProps, { getMarketPosts, createPost })(Marketplace);