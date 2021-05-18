/** @format */

import { AppModule } from '@bindo/rn-framework';
import appKisok from './App';
import appKioskConfig, { name as kioskName } from './package.json';

AppModule.registerModule(kioskName, () => appKisok, appKioskConfig);

