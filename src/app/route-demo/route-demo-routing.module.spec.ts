import { TestBed } from '@angular/core/testing';
import { RouteDemoRoutingModule } from './route-demo-routing.module';

describe('RouteDemoRoutingModule', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouteDemoRoutingModule]
        });
    });

    it('should exist', () => {
        expect(RouteDemoRoutingModule).toBeDefined();
    });
});
