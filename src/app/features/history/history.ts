import { Component, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HistoryService } from "./history.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-history",
  providers: [HistoryService],
  imports: [MatProgressSpinnerModule, CommonModule],
  template: `
    <div class="p-4">
      @if (!history()) {
      <div class="flex justify-center items-center">
        <div
          class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"
        ></div>
      </div>
      }

      <!-- Tabela z danymi -->
      @if (history()) {
      <div class="overflow-x-auto">
        <table class="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-4 py-2 text-left">Tytuł</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Data</th>
              <th class="border border-gray-300 px-4 py-2 text-left">
                Kategoria
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left">Kwota</th>
            </tr>
          </thead>
          <tbody>
            @for (transaction of history(); track transaction.id) {
            <tr class="hover:bg-gray-100">
              <td class="border border-gray-300 px-4 py-2">
                {{ transaction.title }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ transaction.date | date : "dd-MM-yyyy" }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ transaction.category }}
              </td>
              <td
                class="border border-gray-300 px-4 py-2"
                [style.color]="transaction.type === 'Income' ? 'green' : 'red'"
              >
                {{ transaction.type === "Income" ? "+" : "-" }}
                {{ transaction.amount / 100 | number : "1.2-2" }}
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
      }
    </div>
  `,
})
export class History {
  service = inject(HistoryService);
  history = this.service.history;
}
