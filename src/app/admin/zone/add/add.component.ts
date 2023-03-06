import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Zone } from '@models/zone.model';
import { Game } from '@models/game.model';
import { GameService } from '@services/game.service';
import { isEqual } from 'lodash';
import { DialogComponent as GameDialogComponent } from '@admin/game/dialog/dialog.component';
import { DialogService } from '@services/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Volunteer } from '@models/volunteer.model';
import { VolunteerService } from '@services/volunteer.service';
import { ZoneService } from '@services/zone.service';
import { Slot } from '@models/slot.model';
import { SnackBarService } from '@services/snack-bar.service';
import { TranslateService } from '@services/translate.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	public form!: UntypedFormGroup;
	public isAdding: boolean = true;  // By default, is adding but can update.

	public currentZone: Zone | null = null;
	public gameList: Game[] = [];
	public volunteerList: Volunteer[] = [];
	public slotList: Slot[] = [];

	constructor(
		public formBuilder: UntypedFormBuilder,
		public zoneService: ZoneService,
		public gameService: GameService,
		public volunteerService: VolunteerService,
		public dialogService: DialogService,
		public router: Router,
		private activatedRoute: ActivatedRoute,
		public snackBarService: SnackBarService,
		public translateService: TranslateService
	) {
	}

	ngOnInit(): void {
		this.initializeFrom();
		this.getGameList();
		this.getVolunteerList();

		this.activatedRoute.params.subscribe(params => {
			if (params['id']) {
				// Is updating.
				this.isAdding = false;
				this.zoneService.getById(params['id']).subscribe({
					next: (zone: Zone) => {
						this.currentZone = zone;
						this.patchForm();
					}
				});
			}
			else {
				// Is adding.
				this.isAdding = true;
			}
		});
	}

	public initializeFrom() {
		this.form = this.formBuilder.group({
			id: '',
			name: [null, Validators.required],
			gameRefs: [null],
			slots: [null]
		});
	}

	public patchForm() {
		if (!this.currentZone) {
			return;
		}

		this.form.patchValue({
			id: this.currentZone.id,
			name: this.currentZone.name,
			gameRefs: this.currentZone.gameRefs
		});
	}

	public getGameList() {
		this.gameService.get().subscribe({
			next: (games: Game[]) => {
				this.gameList = games;
				this.gameList.sort((a, b) => a.name.localeCompare(b.name));
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

	public getVolunteerList() {
		this.volunteerService.get().subscribe({
			next: (volunteers: Volunteer[]) => {
				this.volunteerList = volunteers;
				// Sort by last name, then first name.
				this.volunteerList.sort((a, b) => {
					const aName = a.lastName + a.firstName;
					const bName = b.lastName + b.firstName;
					return aName.localeCompare(bName);
				});
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

	public onSubmit() {
		if (this.form.valid) {
			this.form.value.slots = this.slotList;

			(this.isAdding
			 ? this.zoneService.createZone(this.form.value)
			 : this.zoneService.update(this.form.value)
			).subscribe({
				next: () => {
					this.snackBarService.openSuccess(this.translateService.getTranslatedValue('SNACKBAR.' + (this.currentZone ? 'UPDATED' : 'CREATED'))!);
					this.router.navigate(['/admin/zone']).then();
				},
				error: (error) => {
					console.error(error);
					this.snackBarService.openError(this.translateService.getTranslatedValue('SNACKBAR.ERROR')!);
				}
			});
		}
	}

	public onCancel() {
		this.router.navigate(['/admin/zone']).then();
	}

	public onAddGame() {
		this.dialogService
			.openDialog(GameDialogComponent)
			.afterClosed()
			.subscribe(() => this.getGameList());
	}

	public equals(option: any, value: any): boolean {
		return isEqual(option, value);
	}

	public updateSlotDialog(slotList: Slot[]) {
		this.slotList = slotList;
	}
}
