import { Component, OnInit } from "@angular/core";
import { Item } from "./item";
import { ItemService } from "./item.service";
import { Router } from "@angular/router";
@Component({
  selector: "ns-items",
  moduleId: module.id,
  template: `    <ActionBar title="My App" class="action-bar">    </ActionBar>    <StackLayout class="page">        <ListView [items]="itemService.items | async" class="list-group">            <ng-template let-item="item">                <stack-layout (tap)="onItemTap(item)" orientation="horizontal" class="list-group-item">                    <image [src]="item.image" class="thumb img-rounded"></image>                    <stack-layout>                        <Label [text]="item.name" class="list-group-item"></Label>                        <label class="list-group-item-heading" [text]="item.title"></label>                    </stack-layout>                </stack-layout>            </ng-template>        </ListView>    </StackLayout>  `
})
export class ItemsComponent implements OnInit {
  items: Item[];
  constructor(private itemService: ItemService, private router: Router) {}
  ngOnInit(): void {
    this.itemService.fetchItems();
  }
  onItemTap(item) {
    this.itemService.selectedItem = item;
    this.router.navigate(["/item", 1]);
  }
}
