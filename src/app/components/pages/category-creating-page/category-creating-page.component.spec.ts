import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreatingPageComponent } from './category-creating-page.component';

describe('CategoryCreatingPageComponent', () => {
  let component: CategoryCreatingPageComponent;
  let fixture: ComponentFixture<CategoryCreatingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCreatingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCreatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
