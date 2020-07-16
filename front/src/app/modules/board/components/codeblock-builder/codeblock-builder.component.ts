import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DeleteCodeblockEventData } from "./delete-codeblock-event-data";

@Component({
  selector: "app-codeblock-builder",
  templateUrl: "./codeblock-builder.component.html",
  styleUrls: ["./codeblock-builder.component.scss"]
})
export class CodeblockBuilderComponent {
  codeblockLabel: string;
  sectionNames: Array<string> = [];
  deletable = true;
  isNamed = true;

  @Input()
  codeBlockId: string;

  @Input()
  codeblockName = "";

  @Output("delete")
  delEvent: EventEmitter<DeleteCodeblockEventData> = new EventEmitter<
    DeleteCodeblockEventData
  >();

  delCodeblock() {
    this.delEvent.emit(new DeleteCodeblockEventData(this.codeBlockId));
  }

  updateName(updatedName: string) {}
}
