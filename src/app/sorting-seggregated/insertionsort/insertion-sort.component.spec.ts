import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionSortComponent } from './insertion-sort.component';

describe('InsertionsortComponent', () => {
  let component: InsertionSortComponent;
  let fixture: ComponentFixture<InsertionSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertionSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
