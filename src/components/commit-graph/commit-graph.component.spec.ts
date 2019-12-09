import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';

import { CommitGraphComponent } from './commit-graph.component';

describe('CommitGraphComponent', () => {
    let component: CommitGraphComponent;
    let fixture: ComponentFixture<CommitGraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommitGraphComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                ChartsModule
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommitGraphComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should have at least one week label', () => {
        component.getPastDates();
        fixture.detectChanges();

        const labelsArray = component.weeksLabels;
        expect(labelsArray.length).toBeGreaterThan(0);
    });

    it('should have exactly 24 week labels', () => {
        component.getPastDates();
        fixture.detectChanges();

        const labelsArray = component.weeksLabels;
        const numberOfLabels = 24;
        expect(labelsArray.length).toEqual(numberOfLabels);
    });
});