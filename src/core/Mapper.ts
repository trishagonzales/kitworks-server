export class Mapper {
  static convertNullsToUndefined(list: unknown[]) {
    return list.map((item) => (item === null ? undefined : item));
  }

  static convertUndefinedToNulls(list: unknown[]) {
    return list.map((item) => (item === undefined ? null : item));
  }
}
