import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild
} from '@angular/core'
import { ThemePalette } from '@angular/material'
import { Observable, Subscription } from 'rxjs'

import { SearchInputComponent } from './search-input/search-input.component'

import { AppBarService } from './app-bar.service'
import { Search, NavigationAction } from './model'

@Component({
  selector: 'mel-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit, OnDestroy {
  @Input() color: ThemePalette = undefined

  @Output() navigate = new EventEmitter<NavigationAction>()

  @ViewChild('search', { static: false }) set search(
    input: SearchInputComponent | null
  ) {
    if (!input) return
    input.focus()
  }

  constructor(private appBar: AppBarService) {}

  ngOnInit() {
    this.search$ = this.appBar.search$
    this.subscription = this.appBar.navigate$.subscribe(action =>
      this.navigate.emit(action)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onClose(event: Event) {
    event.stopPropagation()
  }

  onSearch(term: string) {
    this.appBar.search(term)
  }

  search$: Observable<Search>
  private subscription: Subscription
}
