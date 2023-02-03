import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PipesModule} from '../theme/pipes/pipes.module';
import {DirectivesModule} from '../theme/directives/directives.module';

import {HeaderImageComponent} from './header-image/header-image.component';
import {OurServicesComponent} from './our-services/our-services.component';
import {OurAwardsComponent} from './our-awards/our-awards.component';
import {OurChefsComponent} from './our-chefs/our-chefs.component';
import {TimelineComponent} from './timeline/timeline.component';
import {DialogHeaderControlsComponent} from './dialog-header-controls/dialog-header-controls.component';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {AlertDialogComponent} from './alert-dialog/alert-dialog.component';
import {LangComponent} from './lang/lang.component';
import {ProductItemComponent} from './product-item/product-item.component';
import {ProductItemToolbarComponent} from './product-item-toolbar/product-item-toolbar.component';
import {ProductItemCarouselComponent} from './product-item-carousel/product-item-carousel.component';
import {ProductItemHoverableComponent} from './product-item-hoverable/product-item-hoverable.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: false,
  suppressScrollX: true
};

@NgModule({
  declarations: [
    HeaderImageComponent,
    OurServicesComponent,
    OurAwardsComponent,
    OurChefsComponent,
    TimelineComponent,
    DialogHeaderControlsComponent,
    ImageUploadComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    LangComponent,
    ProductItemComponent,
    ProductItemToolbarComponent,
    ProductItemCarouselComponent,
    ProductItemHoverableComponent,
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
		OurServicesComponent,
		OurAwardsComponent,
		OurChefsComponent,
		TimelineComponent,
		DialogHeaderControlsComponent,
		ImageUploadComponent,
		ConfirmDialogComponent,
		AlertDialogComponent,
		LangComponent,
		ProductItemComponent,
		ProductItemToolbarComponent,
		ProductItemCarouselComponent,
	],
  providers:[
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ]
})
export class SharedModule { }
