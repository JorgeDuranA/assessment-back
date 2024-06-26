export class BaseModel {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  toString(): string {
    return null;
  }

  // public setId(id: number): void {
  //   const self = this as Writeable<BaseModel>;
  //   self.id = id;
  // }

  /**
   * Set values for class propierties
   */
  public setProps(props: any): void {
    for (const x in props) {
      if (x && !x.startsWith('__has')) {
        this[x.replace(/_/g, '')] = props[x];
        const fName = this.getDynamicFunctionName(x);
        if (this[fName]) {
          this[fName](props[x]);
        }
      }
    }
  }
  private getDynamicFunctionName(str: string) {
    str = `set_${str}`;
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
        return chr.toUpperCase();
      });
  }

  public serialize(): object {
    const data: any = {};
    for (const x in this) {
      const atr: any = this[x];
      if (x == 'id' || x === 'updatedAt' || x === 'createdAt') {
        data[x] = atr?.toString();
      } else {
        data[x] = this[x];
      }
    }
    return data;
  }

  // public setCreatedAt(value: Date): void {
  //   const self = this as Writeable<BaseModel>;
  //   self.created_at = value;
  // }

  // public setUpdatedAt(value: Date): void {
  //   const self = this as Writeable<BaseModel>;
  //   self.updated_at = value;
  // }
}
