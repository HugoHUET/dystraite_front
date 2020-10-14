import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthophonisteComponent } from './orthophoniste.component';

describe('OrthophonisteComponent', () => {
  let component: OrthophonisteComponent;
  let fixture: ComponentFixture<OrthophonisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthophonisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthophonisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
