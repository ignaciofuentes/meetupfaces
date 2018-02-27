import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";
import { Item } from "./item";
@Injectable()
export class ItemService {
  selectedItem: Item;
  items: BehaviorSubject<Array<Item>> = new BehaviorSubject([]);
  constructor(private http: Http) {}
  fetchItems() {
    this.http
      .get(
        `https://api.meetup.com/JS-NYC/events/246938509/rsvps?response=yes&only=member`
      )
      .map(res => res.json())
      .subscribe(data => {
        let myItems = data
          .filter(item => item.member.photo != null)
          .map(item => {
            return {
              name: item.member.name,
              image: item.member.photo ? item.member.photo.photo_link : "",
              fullImage: item.member.photo ? item.member.photo.highres_link : ""
            };
          });
        this.items.next(myItems);
      });
  }

  getImageInfo() {
    let key = "someKeyHere"; // your msft cognitive services api key at; https://azure.microsoft.com/en-us/services/cognitive-services/face/
    if (key === "someKeyHere") {
      alert("Please get a Msft cognitive services face API key");
    }
    let headers = new Headers({
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": key
    });
    return this.http
      .post(
        "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,emotion",
        { url: this.selectedItem.fullImage },
        { headers: headers }
      )
      .map(r => r.json());
  }
}
