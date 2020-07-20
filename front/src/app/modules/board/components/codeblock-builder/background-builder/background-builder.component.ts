import { Component, OnInit, Input } from "@angular/core";
import { CodeblockBuilderComponent } from "../codeblock-builder.component";

@Component({
  selector: "background-builder",
  templateUrl: "../codeblock-builder.component.html",
  styleUrls: ["../codeblock-builder.component.scss"],
})
export class BackgroundBuilderComponent extends CodeblockBuilderComponent {
  constructor() {
    super();
    this.isNamed = false;
    this.sectionNames = ["Given"];
    this.deletable = false;
    this.codeblockLabel = "Background";
  }
}
