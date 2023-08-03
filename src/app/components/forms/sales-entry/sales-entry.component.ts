import { Component, OnInit } from '@angular/core';
import { DatabaseEntry } from 'src/app/models/database.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sales-entry',
  templateUrl: './sales-entry.component.html',
  styleUrls: ['./sales-entry.component.scss']
})
export class SalesEntryComponent implements OnInit {
  public usersName: string;
  public itemCost: string;
  public itemDescription: string;

  public waitingOnDB: boolean = false;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.waitingOnDB) {
      this.waitingOnDB = true;
      this.databaseService.put({
        name: this.usersName,
        cost: this.itemCost,
        desc: this.itemDescription,
      });
      this.databaseService.getLoading().subscribe({
        next: (loading: boolean) => {
          if (!loading) {
            this.waitingOnDB = false;
            if (this.databaseService.hasSuccessfullyCompleted()) {
              this.usersName = '';
              this.itemCost = '';
              this.itemDescription = '';
            }
          }
        }
      });
    }
  }

}
