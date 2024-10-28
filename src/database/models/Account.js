import { Model } from '@nozbe/watermelondb'
import {field, text} from "@nozbe/watermelondb/decorators"

export default class Account extends Model {
  static table = 'accounts'
  
  @field('id') id;
  @text('title') title;
  @text('icon') icon;
  @field('color') color;
  @field('type') type;
}