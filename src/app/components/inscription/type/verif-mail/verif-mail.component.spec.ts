import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifMailComponent } from './verif-mail.component';

describe('VerifMailComponent', () => {
  let component: VerifMailComponent;
  let fixture: ComponentFixture<VerifMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
