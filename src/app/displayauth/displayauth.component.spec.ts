import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayauthComponent } from './displayauth.component';

describe('DisplayauthComponent', () => {
  let component: DisplayauthComponent;
  let fixture: ComponentFixture<DisplayauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
