export interface DataObjectValue {
  value: Date | string;

  toDate(): Date;
  toString(): string;
}


export class Data implements DataObjectValue {
  readonly value: Date | string;

  constructor(value: Date | string) {
    this.value = value;
  }

  toDate(): Date {
    if (typeof this.value === 'string') {
      return new Date(this.value);
    } else {
      return this.value;
    }
  }

  toString(): string {
    if (typeof this.value === 'string') {
      return this.value;
    } else {
      return this.value.toISOString();
    }
  }
}