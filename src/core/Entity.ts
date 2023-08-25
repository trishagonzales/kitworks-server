import { omit } from 'lodash';
import { v4 } from 'uuid';

export default class Entity<Props extends { id: string }> {
  private readonly _id: string;
  protected _props: Omit<Props, 'id'>;

  constructor(props: Props) {
    this._id = props.id;
    this._props = omit(props, 'id');
  }

  protected static generateId() {
    return v4();
  }

  get id() {
    return this._id;
  }
}
