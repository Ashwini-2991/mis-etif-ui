import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestModule } from '@test/test.module';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './core/components/header.component';
import { FooterComponent } from './core/components/footer.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [AppComponent, HeaderComponent, FooterComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should default to en when no language is provided', () => {
        const translateService = TestBed.inject(TranslateService);
        spyOn(translateService, 'getBrowserLang').and.returnValue(undefined);
        TestBed.createComponent(AppComponent);
        expect(translateService.getDefaultLang()).toBe('en');
    });
});
