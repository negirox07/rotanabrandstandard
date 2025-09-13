import * as jQuery from 'jquery';
export class Utility {
  public static GetIdFromString(objId: string): number {
    if (objId === undefined && objId.length === 0) {
      return 0;
    }
    else {
      const splitStrings = objId.split('_');
      const appId = splitStrings[splitStrings.length - 1];
      return !isNaN(parseInt(appId)) ? parseInt(appId) : 0;
    }
  }
  public static GetUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  public static setFullWidth(dynamicId: string): void {
    const element = jQuery("#" + dynamicId);
    if (element.length > 0) {
      element.parentsUntil(".Canvas.grid").removeAttr("class");
    }
    else {
      setTimeout(this.setFullWidth, 500);
    }
  }
  public static sortArray(arr: any[], property: string): any[] {
    const arrayCopy = arr.slice(0);
    arrayCopy.sort(function (a, b) {
      if (isNaN(a[property]) && isNaN(b[property])) {
        const x = a[property]?.toLowerCase();
        const y = b[property]?.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      }
      else {
        const x = a[property];
        const y = b[property];
        return x < y ? -1 : x > y ? 1 : 0;
      }
    });
    return arrayCopy;
  }

  public static getQueryParams(url: string): Record<string, string> {
    const params = new URL(url).searchParams;
    const queryObj: Record<string, string> = {};
    params.forEach((value, key) => {
      queryObj[key] = value;
    });

    return queryObj;
  }

  public static formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);
    return formattedDate;
  }

}