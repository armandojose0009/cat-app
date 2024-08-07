import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedTableComponent } from './breed-table.component';

describe('BreedTableComponent', () => {
  let component: BreedTableComponent;
  let fixture: ComponentFixture<BreedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
