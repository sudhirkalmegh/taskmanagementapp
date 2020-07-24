import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SessionHelperService } from './session-helper.service';


describe('AppComponent', () => {
  let spySortService = jasmine.createSpyObj({ sortNumberData: null });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[
        SessionHelperService
      ]
    }).compileComponents();
    
  }));


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Task Management App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Task Management App');
  });

  it(`Add new List`, inject([SessionHelperService], (storage: SessionHelperService) => {    
    storage.removeItem('CardListData-New');
    spyOn(window, 'prompt').and.returnValue('ABC');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addList();
    expect(app.listCollection[0].name).toEqual('ABC');
  }));

  it(`Delete a List`, inject([SessionHelperService], (storage: SessionHelperService) => {    
    storage.removeItem('CardListData-New');
    spyOn(window, 'prompt').and.returnValues('ABC');
    spyOn(window, 'confirm').and.returnValues(true);

    //spyOn(window, 'prompt').and.returnValue('ABC');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addList();
    expect(app.listCollection.length).toEqual(1);
    app.deleteList(0);
    expect(app.listCollection.length).toEqual(0);
  }));

  it(`Edit existing a list name`, inject([SessionHelperService], (storage: SessionHelperService) => {    
    storage.removeItem('CardListData-New');
    spyOn(window, 'prompt').and.returnValues('ABC','XYZ');

    //spyOn(window, 'prompt').and.returnValue('ABC');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addList();
    expect(app.listCollection[0].name).toEqual('ABC');
    app.editListName(0,'XYZ');
    expect(app.listCollection[0].name).toEqual('XYZ');
  }));

  it(`Dont Add List with duplicate Name`, inject([SessionHelperService], (storage: SessionHelperService) => {    
    storage.removeItem('CardListData-New');
    spyOn(window, 'prompt').and.returnValue('ABC');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    //console.log(app.listCollection.length);
    //console.log(app.listCollection[0].name);
    app.listCollection.length = 0;
    app.listCollection.push({name:"ABC",tasks:[]});
    app.addList();
    expect(app.listCollection.length).toEqual(1);
  }));

  it(`Add new Card in list`, inject([SessionHelperService], (storage: SessionHelperService) => {    
    storage.removeItem('CardListData-New');
    spyOn(window, 'prompt').and.returnValues('ABC','A');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addList();
    app.addCard(0)
    expect(app.listCollection[0].tasks[0]).toEqual('A');
  }));

  it(`Delete a card from a List`, inject([SessionHelperService], (storage: SessionHelperService) => {    
    storage.removeItem('CardListData-New');
    spyOn(window, 'prompt').and.returnValues('ABC','A');
    spyOn(window, 'confirm').and.returnValues(true);
    
    //spyOn(window, 'prompt').and.returnValue('ABC');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addList();
    app.addCard(0);
    expect(app.listCollection[0].tasks.length).toEqual(1);
    app.deleteCard(0,0);
    expect(app.listCollection[0].tasks.length).toEqual(0);
  }));

  it(`Edit existing a card name`, inject([SessionHelperService], (storage: SessionHelperService) => {    
    storage.removeItem('CardListData-New');
    spyOn(window, 'prompt').and.returnValues('ABC','A','B');

    //spyOn(window, 'prompt').and.returnValue('ABC');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addList();
    app.addCard(0);
    expect(app.listCollection[0].tasks[0]).toEqual('A');
    app.editCardName(0,0,'B');
    expect(app.listCollection[0].tasks[0]).toEqual('B');
  }));


  it(`Dont Add card with duplicate Name`, inject([SessionHelperService], (storage: SessionHelperService) => {    
    storage.removeItem('CardListData-New');
    //spyOn(window, 'prompt').and.returnValue('ABC');
    spyOn(window, 'prompt').and.returnValues('ABC','A','A');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;  
    app.addList();
    app.addCard(0);
    app.addCard(0);
    expect(app.listCollection[0].tasks.length).toEqual(1);
  }));


  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('ListCardApp app is running!');
  // });
});
