import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DefaultContent } from '../content';
import { ContentModel } from '../models/ContentModel';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private _content: ContentModel = DefaultContent;
  private _activeTabIndexSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  get content(): ContentModel {
    return this._content;
  }
  set content(value: ContentModel) {
      this._content = value;
  }

  get activeTabIndexSubject(): BehaviorSubject<number> {
    return this._activeTabIndexSubject;
  }
  set activeTabIndexSubjectValue(value: number) {
      this._activeTabIndexSubject.next(value);
  }
}
