"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
class Data {
    constructor(value) {
        this.value = value;
    }
    toDate() {
        if (typeof this.value === 'string') {
            return new Date(this.value);
        }
        else {
            return this.value;
        }
    }
    toString() {
        if (typeof this.value === 'string') {
            return this.value;
        }
        else {
            return this.value.toISOString();
        }
    }
}
exports.Data = Data;
