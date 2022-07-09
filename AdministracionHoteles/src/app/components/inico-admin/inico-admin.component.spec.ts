import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicoAdminComponent } from './inico-admin.component';

describe('InicoAdminComponent', () => {
  let component: InicoAdminComponent;
  let fixture: ComponentFixture<InicoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
