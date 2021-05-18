import {AppRegistry} from 'react-native';
import { AppModule } from '@bindo/rn-framework';
/** @format */

import { } from '@bindo/rn-framework';
import appShopping from './modules/mpos-shopping/App';
import appShoppingConfig, { name as shoppingName } from './modules/mpos-shopping/package.json';


AppModule.registerModule(shoppingName, () => appShopping, appShoppingConfig);

/** @format */

import { } from '@bindo/rn-framework';
import appSidebar from './modules/mpos-system-entry/App';
import appSideBaronfig, { name as sideBarName } from './modules/mpos-system-entry/package.json';


AppModule.registerAppModule(sideBarName, () => appSidebar, appSideBaronfig);

/** @format */

import { } from '@bindo/rn-framework';
import appKisok from './modules/kiosk-system-entry/App';
import appKioskConfig, { name as kioskName } from './modules/kiosk-system-entry/package.json';

AppModule.registerModule(kioskName, () => appKisok, appKioskConfig);

/** @format */

import { } from '@bindo/rn-framework';
import appSettings from './modules/settings/App';
import appSettingsConfig, { name as SettingsName } from './modules/settings/package.json';


AppModule.registerModule(SettingsName, () => appSettings, appSettingsConfig);

