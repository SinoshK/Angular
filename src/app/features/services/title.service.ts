import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TitleService {
  private titleSignal = signal<string>("Bank App");

  get title() {
    return this.titleSignal;
  }

  setTitle(newTitle: string) {
    this.titleSignal.set(newTitle);
  }
}
