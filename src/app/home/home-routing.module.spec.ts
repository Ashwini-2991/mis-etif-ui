import { TestBed } from '@angular/core/testing';
import { HomeRoutingModule } from './home-routing.module';

describe('HomeRoutingModule', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HomeRoutingModule]
        });
    });

    it('should exist', () => {
        expect(HomeRoutingModule).toBeDefined();
    });
});
