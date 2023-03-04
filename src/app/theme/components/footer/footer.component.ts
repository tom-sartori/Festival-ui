import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { AppSettings, Settings } from '@app/app.settings';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
	public lat: number = 43.609020;
	public lng: number = 3.880670;
	public zoom: number = 14;
	public mapStyles: any = [
		{
			featureType: 'all',
			elementType: 'labels.text.fill',
			stylers: [
				{
					saturation: 36,
				},
				{
					color: '#000000',
				},
				{
					lightness: 40,
				},
			],
		},
		{
			featureType: 'all',
			elementType: 'labels.text.stroke',
			stylers: [
				{
					visibility: 'on',
				},
				{
					color: '#000000',
				},
				{
					lightness: 16,
				},
			],
		},
		{
			featureType: 'all',
			elementType: 'labels.icon',
			stylers: [
				{
					visibility: 'off',
				},
			],
		},
		{
			featureType: 'administrative',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#000000',
				},
				{
					lightness: 20,
				},
			],
		},
		{
			featureType: 'administrative',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#000000',
				},
				{
					lightness: 17,
				},
				{
					weight: 1.2,
				},
			],
		},
		{
			featureType: 'administrative',
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#8b9198',
				},
			],
		},
		{
			featureType: 'landscape',
			elementType: 'geometry',
			stylers: [
				{
					color: '#000000',
				},
				{
					lightness: 20,
				},
			],
		},
		{
			featureType: 'landscape',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#323336',
				},
			],
		},
		{
			featureType: 'landscape.man_made',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#414954',
				},
			],
		},
		{
			featureType: 'poi',
			elementType: 'geometry',
			stylers: [
				{
					color: '#000000',
				},
				{
					lightness: 21,
				},
			],
		},
		{
			featureType: 'poi',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#2e2f31',
				},
			],
		},
		{
			featureType: 'road',
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#7a7c80',
				},
			],
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#242427',
				},
				{
					lightness: 17,
				},
			],
		},
		{
			featureType: 'road.highway',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#202022',
				},
				{
					lightness: 29,
				},
				{
					weight: 0.2,
				},
			],
		},
		{
			featureType: 'road.arterial',
			elementType: 'geometry',
			stylers: [
				{
					color: '#000000',
				},
				{
					lightness: 18,
				},
			],
		},
		{
			featureType: 'road.arterial',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#393a3f',
				},
			],
		},
		{
			featureType: 'road.arterial',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#202022',
				},
			],
		},
		{
			featureType: 'road.local',
			elementType: 'geometry',
			stylers: [
				{
					color: '#000000',
				},
				{
					lightness: 16,
				},
			],
		},
		{
			featureType: 'road.local',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#393a3f',
				},
			],
		},
		{
			featureType: 'road.local',
			elementType: 'geometry.stroke',
			stylers: [
				{
					color: '#202022',
				},
			],
		},
		{
			featureType: 'transit',
			elementType: 'geometry',
			stylers: [
				{
					color: '#000000',
				},
				{
					lightness: 19,
				},
			],
		},
		{
			featureType: 'water',
			elementType: 'geometry',
			stylers: [
				{
					color: '#000000',
				},
				{
					lightness: 17,
				},
			],
		},
		{
			featureType: 'water',
			elementType: 'geometry.fill',
			stylers: [
				{
					color: '#202124',
				},
			],
		},
	];

	public settings: Settings;

	constructor(
		public contactService: ContactService,
		public appSettings: AppSettings,
	) {
		this.settings = this.appSettings.settings;
	}

	ngOnInit() {
		this.contactService.get();
	}
}
