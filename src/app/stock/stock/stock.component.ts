import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  form: FormGroup = new FormGroup({
    requestingDepartment: new FormControl(''),
    productCode: new FormControl(),
    departmentCode: new FormControl(''),
    purposeOfIssue: new FormControl(''),
    itemDescription: new FormControl(''),
    dateOfPreviousIssue: new FormControl(''),
    previusIssueQuanity: new FormControl(),
    estimatedValue: new FormControl(),
    signatureImageUrl: new FormControl(''),
    quantity: new FormControl(),
  });
  submitted = false;


  constructor(private formBuilder: FormBuilder,
    private stockService: StockService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        requestingDepartment: ['', Validators.required],
        productCode: [null, [Validators.required],],
        departmentCode: ['', [Validators.required]],
        purposeOfIssue: ['', [Validators.required]],
        itemDescription: ['', Validators.required],
        dateOfPreviousIssue: ['', Validators.required],
        previusIssueQuanity: [null, Validators.required],
        estimatedValue: [null, Validators.required],
        signatureImageUrl: ['', Validators.required],
        quantity: [null, Validators.required],
      }
    );

    this.stockService.getStock().subscribe(()=>{
      next: {}
      error: {}
    });
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
