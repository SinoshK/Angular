import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "overview",
    loadComponent: () =>
      import("./overview/overview").then((m) => m.OverviewComponent),
    data: { title: "Overview" },
  },
  {
    path: "history",
    loadComponent: () => import("./history/history").then((m) => m.History),
    data: { title: "History" },
  },
  {
    path: "payments",
    loadComponent: () =>
      import("./payments/payments").then((m) => m.PaymentsComponent),
    data: { title: "Payments" },
  },
  {
    path: "**",
    redirectTo: "overview",
  },
];
