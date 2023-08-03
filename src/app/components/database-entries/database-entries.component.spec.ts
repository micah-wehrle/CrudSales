import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseEntriesComponent } from './database-entries.component';

describe('DatabaseEntriesComponent', () => {
  let component: DatabaseEntriesComponent;
  let fixture: ComponentFixture<DatabaseEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseEntriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
