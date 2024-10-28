import { Model } from '@nozbe/watermelondb'
import {field, text} from "@nozbe/watermelondb/decorators"

export default class Category extends Model {
  static table = 'categories'
  
  @field('id') id;
  @text('title') title;
  @text('icon') icon;
  @field('color') color;
  @field('type') type;
}