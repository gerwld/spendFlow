import { Model } from '@nozbe/watermelondb'
import {field, text} from "@nozbe/watermelondb/decorators"

export default class Operation extends Model {
  static table = 'operations'
  
  @field('id') id;
  @text('title') title;
  @field('categoryID') categoryID;
  @field('accountID') accountID;
  @field('value') value;
  @field('currency') currency;
  @field('type') type;
  @field('timestamp') timestamp;
}