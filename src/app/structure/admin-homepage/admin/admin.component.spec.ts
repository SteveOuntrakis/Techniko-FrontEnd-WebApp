import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [AdminService, provideHttpClient(), provideHttpClientTesting() ] 
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create ', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.createAdminForm).toBeTruthy();
    const form = component.createAdminForm;

    expect(form.get('username')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
  });

  it('should validate form fields', () => {
    const username = fixture.debugElement.query(By.css('input[formControlName="username"]')).nativeElement;
    const email = fixture.debugElement.query(By.css('input[formControlName="email"]')).nativeElement;
    const password = fixture.debugElement.query(By.css('input[formControlName="password"]')).nativeElement;

    expect(username.value).toBe('');
    expect(email.value).toBe('');
    expect(password.value).toBe('');

    expect(component.createAdminForm.valid).toBeFalsy();
  });

  it('should display validation error for username if touched and invalid', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[formControlName="username"]')).nativeElement;
    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    const usernameError = fixture.debugElement.query(By.css('.text-danger')).nativeElement;
    expect(usernameError).toBeTruthy();
    expect(usernameError.innerHTML).toContain('Username is required');
  });
});
