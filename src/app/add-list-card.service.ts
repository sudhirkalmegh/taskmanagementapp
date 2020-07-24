import { Injectable } from '@angular/core';
import {CardListDataService} from './card-list-data.service';

@Injectable({
  providedIn: 'root'
})
export class AddListCardService {

  constructor(private cardListService: CardListDataService) {
      this.cardListService = cardListService;
   }


  showError(error)
  {
    if(error = 'DUPLICATE')
    {
      alert("Duplicate list/card Name");
    }
    else if(error = 'REQUIRED')
    {
      alert("List/card name is required");
    }
  }


  /*
  ** Method to add list to collection **
  */ 
  addList(listCollection,connectedTo)
  {
    let listName = '';

    let userlistName = prompt("Please enter List Name", "New ListName");
    if (userlistName != null && userlistName != undefined && userlistName.trim() != '') 
    {
      //Check duplicate list name
      if(!this.duplicateListName(listCollection, userlistName))
      {
        listName = userlistName;
        let index = listCollection.length + 1;
        listCollection.push({ name:listName , tasks:[]} );
        connectedTo.push(listName);
        this.saveCardDataToService(listCollection);
      }
      else{      
        this.showError('DUPLICATE');
      }
    }
   
    if(userlistName.trim() == '') 
    {      
      this.showError('REQUIRED');
    }
  }

  /*
  ** Method to add card to collection **
  */ 
  addCard(listCollection, listIndex: number)
  {
    let cardName = '';

    let userCardName = prompt("Please enter Card Name", "New CardName");
        
    if (userCardName != null && userCardName != undefined && userCardName.trim() != '') 
    {
      //Check duplicate card name
      if(!this.duplicateCardName(listCollection, userCardName)){
        cardName = userCardName;
        let index = listCollection[listIndex].tasks.length + 1;
        listCollection[listIndex].tasks.push(cardName );
        this.saveCardDataToService(listCollection);
      }
      else{
        this.showError('DUPLICATE');
      }
    }
    if(userCardName.trim() == '') 
    {
      this.showError('REQUIRED');
    }
   
  }

  /*
  ** Method to delete card **
  */
  deleteCard(listCollection,listIndex, cardindex)
  {    
    var r = confirm("Are you sure you want to delete this card.");
    if (r == true) {
      listCollection[listIndex].tasks.splice(cardindex, 1);
      this.saveCardDataToService(listCollection);
    }    
  }

  /*
  ** Method to delete list **
  */
  deleteList(listCollection, listIndex)
  {
    var r = confirm("Are you sure you want to delete this List.");
    if (r == true) {
    listCollection.splice(listIndex, 1);
    this.saveCardDataToService(listCollection);
    }
  }

  /*
  ** Method to save list data to service **
  */
  saveCardDataToService(listCollection)
  {
    this.cardListService.saveCardData(listCollection);
  }

  /*
  ** Method to edit list name  **
  */
  editListName(listCollection,connectedTo,listIndex, listName)
  {
    let newListName = prompt("Please enter List Name",listName);
    if (newListName != null) 
    { 
      if(!this.duplicateListName(listCollection, newListName))
      {
        listCollection[listIndex].name = newListName;    
        connectedTo.splice(listIndex, 1);
        connectedTo.push(newListName);
        this.saveCardDataToService(listCollection);
      }
      else{
        this.showError('DUPLICATE');
      }
    }
   
  }

  /*
  ** Method to edit card name  **
  */
  editCardName(listCollection, listIndex, cardIndex, cardName)
  {
    let newCardName = prompt("Please enter Card Name",cardName);
    if (newCardName != null) 
    {
      if(!this.duplicateCardName(listCollection, newCardName)){
        listCollection[listIndex].tasks[cardIndex] = newCardName;
        this.saveCardDataToService(listCollection);
      }
      else{
        this.showError('DUPLICATE');
      }
    }
  }

  /*
  ** Method to check duplicate list name  **
  */
  duplicateListName(listCollection, listName)
  {
    if (listCollection.some((item) => item.name == listName))
      {  
        return true;
      }
      else
      {
        return false;
      }
      
  }

  /*
  ** Method to check duplicate card name  **
  */
  duplicateCardName(listCollection, cardName)
  {
    if (listCollection.some((item) => item.tasks.some((card) => card == cardName) ))
      {  
        return true;
      }
      else
      {
        return false;
      }
      
  }
}
