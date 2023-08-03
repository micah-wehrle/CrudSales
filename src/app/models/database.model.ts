export class DatabaseResponse {
  readonly dataEntries: DatabaseEntry[];

  constructor(response: any) {
    try {
      if (response && Array.isArray(response)) {
        this.dataEntries = response;
      }
      else {
        this.dataEntries = [];
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  public appendEntry(entry: DatabaseEntry): DatabaseEntry[] {
    return [...this.dataEntries, entry];
  }

  public getEntries(): DatabaseEntry[] {
    return this.dataEntries.slice();
  }

  public removeEntry(entry: DatabaseEntry): DatabaseEntry[] {
    const output = this.getEntries();
    for (let i = 0; i < this.dataEntries.length; i++) {
      if (entry === this.dataEntries[i]) {
        output.splice(i, 1);
        break;
      }
    }
    
    return output;
  }
}

export type DatabaseEntry = {
  name: string;
  cost: string;
  desc: string;
}