import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nl-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit{
  form: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  constructor(public activeModal: NgbActiveModal) {}

  initializeForm(){
    this.form = new FormGroup({

      title: new FormControl((null),
        [Validators.required]
      ),
      description: new FormControl((null),
        [Validators.required]
      ),
      titleImageUrl: new FormControl((null),
        [Validators.required]
      ),
      publishedDate: new FormControl((new Date()),
      []
    ),
    })
  }

  closeModal() {
    this.activeModal.close(null);
    this.formReset();
  }

  saveModal():void{
    this.submitForm();
    this.formReset();
  }

  uploadFile(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.patchValue({
          titleImageUrl: reader.result as string
        });
      };
    }
  }

  private submitForm(): void{
    if (this.form.valid) {
      console.log(this.form.value);
      const news = {
        id: null,
        title: this.form.value.title,
        text: null,
        description: this.form.value.description,
        publishedDate: this.form.value.publishedDate,
        url: null,
        fullUrl: null,
        titleImageUrl: this.form.value.titleImageUrl,
        categoryType: null
      }
      this.activeModal.close(news);
    }
  }

  private formReset(): void{
    this.form.reset();
  }
}
