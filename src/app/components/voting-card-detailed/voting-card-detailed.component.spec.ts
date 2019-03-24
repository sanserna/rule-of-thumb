import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingCardDetailedComponent } from './voting-card-detailed.component';

describe('VotingCardDetailedComponent', () => {
  let component: VotingCardDetailedComponent;
  let fixture: ComponentFixture<VotingCardDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingCardDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingCardDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
