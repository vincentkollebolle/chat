import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSplashscreenComponent } from './chat-splashscreen.component';

describe('ChatSplashscreenComponent', () => {
  let component: ChatSplashscreenComponent;
  let fixture: ComponentFixture<ChatSplashscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSplashscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSplashscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
