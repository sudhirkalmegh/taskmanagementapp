import { Component, ViewEncapsulation } from '@angular/core';
import {TaskList} from '../TaskList';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {CardListDataService} from './card-list-data.service';
import {AddListCardService} from './add-list-card.service';
import { SessionHelperService } from './session-helper.service';
import {CONSTANTS,CONSTANTS_MESSAGES} from './Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  title = 'Task Management App';
  listCollection : TaskList[] =[] ;
  connectedTo = [];
  themeClass: string ;

  constructor(private _storage: SessionHelperService, private cardListService: CardListDataService, private addListCardService: AddListCardService){
    
    this.listCollection = cardListService.getcardData();
    this.connectedTo = cardListService.getcardListConnectedToArray();    
    this.addListCardService =  addListCardService;

    this.themeClass  = this._storage.get('theme');
    document.body.classList.remove('light');
    document.body.classList.add(this.themeClass);
  }

  
  /*
  ** Method to add new list **
  */
  addList()
  {
    this.showError(this.addListCardService.addList(this.listCollection,this.connectedTo));
  }
 
  /*
  ** Method to add new card **
  */
  addCard(listIndex: number)
  {
    this.showError(this.addListCardService.addCard(this.listCollection,listIndex));   
  }

  /*
  ** Method to delete card **
  */
  deleteCard(listIndex, cardindex)
  {    
    this.addListCardService.deleteCard(this.listCollection,listIndex, cardindex);     
  }

  /*
  ** Method to delete list **
  */
  deleteList(listIndex)
  {
    this.addListCardService.deleteList(this.listCollection,listIndex); 
  }

  /*
  ** Method to delete list name **
  */
  editListName(listIndex, listName)
  {
    this.showError(this.addListCardService.editListName(this.listCollection,this.connectedTo, listIndex,listName)); 
  }

  /*
  ** Method to edit card name **
  */
  editCardName(listIndex, cardIndex, cardName)
  {
    this.showError(this.addListCardService.editCardName(this.listCollection, listIndex,cardIndex,cardName));  
  }  
  
  /*
  ** Method to handle drag drop event **
  */
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) 
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else 
    {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.addListCardService.saveCardDataToService(this.listCollection);
  }  

  changeTheme(event) {
    console.log(event.target.value);
    if (event.target.value === 'light') {      
      document.body.classList.remove('dark');
    } else {
      document.body.classList.remove('light');
    }
    this._storage.set('theme', event.target.value);
    document.body.classList.add(event.target.value);
  }

  showError(error)
  {   
    if(error != '')
    {
      let message = 'Message not found for';
      try{
        message = CONSTANTS_MESSAGES.find(x => x.messageKey == error).message;
      }
      catch{
        message += error;
      }
      alert(message);
    }
}

}
