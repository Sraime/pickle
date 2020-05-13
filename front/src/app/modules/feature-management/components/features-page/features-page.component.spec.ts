import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesPageComponent } from './features-page.component';
import { By } from '@angular/platform-browser';
import { UserFeatureService } from '../../services/user-feature/user-feature.service';
import { Subject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ApiFeature } from 'src/app/modules/board/services/api/feature/api-feature.interface';

jest.mock('../../services/user-feature/user-feature.service');
const mockUserFeatureService: jest.Mocked<UserFeatureService> = new UserFeatureService(
	null,
	null
) as jest.Mocked<UserFeatureService>;

const subjectGetFeatures: Subject<ApiFeature[]> = new Subject<ApiFeature[]>();
mockUserFeatureService.getUserFeatures.mockReturnValue(subjectGetFeatures);

describe('FeaturesPageComponent', () => {
	let component: FeaturesPageComponent;
	let fixture: ComponentFixture<FeaturesPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FeaturesPageComponent],
			imports: [MatTableModule, MatIconModule],
			providers: [
				{
					provide: UserFeatureService,
					useValue: mockUserFeatureService
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FeaturesPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have the title : Features', () => {
		const title = fixture.debugElement.query(By.css('h2'));
		expect(title.nativeElement.textContent).toEqual('Features');
	});

	it('should have load features in a table', () => {});

	it('should have 3 row', async(() => {
		const loadedFeatures: ApiFeature[] = [
			{ name: 'f1', _id: null },
			{ name: 'f2', _id: null },
			{ name: 'f3', _id: null }
		];
		subjectGetFeatures.next(loadedFeatures);
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			const col = fixture.debugElement.nativeElement.querySelector('#feature-table tbody');
			expect(col.children.length).toEqual(3);
		});
	}));

	it('should have a row with the feature name', async(() => {
		const loadedFeatures: ApiFeature[] = [{ name: 'my feature', _id: null }];
		subjectGetFeatures.next(loadedFeatures);
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			const col = fixture.debugElement.nativeElement.querySelector(
				'#feature-table tbody tr:first-child td:first-child'
			);
			expect(col.textContent.trim()).toEqual('my feature');
		});
	}));
});
