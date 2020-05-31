import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionFindComponent } from './union-find.component';

describe('UnionFindComponent', () => {
  let component: UnionFindComponent;
  let fixture: ComponentFixture<UnionFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnionFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnionFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
