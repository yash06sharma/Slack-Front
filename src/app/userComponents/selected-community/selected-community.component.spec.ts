import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCommunityComponent } from './selected-community.component';

describe('SelectedCommunityComponent', () => {
  let component: SelectedCommunityComponent;
  let fixture: ComponentFixture<SelectedCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
