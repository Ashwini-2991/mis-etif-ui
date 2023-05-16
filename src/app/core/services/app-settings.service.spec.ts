import { TestBed } from '@angular/core/testing';
import { TestModule } from '@test/test.module';
import { AppSettingsService } from './app-settings.service';

describe('AppSettingsService', () => {
    let service: AppSettingsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(AppSettingsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
