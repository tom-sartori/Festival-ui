import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppService} from 'src/app/services/app.service';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.scss']
})
export class ChefComponent implements OnInit {
  private sub: any;
  public chef:any;
  constructor(private activatedRoute: ActivatedRoute, public appService:AppService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getChefById(params['id']);
      this.getMenuItems();
    });
  }

  public getChefById(id:any){
    this.chef = this.appService.getChefs().find(chef=> chef.id == id);
  }

  public getMenuItems(){
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


}
