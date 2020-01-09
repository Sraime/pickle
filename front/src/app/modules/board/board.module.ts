import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { SectionStepsComponent } from './components/section-steps/section-steps.component';
import { MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatListModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SectionStepItemComponent } from './components/section-steps/section-step-item/section-step-item.component';
import { GherkinGeneratorComponent } from './components/gherkin-generator/gherkin-generator.component';
import { EditStepDialogComponent } from './components/edit-step-dialog/edit-step-dialog.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ScenarioBuilderComponent } from './components/scenario-builder/scenario-builder.component';
import { BoardFeaturePageComponent } from './components/board-feature-page/board-feature-page.component';


@NgModule({
  declarations: [
    SectionStepsComponent,
    BoardPageComponent,
    SectionStepItemComponent,
    GherkinGeneratorComponent,
    EditStepDialogComponent,
    ScenarioBuilderComponent,
    BoardFeaturePageComponent,
  ],
  entryComponents: [
    EditStepDialogComponent
  ],
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
    MatDialogModule,
  ]
})
export class BoardModule { }
