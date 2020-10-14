import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeconComponent } from './lecon.component';

describe('LeconComponent', () => {
  let component: LeconComponent;
  let fixture: ComponentFixture<LeconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
