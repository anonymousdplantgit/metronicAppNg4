import { Component, OnInit ,OnDestroy} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Product } from '../product';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AppComponent } from '../../app.component';
import { CategorieService } from '../../categorie/categorie.service';
import { Categorie } from '../../categorie/categorie';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  providers: [ProductService,CategorieService,ToastrService]
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
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService) { }

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
          response =>  this.toastrService.success('Saved with success', ''),
          error =>  this.toastrService.error(error, '', {timeOut: 3000,})
        );

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
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
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
        this.toastrService.error(err, 'Error loading Data :', {timeOut: 3000,})
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
          this.toastrService.success("Deleted successfully", '', {timeOut: 3000,})
        },
        error =>  {
           console.log(error);
           this.toastrService.error(error, '', {timeOut: 3000,});
         }
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
