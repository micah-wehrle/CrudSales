import { Component, Input, OnInit } from '@angular/core';
import { DatabaseEntry } from 'src/app/models/database.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-database-entries',
  templateUrl: './database-entries.component.html',
  styleUrls: ['./database-entries.component.scss']
})
export class DatabaseEntriesComponent implements OnInit {
  public currentEntry: number = 0;
  public totalEntries: number = 0;

  public entryArray: DatabaseEntry[] = [];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.call();
    this.databaseService.getLoading().subscribe({
      next: (loading: boolean) => {
        if (!loading && this.databaseService.hasSuccessfullyCompleted()) {
          this.entryArray = this.databaseService.getResults().getEntries();
          this.currentEntry = 1;
          this.totalEntries = this.entryArray.length;
        }
      }
    });
  }

  onNextEntry(): void {
    this.currentEntry++;
    if (this.currentEntry > this.totalEntries) {
      this.currentEntry = 1;
    }
  }

  onPrevEntry(): void {
    this.currentEntry--;
    if (this.currentEntry < 1) {
      this.currentEntry = this.totalEntries;
    }
  }

  onDelete(): void {
    this.databaseService.delete(this.entryArray[this.currentEntry-1]);
  }

  public databaseIsPopulated(): boolean {
    return this.entryArray && Array.isArray(this.entryArray) && this.entryArray.length > 0;
  }

}
