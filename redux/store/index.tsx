// store.ts
import {createStore} from 'redux';

interface Category {
  name: string;
  subcategories: string[];
  img: any;
}

interface RootState {
  categories: Category[];
}

const initialState: RootState = {
  categories: [
    {
      name: 'Fresh Vegetables',
      subcategories: [{name: 'Tomatoes'}, {name: 'Spinach'}, {name: 'Onions'}],
      img:require('../../assets/cabbage.png'),
    },
    {
      name: 'Diet Food',
      subcategories: [{name:'Quinoa'}, {name:'Oats'}],
      img: require('../../assets/brinjal.png'),
    },
    {
      name: 'Healthy Food',
      subcategories: [{name:'Boiled Eggs'}, {name:'Whole Wheat'}],
      img: require('../../assets/avocado.png'),
    },
    {
      name: 'Fast Food Items',
      subcategories: [{name:'Sandwich'}, {name:'Burger'},{name: 'Tacos'}, {name:'Pizza'}],
      img: require('../../assets/sandwich.png'),
    },
    {
      name: 'Juicy Fruits',
      subcategories: [{name:'Watermelon'}, {name:'Grapes'}, {name:'Berries'}],
      img: require('../../assets/watermelon.png'),
    },
  ],
};

const rootReducer = (state: RootState = initialState, action: any) => {
  
  return state;
};


const store = createStore(rootReducer);

export default store;
