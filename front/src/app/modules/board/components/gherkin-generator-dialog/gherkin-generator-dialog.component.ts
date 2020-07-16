import { Component, OnInit } from "@angular/core";
import { Feature } from "../../services/feature-assembly/models/feature.interface";
import { FeatureAssemblyService } from "../../services/feature-assembly/feature-assembly.service";
import { MatDialogRef } from "@angular/material/dialog";
import { GherkinCodeGenerator } from "../../libs/gherkin-code-generator/gherkin-code-generator";
import saveAs from "file-saver";

@Component({
  selector: "app-gherkin-generator-dialog",
  templateUrl: "./gherkin-generator-dialog.component.html",
  styleUrls: ["./gherkin-generator-dialog.component.scss"]
})
export class GherkinGeneratorDialogComponent implements OnInit {
  private feature: Feature;
  public featureCode = "";

  constructor(
    private featureAssembly: FeatureAssemblyService,
    public dialogRef: MatDialogRef<GherkinGeneratorDialogComponent>
  ) {}

  ngOnInit() {
    this.feature = this.featureAssembly.getAssembledFeature();
    this.featureCode = GherkinCodeGenerator.generateFeatureCode(this.feature);
  }

  downloadCode() {
    const blob = new Blob([this.featureCode], { type: "text/plain" });
    saveAs(blob, "feature_code.feature");
  }
}
