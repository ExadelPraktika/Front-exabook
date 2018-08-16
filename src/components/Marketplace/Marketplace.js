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
  }
  render() {
        const { marketFeed, loading } = this.props.market;
        let marketContent;
        if(marketFeed === null || loading){
            marketContent = null;
        }
        else
            marketContent = <MarketFeed marketFeed={marketFeed} />;
        return (
            <Grid container spacing = {16}>
                <MarketTab/>
                    <Grid container spacing = {8} >
                        {marketContent}
                    </Grid>
            </Grid>
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