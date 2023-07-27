import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniWideDataCardComponent } from './uni-wide-data-card.component';

describe('UniWideDataCardComponent', () => {
  let component: UniWideDataCardComponent;
  let fixture: ComponentFixture<UniWideDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniWideDataCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniWideDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
