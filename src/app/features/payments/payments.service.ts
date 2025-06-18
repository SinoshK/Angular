import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Transaction } from "../../transaction.model";

@Injectable()
export class PaymentsService {
  private http = inject(HttpClient);

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(
      "http://localhost:3000/transactions",
      transaction
    );
  }
}
