import { Component, OnInit } from "@angular/core";
import {
  RouterLink,
  RouterOutlet,
  ActivatedRoute,
  NavigationEnd,
  Router,
} from "@angular/router";
import { filter } from "rxjs/operators";
import { TitleService } from "./services/title.service";

@Component({
  selector: "app-shell",
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex h-screen">
      <aside class="w-48 bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li>
              <a routerLink="ovierview">Overview</a>
            </li>
            <li><a routerLink="history">History</a></li>
            <li>
              <a routerLink="payments">Payments</a>
            </li>
          </ul>
        </nav>
      </aside>
      <div class="flex flex-col flex-1">
        <header class="bg-gray-700 text-white p-4">
          <h1>{{ title() }}</h1>
        </header>
        <main class="flex-1 p-4">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [],
})
export class ShellComponent {
  title!: () => string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.title = this.titleService.title;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        const title = route.snapshot.data["title"] || "Bank App";
        this.titleService.setTitle(title);
      });
  }
}
