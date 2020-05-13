import { Component, OnInit } from '@angular/core';
import { UserFeatureService } from '../../services/user-feature/user-feature.service';
import { ApiFeature } from 'src/app/modules/board/services/api/feature/api-feature.interface';
import { Router } from '@angular/router';

@Component({
	selector: 'app-features-page',
	templateUrl: './features-page.component.html',
	styleUrls: ['./features-page.component.scss']
})
export class FeaturesPageComponent implements OnInit {
	displayedColumns = ['name'];
	features: ApiFeature[] = [];

	constructor(private userFeatureService: UserFeatureService, private router: Router) {}

	ngOnInit(): void {
		this.userFeatureService.getUserFeatures().subscribe((loadedFeatures) => {
			this.features = loadedFeatures;
		});
	}

	goToBoard(featureId) {
		this.router.navigate(['board/'+featureId])
	}
}
