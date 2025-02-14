import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceStateService } from '../../state/auth/auth-service-state.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateUser } from '../../state/auth/interface/auth.create';
import { CommonModule, NgIf } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,HttpClientModule,NgIf,CommonModule,AvatarModule, OverlayBadgeModule,Menu ],
  providers:[AuthServiceStateService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit,AfterViewInit {
  items: MenuItem[] | undefined;
  constructor(private authService:AuthServiceStateService){}
  ngAfterViewInit(): void {
  }
  user = signal<CreateUser | null>(null);

   ngOnInit() {
      if(localStorage.getItem("userId") !== null) {
          this.authService.userId$.next(localStorage.getItem("userId")!);
          this.authService.getUser().then(user=>{
          this.user.set(user as CreateUser);
          this.items = [
            {
                label: 'Options',
                items: [
                    {
                        label: 'My Reservations',
                        icon: 'pi  pi-calendar-clock',
                        routerLink: ['/reservation'],
                        routerLinkActiveOptions: {
                          exact: true
                        }
                    },
                    {
                        label: 'Reports',
                        icon: 'pi  pi-book',
                        routerLink: ['/check'],
                        routerLinkActiveOptions: {
                          exact: true
                        }
                    }
                    ,
                    {
                        label: 'Settings',
                        icon: 'pi  pi-cog'
                    },
                    {
                        label: 'Log out',
                        icon: 'pi  pi-sign-out',
                        styleClass:"menuc-logout",
                        routerLink: ['/home'],
                        routerLinkActiveOptions: {
                          exact: true
                        },
                        command:()=>{
                          this.logout();
                        },
                        iconClass:"menuc-logout"
                    }
                ]
            }
        ];
      }).catch(e=>{
          console.error(e);
      })

    }

  }
  logout(){
    localStorage.removeItem("userId")
    this.user.set(null);
  }
}
