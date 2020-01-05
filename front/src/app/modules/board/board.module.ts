import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { SectionStepsComponent } from './components/section-steps/section-steps.component';
import { MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, MatListModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SectionStepItemComponent } from './components/section-steps/section-step-item/section-step-item.component';
import { GherkinGeneratorComponent } from './components/gherkin-generator/gherkin-generator.component';


@NgModule({
  declarations: [
    SectionStepsComponent,
    BoardPageComponent,
    SectionStepItemComponent,
    GherkinGeneratorComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    DragDropModule
  ]
})
export class BoardModule { }
