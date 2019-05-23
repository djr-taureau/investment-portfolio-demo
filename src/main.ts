import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { Logger } from "./app/util/logger";
import { environment } from "./environments/environment";
import { AppVersion, VERSION } from "./version";

/**
 * The version for the application and Git hash.
 *
 * NOTE: Made this a public value so the underlying HTML template could access it as well.
 */
const appVersion: AppVersion = VERSION;

/**
 * Internal logger.
 */
const logger: Logger = Logger.getLogger("Bootstrap");
logger.debug(
  `constructor( Version: ${appVersion.version} || Git Hash: ${
    appVersion.hash
  } || ProdMode: ${environment.production} )`
);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
