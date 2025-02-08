import { AfterViewInit, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceStateService } from '../../state/auth/auth-service-state.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateUser } from '../../state/auth/interface/auth.create';
import { CommonModule, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,HttpClientModule,NgIf,CommonModule ],
  providers:[AuthServiceStateService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit,AfterViewInit {

  constructor(private authService:AuthServiceStateService){}
  ngAfterViewInit(): void {
  }
  user = signal<CreateUser | null>(null);

   ngOnInit() {
    if(localStorage.getItem("userId") !== null) {
      this.authService.userId$.next(localStorage.getItem("userId")!);
      if(this.authService.userId$.value != null) {
        this.authService.getUser()
        this.user.set(this.authService.user$.value);

      }

    }

  }
}
