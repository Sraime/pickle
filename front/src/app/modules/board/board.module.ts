import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BoardRoutingModule } from "./board-routing.module";
import { BoardPageComponent } from "./components/board-page/board-page.component";
import { SectionStepsComponent } from "./components/section-steps/section-steps.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SectionStepItemComponent } from "./components/section-steps/section-step-item/section-step-item.component";
import { EditStepDialogComponent } from "./components/edit-step-dialog/edit-step-dialog.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ScenarioBuilderComponent } from "./components/codeblock-builder/scenario-builder/scenario-builder.component";
import { BoardFeaturePageComponent } from "./components/board-feature-page/board-feature-page.component";
import { EditTextComponent } from "./components/edit-text/edit-text.component";
import { GherkinGeneratorDialogComponent } from "./components/gherkin-generator-dialog/gherkin-generator-dialog.component";
import { BackgroundBuilderComponent } from "./components/codeblock-builder/background-builder/background-builder.component";
import { CodeblockBuilderComponent } from "./components/codeblock-builder/codeblock-builder.component";

@NgModule({
  declarations: [
    SectionStepsComponent,
    BoardPageComponent,
    SectionStepItemComponent,
    EditStepDialogComponent,
    ScenarioBuilderComponent,
    BoardFeaturePageComponent,
    EditTextComponent,
    GherkinGeneratorDialogComponent,
    BackgroundBuilderComponent,
    CodeblockBuilderComponent
  ],
  entryComponents: [EditStepDialogComponent, GherkinGeneratorDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BoardRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    DragDropModule,
    MatDialogModule
  ]
})
export class BoardModule {}
