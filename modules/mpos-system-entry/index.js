/** @format */

import { AppModule } from '@bindo/rn-framework';
import appSidebar from './App';
import appSideBaronfig, { name as sideBarName } from './package.json';


AppModule.registerAppModule(sideBarName, () => appSidebar, appSideBaronfig);

