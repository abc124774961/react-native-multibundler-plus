/** @format */

import { AppModule } from '@bindo/rn-framework';
import appShopping from './App';
import appShoppingConfig, { name as shoppingName } from './package.json';


AppModule.registerModule(shoppingName, () => appShopping, appShoppingConfig);

