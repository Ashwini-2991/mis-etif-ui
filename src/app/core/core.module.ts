import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BlueNgModule } from '@moodys/blue-ng';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AUTH_ADD_BEARER_TO_REQUEST_FILTER, AUTH_CONFIG } from '@moodys/emtn-ng/auth';
import { AppSettingsService } from './services/app-settings.service';
import { APP_CONFIG_TOKEN } from '@moodys/emtn-ng';
import { ANALYTICS_CONFIG } from '@moodys/emtn-ng/analytics';
import { FEATURE_CONFIG } from '@moodys/emtn-ng/feature-flag';

@NgModule({
    declarations: [FooterComponent, HeaderComponent],
    imports: [
        BlueNgModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        {
            provide: AUTH_CONFIG,
            useFactory: (appSettingsService: AppSettingsService) => ({
                oktaOptions: {
                    ...appSettingsService.settings.auth.oktaOptions,
                    redirectUri: `${window.location.origin}/implicit/callback`
                }
            }),
            deps: [AppSettingsService]
        },
        {
            provide: AUTH_ADD_BEARER_TO_REQUEST_FILTER,
            deps: [APP_CONFIG_TOKEN],
            useFactory: () => () => true
        },
        {
            provide: ANALYTICS_CONFIG,
            useFactory: (appSettingsService: AppSettingsService) => appSettingsService.settings.analytics,
            deps: [AppSettingsService]
        },
        {
            provide: FEATURE_CONFIG,
            deps: [AppSettingsService],
            useFactory: (appSettingsService: AppSettingsService) => {
                return appSettingsService.settings.featureFlag;
            }
        }
    ],
    exports: [FooterComponent, HeaderComponent, TranslateModule]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() coreModule?: CoreModule) {
        if (coreModule) {
            throw new Error('CoreModule is already loaded. It should only be imported once in the root module.');
        }
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule
        };
    }
}
