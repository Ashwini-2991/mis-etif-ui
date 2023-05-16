import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadSheetDetailComponent } from './spread-sheet-detail.component';

describe('SpreadSheetDetailComponent', () => {
    let component: SpreadSheetDetailComponent;
    let fixture: ComponentFixture<SpreadSheetDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpreadSheetDetailComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpreadSheetDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
