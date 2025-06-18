import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PaymentsService } from "./payments.service";
import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../../transaction.model";

@Component({
  selector: "app-payments",
  providers: [PaymentsService],
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Dodaj nową transakcję</h2>
      <form (ngSubmit)="addTransaction()" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium">Tytuł</label>
          <input
            id="title"
            [(ngModel)]="transaction.title"
            name="title"
            type="text"
            class="border border-gray-300 rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label for="date" class="block text-sm font-medium">Data</label>
          <input
            id="date"
            [(ngModel)]="transaction.date"
            name="date"
            type="date"
            class="border border-gray-300 rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label for="category" class="block text-sm font-medium"
            >Kategoria</label
          >
          <input
            id="category"
            [(ngModel)]="transaction.category"
            name="category"
            type="text"
            class="border border-gray-300 rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label for="amount" class="block text-sm font-medium"
            >Kwota (w groszach)</label
          >
          <input
            id="amount"
            [(ngModel)]="transaction.amount"
            name="amount"
            type="number"
            class="border border-gray-300 rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label for="type" class="block text-sm font-medium">Typ</label>
          <select
            id="type"
            [(ngModel)]="transaction.type"
            name="type"
            class="border border-gray-300 rounded px-2 py-1 w-full"
            required
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Dodaj transakcję
        </button>
      </form>
    </div>
  `,
})
export class PaymentsComponent {
  service = inject(PaymentsService);

  transaction: Transaction = {
    id: "",
    title: "",
    date: "",
    category: "Transfer",
    amount: 0,
    currency: "PLN",
    type: "Income",
  };

  addTransaction() {
    this.transaction.id = uuidv4();

    this.service.addTransaction(this.transaction).subscribe({
      next: () => {
        alert("Transakcja została dodana!");
        this.transaction = {
          id: "",
          title: "",
          date: "",
          category: "Transfer",
          amount: 0,
          currency: "PLN",
          type: "Income",
        };
      },
      error: (err) => {
        console.error("Błąd podczas dodawania transakcji:", err.message);
      },
    });
  }
}
