/** @format */

import { AppModule } from '@bindo/rn-framework';
import appSettings from './App';
import appSettingsConfig, { name as SettingsName } from './package.json';


AppModule.registerModule(SettingsName, () => appSettings, appSettingsConfig);

