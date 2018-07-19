import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import Grid from "@material-ui/core/Grid";
import Poster from './Poster';
import MarketForm from "./MarketForm";
import MarketSearchForm from "./MarketSearchForm";
import { addMarketPost } from '../../actions/marketActions';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MarketFeed from "./MarketFeed";


class Marketplace extends Component {

    render() {
        const { marketFeed } = this.props.market;
        return (
            <div>
                <MarketForm/>
                <MarketSearchForm/>
                <Grid style={{ marginLeft: 120}} container spacing = {16}>
                    <MarketFeed posts={marketFeed}/>
                </Grid>
            </div>
        )
    }
}
Marketplace.propTypes = {
    market: PropTypes.object.isRequired,
    addMarketPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    market: state.market,
    auth: state.auth
});

export default connect(mapStateToProps, {addMarketPost})(Marketplace);