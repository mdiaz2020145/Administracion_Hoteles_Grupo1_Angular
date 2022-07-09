import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicoUsuarioComponent } from './inico-usuario.component';

describe('InicoUsuarioComponent', () => {
  let component: InicoUsuarioComponent;
  let fixture: ComponentFixture<InicoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
