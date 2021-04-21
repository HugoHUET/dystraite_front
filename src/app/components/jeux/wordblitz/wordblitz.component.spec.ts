import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordblitzComponent } from './wordblitz.component';

describe('WordblitzComponent', () => {
  let component: WordblitzComponent;
  let fixture: ComponentFixture<WordblitzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordblitzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordblitzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
