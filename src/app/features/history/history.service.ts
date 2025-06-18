import { effect, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Transaction } from "../../transaction.model";
import { HistoryResponse } from "./model/historyResponse";

@Injectable()
export class HistoryService {
  private http = inject(HttpClient);

  #history = signal<Transaction[]>([]);

  e = effect(() => {
    this.getAll().subscribe({
      next: (response) => {
        this.#history.set(response);
      },
      error: (err) => {
        console.error("Błąd podczas pobierania danych:", err.message);
      },
    });
  });

  getAll() {
    return this.http.get<HistoryResponse>("http://localhost:3000/transactions");
  }

  history = this.#history.asReadonly();
}
