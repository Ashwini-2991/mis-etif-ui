import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../app/shared/shared.module';
import { mockAppSettings } from './mocks/mock-app-settings';
import { EmtnAuthTestingModule } from '@moodys/emtn-ng/auth';
import { EmtnAnalyticsTestingModule } from '@moodys/emtn-ng/analytics';
import { EmtnFeatureFlagTestingModule } from '@moodys/emtn-ng/feature-flag';
import { APP_SETTINGS_TOKEN } from '@moodys/emtn-ng';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateFakeLoader
            }
        })
    ],
    exports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        EmtnAuthTestingModule,
        EmtnAnalyticsTestingModule,
        EmtnFeatureFlagTestingModule,
        SharedModule,
        TranslateModule
    ],
    providers: [
        {
            provide: APP_SETTINGS_TOKEN,
            useValue: mockAppSettings
        }
    ]
})
export class TestModule {}
