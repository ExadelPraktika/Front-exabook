import { CREATE_MARKET_POST } from '../actions/types';

const initialState = {
    marketFeed: [
        {
            name: 'Nick Hompton',
            avatar: "https://api.adorable.io/avatars/50/abott@adorable.png",
            category: '',
            description: 'Add rice and stir very gently to distribute. Top with artichokes and peppers, and\n' +
            'cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.\n' +
            'Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into\n' +
            'the rice, and cook again without stirring, until mussels have opened and rice is\n' +
            'just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)',

            title: 'Selling stuff',
            timePosted: 'January 14, 2018',
            descriptionOpened: false,
            comments: false,
            rating: '',
            anchorEl: null,
            images: [
                'http://kb4images.com//images/image/37185176-image.jpg',
                'http://kb4images.com//images/anime/36769098-anime.jpg',
                'http://kb4images.com//images/yamaha-r1-wallpaper/36082550-yamaha-r1-wallpaper.jpg'
            ],
            activeStep: 0,
        }
    ],
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_MARKET_POST:
            return {
                marketFeed: [action.payload, ...state.marketFeed]
            };
        default:
            return state;
    }
}