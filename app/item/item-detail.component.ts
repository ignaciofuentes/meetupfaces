import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Item } from "./item";
import { ItemService } from "./item.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
@Component({
  selector: "ns-details",
  moduleId: module.id,
  template: `
  <ActionBar [title]='item.name' class='action-bar dark'></ActionBar>
  <GridLayout rows='auto,*, auto'>
      <Image height='400' class='m-5' verticalAlignment='top' [src]='item.image'></Image>
      <GridLayout class='m-5' row='1' columns='70,auto' rows='auto,auto,auto'>
          <Label text='Age:'></Label>
          <Label [text]='age' col='1'></Label>
          <Label text='Mood:' row='1'></Label>
          <Label [text]='mood' row='1' col='1'></Label>
          <Label text='Gender:' row='2'></Label>
          <Label [text]='gender' row='2' col='1'></Label>
      </GridLayout>
      <Button row="2" (tap)="processImage()" class="btn btn-primary" text="Process Image"></Button>
  </GridLayout> 
  `
})
export class ItemDetailComponent implements OnInit {
  gender: string;
  age: number;
  item: Item;
  mood;
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.item = this.itemService.selectedItem;
  }

  processImage() {
    this.itemService.getImageInfo().subscribe(data => {
      let response = data[0];
      this.age = response.faceAttributes.age;
      this.mood = this.determineMood(response.faceAttributes.emotion);
      this.gender = response.faceAttributes.gender;
    });
  }
  determineMood(emotion): string {
    let mood = Object.keys(emotion).reduce(
      (a, b) => (emotion[a] > emotion[b] ? a : b)
    );
    return ` ${mood} (${emotion[mood]})`;
  }
}
