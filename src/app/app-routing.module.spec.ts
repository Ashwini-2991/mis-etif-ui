import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule, routes } from './app-routing.module';
import { APP_BASE_HREF, Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestModule } from '@test/test.module';
import { HeaderComponent } from './core/components/header.component';
import { FooterComponent } from './core/components/footer.component';

describe('AppRoutingModule', () => {
    let location: Location;
    let router: Router;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppRoutingModule, RouterTestingModule.withRoutes(routes), TestModule],
            declarations: [AppComponent, HeaderComponent, FooterComponent],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        });

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);

        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    it('should exist', () => {
        expect(AppRoutingModule).toBeDefined();
    });

    it('should navigate to lazy home module', () => {
        router.navigate(['']);
        fixture.detectChanges();
        expect(location.path()).toBe('');
    });
});
