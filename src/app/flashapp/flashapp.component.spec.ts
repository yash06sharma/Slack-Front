import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashappComponent } from './flashapp.component';

describe('FlashappComponent', () => {
  let component: FlashappComponent;
  let fixture: ComponentFixture<FlashappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
