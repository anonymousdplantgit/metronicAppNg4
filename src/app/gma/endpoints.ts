export class Endpoints {

    public types: string;
    public states: string;
    public resources: string;
    public workOrders: string;
    public tasks: string;
    public projects: string;
    public produits: string;
    public fournisseurs: string;
    public categories: string;


    constructor(){
        this.types='https://global-management-application.herokuapp.com/types';
        this.states='https://global-management-application.herokuapp.com/states';
        this.resources='https://global-management-application.herokuapp.com/resources';
   this.workOrders='https://global-management-application.herokuapp.com/workOrders';
      this.tasks='https://global-management-application.herokuapp.com/tasks';
        this.projects='https://global-management-application.herokuapp.com/projects';
       this.produits='https://global-management-application.herokuapp.com/produits';
        this.fournisseurs='https://global-management-application.herokuapp.com/fournisseurs';
        this.categories='https://global-management-application.herokuapp.com/categories';
       }

     /**  constructor(){
      this.types='http://localhost:8080/types';
      this.states='http://localhost:8080/states';
      this.resources='http://localhost:8080/resources';
      this.workOrders='http://localhost:8080/workOrders';
      this.tasks='http://localhost:8080/tasks';
      this.projects='http://localhost:8080/projects';
      this.produits='http://localhost:8080/produits';
      this.fournisseurs='http://localhost:8080/fournisseurs';
      this.categories='http://localhost:8080/categories';
       }*/
    
}