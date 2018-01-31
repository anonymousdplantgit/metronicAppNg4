import { Component, OnInit ,OnDestroy} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Product } from '../product';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AppComponent } from '../../app.component';
import { CategorieService } from '../../categorie/categorie.service';
import { Categorie } from '../../categorie/categorie';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  providers: [ProductService,CategorieService]
})
export class ProductManagementComponent implements OnInit,OnDestroy {
  public product: Product;
  form: FormGroup;
  message:string;
  public products: Product[];
  public cats: Categorie[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,private categorieService: CategorieService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {

    this.getAll();


    this.form = new FormGroup({
      produitId : new FormControl(),
      ref: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      prixAchat: new FormControl(null, Validators.required),
      prixVente: new FormControl(null, Validators.required),
      categorie: new FormControl(null, Validators.required),
      message : new FormControl()
    });
  }
  ngOnDestroy(): void {
  }

  onSubmit() {
    if (this.form.valid) {
        let product: Product = new Product(
          this.form.controls['produitId'].value,
          this.form.controls['ref'].value,
          this.form.controls['label'].value,
          this.form.controls['description'].value,
          this.form.controls['prixAchat'].value,
          this.form.controls['prixVente'].value,
          this.form.controls['categorie'].value);
        this.productService.save(product).subscribe(
          response =>this.message="Added",
          error =>  this.message = <any>error);

      }
      this.reset();
      this.getAll();
}
  getAll() {
    this.spinnerService.show();
    this.categorieService.findAll().subscribe(
      cats => {
        this.cats = cats;
        console.log(cats);
      },
      err => {
        this.message="Error loading Data : "+err;
        console.log(err);
      } 
    );
    this.productService.findAll().subscribe(
      products => {
        this.products = products;
        console.log(products);
        this.spinnerService.hide();
      },
      err => {
        this.message="Error loading Data : "+err;
        console.log(err);
        this.spinnerService.hide();
      }
    );
    
    
  }
 
  delete(product: Product) {
    if (product) {
      this.productService.deleteById(product.produitId).subscribe(
        res => {
          this.getAll();
          console.log('delete product '+ product.produitId+' done');
          this.message="Deleted successfully";
        },
        error =>  this.message = <any>error
      );
    }
  }
  
  edit(product: Product) {
    console.log("editing :"+ product);
    this.form.patchValue({
      produitId: product.produitId,
      ref: product.ref,
      label: product.label,
      description: product.description,
      prixAchat:product.prixAchat,
      prixVente:product.prixVente,
      categorie:product.categorie
  });
  
  }
  reset() {
    this.form.reset();
 
  }

}
