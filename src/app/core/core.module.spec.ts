import { TestBed } from '@angular/core/testing';
import { CoreModule } from './core.module';
import { AUTH_ADD_BEARER_TO_REQUEST_FILTER, AUTH_CONFIG } from '@moodys/emtn-ng/auth';
import { APP_CONFIG_TOKEN, APP_SETTINGS_TOKEN } from '@moodys/emtn-ng';
import { ANALYTICS_CONFIG } from '@moodys/emtn-ng/analytics';
import { FEATURE_CONFIG } from '@moodys/emtn-ng/feature-flag';
import { mockAppSettings } from '@test/mocks/mock-app-settings';
import { APP_CONFIG } from '../config';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';

describe('CoreModule', () => {
    it('should exist', () => {
        TestBed.configureTestingModule({
            imports: [CoreModule]
        });

        expect(CoreModule).toBeDefined();
    });

    it('can inject for root', () => {
        TestBed.configureTestingModule({
            imports: [CoreModule.forRoot()]
        });

        expect(CoreModule).toBeDefined();
    });

    it('should throw exception if CoreModule already created', () => {
        try {
            new CoreModule(new CoreModule());
            expect(false).toBe(true);
        } catch {
            expect(true).toBe(true);
        }
    });

    describe('should initialize providers', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoreModule, HttpClientTestingModule],
                providers: [
                    {
                        provide: APP_SETTINGS_TOKEN,
                        useValue: mockAppSettings
                    },
                    {
                        provide: APP_CONFIG_TOKEN,
                        useValue: APP_CONFIG
                    }
                ]
            });
        });

        it('should initialize AUTH_CONFIG', () => {
            const authConfig = TestBed.inject(AUTH_CONFIG);
            expect(authConfig).toBeDefined();
        });

        it('should initialize AUTH_ADD_BEARER_TO_REQUEST_FILTER', () => {
            const authFilter = TestBed.inject(AUTH_ADD_BEARER_TO_REQUEST_FILTER);
            expect(typeof authFilter).toBe('function');
            expect(authFilter(new HttpRequest<unknown>('GET', ''))).toBeTrue();
        });

        it('should initialize ANALYTICS_CONFIG', () => {
            const analyticsConfig = TestBed.inject(ANALYTICS_CONFIG);
            expect(analyticsConfig).toBeDefined();
        });

        it('should initialize FEATURE_CONFIG', () => {
            const featureConfig = TestBed.inject(FEATURE_CONFIG);
            expect(featureConfig).toBeDefined();
        });

        it('should initialize TranslateService', () => {
            const translateService = TestBed.inject(TranslateService);
            expect(translateService).toBeDefined();
        });
    });
});
