import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { bootstrapConfigLoader } from '@moodys/emtn-ng';
import { APP_CONFIG } from './app/config';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(
    'Mgo+DSMBaFt+QHJqVk1mQ1ZbdF9AXnNOdFF0T2Jbby8Nf1dGYl9RQXZXQlphTXxRdUdkXw==;Mgo+DSMBPh8sVXJ1S0R+X1pCaVhdX2NLfUNxT2FbdV9yZCQ7a15RRnVfR11rSXlRckdhWntcdg==;ORg4AjUWIQA/Gnt2VFhiQlJPcEBFQmFJfFBmQmlbfVRxdkU3HVdTRHRcQlhjQX5UdEFhW3xbd3I=;MTk2NDk4OUAzMjMxMmUzMjJlMzNFTlhDelN1MnZSSUVjaG96dVJFZFgxelRHWExoLzF4ZlNXaWtqVlZyUllnPQ==;MTk2NDk5MEAzMjMxMmUzMjJlMzNnY1lLb29TR3J1ak0vdVpyREpBZEN6L2d5Nm9hM0c0SEl1VUlSTk04NVdzPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfVldWnxLflF1VWRTfVx6dVdWESFaRnZdQV1mSXZTcUdnW31acnZT;MTk2NDk5MkAzMjMxMmUzMjJlMzNKdzQ3RU8zbWpYbzlBWUE4MEExSjhWWmxGM2hGNlNvL2JNNkZNTjlNRWJzPQ==;MTk2NDk5M0AzMjMxMmUzMjJlMzNDN3Npc3VZYU82eUpOLytmUzAwb0lpUnlpZzhRS29FUjRGZVJjTjlFR01JPQ==;Mgo+DSMBMAY9C3t2VFhiQlJPcEBFQmFJfFBmQmlbfVRxdkU3HVdTRHRcQlhjQX5UdEFhW3pfdHI=;MTk2NDk5NUAzMjMxMmUzMjJlMzNXRzAxZ3ViWUdYZUJocjg3UU9JY3dxRHBmMElFdTNpcExXaEhVRklQTFprPQ==;MTk2NDk5NkAzMjMxMmUzMjJlMzNRdWRBSUl4cUw5ZW80aytmMHhWTGRLVUV0MDVhQ0pSZ2hEamJYQjFpeDhBPQ==;MTk2NDk5N0AzMjMxMmUzMjJlMzNKdzQ3RU8zbWpYbzlBWUE4MEExSjhWWmxGM2hGNlNvL2JNNkZNTjlNRWJzPQ=='
);

if (environment.production) {
    enableProdMode();
}

bootstrapConfigLoader(APP_CONFIG.appSettingsUrl, APP_CONFIG, (configProviders) => {
    platformBrowserDynamic([...configProviders])
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err));
});
