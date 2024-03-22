import aluminiumPlant from './assets/aluminium-plant.jpg';
import cleistoCactus from './assets/cleistocactus.jpg';
import moneyPlant from './assets/money-plant.jpg';
import oldLadyCactus from './assets/old-lady-cactus.jpg';
import secullant from './assets/secullant.jpg';
import soilLotus from './assets/soil-lotus.jpg';

const products = [
  {
    src: aluminiumPlant,
    category: 'Plants',
    name: 'Aluminium Plant',
    price: 45,
    sale: 35,
  },
  {
    src: cleistoCactus,
    category: 'Cactus',
    name: 'cleisto cactus',
    price: 28,
    sale: null
  },
  {
    src: soilLotus,
    category: 'Plants',
    name: 'Green Soil Lotus',
    price: 54,
    sale: null
  },
  {
    src: secullant,
    category: 'Plants',
    name: 'Boncellensis Secullant',
    price: 34,
    sale: 29
  },
  {
    src: oldLadyCactus,
    category: 'Cactus',
    name: 'Old Lady Cactus',
    price: 15,
    sale: 8
  },
  {
    src: moneyPlant,
    category: 'Plants',
    name: 'Money Plant',
    price: 23,
    sale: null
  }
]

export default products;