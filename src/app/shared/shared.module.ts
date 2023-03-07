import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
	PERFECT_SCROLLBAR_CONFIG,
	PerfectScrollbarConfigInterface,
	PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { PipesModule } from '../theme/pipes/pipes.module';
import { DirectivesModule } from '../theme/directives/directives.module';

import { HeaderImageComponent } from './header-image/header-image.component';
import { TimelineComponent } from './timeline/timeline.component';
import { DialogHeaderControlsComponent } from './dialog-header-controls/dialog-header-controls.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { LangComponent } from './lang/lang.component';
import { GameItemToolbarComponent } from './game-item-toolbar/game-item-toolbar.component';
import { SearchBarComponent } from './toolbar/search-bar/search-bar.component';
import { ViewTypeComponent } from './toolbar/view-type/view-type.component';
import { GameItemComponent } from './game-item/game-item.component';
import { CategoryToggleComponent } from './toolbar/category-toggle/category-toggle.component';
import { PaginationSelectComponent } from './toolbar/pagination-select/pagination-select.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ZoneItemComponent } from '@shared/zone-item/zone-item.component';
import { ZoneItemToolbarComponent } from '@shared/zone-item-toolbar/zone-item-toolbar.component';
import { VolunteerToolbarComponent } from './volunteer-toolbar/volunteer-toolbar.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: false,
  suppressScrollX: true
};

@NgModule({
	declarations: [
		HeaderImageComponent,
		TimelineComponent,
		DialogHeaderControlsComponent,
		ImageUploadComponent,
		ConfirmDialogComponent,
		AlertDialogComponent,
		LangComponent,
		GameItemToolbarComponent,
		SearchBarComponent,
		ViewTypeComponent,
		GameItemComponent,
		ZoneItemComponent,
		ZoneItemToolbarComponent,
  CategoryToggleComponent,
  PaginationSelectComponent,
  LoadingSpinnerComponent,
  VolunteerToolbarComponent,
	],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SwiperModule,
    TranslateModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    DirectivesModule
  ],
	exports: [
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
		FlexLayoutModule,
		SwiperModule,
		TranslateModule,
		MatAutocompleteModule,
		MatBadgeModule,
		MatBottomSheetModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatStepperModule,
		PerfectScrollbarModule,
		PipesModule,
		DirectivesModule,
		HeaderImageComponent,
		TimelineComponent,
		DialogHeaderControlsComponent,
		ImageUploadComponent,
		ConfirmDialogComponent,
		AlertDialogComponent,
		LangComponent,
		GameItemToolbarComponent,
		GameItemComponent,
		ZoneItemComponent,
		ZoneItemToolbarComponent,
		CategoryToggleComponent,
		LoadingSpinnerComponent,
		VolunteerToolbarComponent
	],
  providers:[
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ]
})
export class SharedModule { }
