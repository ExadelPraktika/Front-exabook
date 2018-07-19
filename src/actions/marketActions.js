import axios from 'axios';

import {
    CREATE_MARKET_POST,
} from './types';

// Add market post
export const addMarketPost = postData => dispatch => {
    axios
        .post('http://localhost:3001/marketplace/', postData)
        .then(res =>
            dispatch({
                type: CREATE_MARKET_POST,
                payload: res.data
            })
        );
};

