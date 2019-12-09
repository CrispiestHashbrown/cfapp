import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchPage } from './advanced-search';

describe('CommitGraphComponent', () => {
    let component: AdvancedSearchPage;
    let fixture: ComponentFixture<AdvancedSearchPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [ AdvancedSearchPage ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvancedSearchPage);
        component = fixture.componentInstance;
        component.fullQuery = '';
        component.searchQuery = '';
        component.inputArray = ['', '', '', '', ''];
        fixture.detectChanges();
    });

    // formSearchQuery() {
    //     this.fullQuery = this.searchQuery;
    //     for (var i = 0; i < 5; i++) {
    //       if (this.inputArray[i].length > 0 && this.inputArray[i] != 'Any') {
    //         this.fullQuery += ` ${this.queryArray[i]}:${this.inputArray[i]}`;
    //       }
    //     }
    // }

    // inputarray length = 0

    // inputarray = 'Any'

    // searchQuery = empty

    // searchQuery = not empty

    // expected full query

    // it('should have at least one week label', () => {
    //     component.searchQuery
    //     component.fullQuery
    //     component.inputArray

    //     component.getPastDates();
    //     fixture.detectChanges();

    //     const labelsArray = component.weeksLabels;
    //     expect(labelsArray.length).toBeGreaterThan(0);
    // });

    it('should pass', () => {
        expect(true).toBeTrue();
    });
});