import { Injectable } from '@angular/core';
import {TaskList} from '../TaskList';
import {SessionHelperService} from './session-helper.service'

@Injectable({
  providedIn: 'root'
})

export class CardListDataService  {
  taskListStored:TaskList[] =[];
  connectedTo:string[]=[];

  constructor(private sessionHelperService: SessionHelperService) { 
    this.sessionHelperService = sessionHelperService
  }

  /*
  ** Method to set the list data in persistent storage **
  */ 
  saveCardData(cardListData){
    this.sessionHelperService.set('CardListData-New',JSON.stringify(cardListData));
    //sessionStorage.setItem('CardListData-New', JSON.stringify(cardListData));
  }

  /*
  ** Method to get the list data from persistent storage **
  */ 
  getcardData(){
    
   if(this.sessionHelperService.get('CardListData-New') != null)
   {
     try{
        this.taskListStored = JSON.parse(this.sessionHelperService.get('CardListData-New'));
     }
     catch{
     }
   }
   return this.taskListStored;
  }

  /*
  ** Method to get all list items id key **
  */ 
  getcardListConnectedToArray()
  {    
    let data = this.getcardData();
    
      data.forEach(element => {
        this.connectedTo.push(element.name);
      });
    
    return this.connectedTo;
  }
}
