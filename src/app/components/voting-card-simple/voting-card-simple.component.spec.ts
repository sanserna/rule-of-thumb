import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingCardSimpleComponent } from './voting-card-simple.component';

describe('VotingCardSimpleComponent', () => {
  let component: VotingCardSimpleComponent;
  let fixture: ComponentFixture<VotingCardSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingCardSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingCardSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
