import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from 'src/app/_services/collection.service';
import { FlowersService } from 'src/app/_services/flowers.service';
import { Flower } from '../flower.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create-flower',
  templateUrl: './create-flower.component.html',
  styleUrls: ['./create-flower.component.css'],
})
export class CreateFlowerComponent implements OnInit {
  form: FormGroup;
  imagePreview: string = '';
  mode: string;
  flowerid: number;
  flower: Flower;
  constructor(
    private flowerService: FlowersService,
    private route: ActivatedRoute,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
      price: new FormControl(null, { validators: [Validators.required] }),
      type: new FormControl(null, { validators: [Validators.required] }),
      occassion: new FormControl(null, { validators: [Validators.required] }),
      color: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.queryParamMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.flowerid = parseInt(paramMap.get('id'));
        this.collectionService.getById(this.flowerid).subscribe((result) => {
          console.log(result);
          this.flower = {
            flowerid: result.flowers[0].flowerid,
            name: result.flowers[0].name,
            image: result.flowers[0].image,
            description: result.flowers[0].description,
            price: result.flowers[0].price,
            occassion: result.flowers[0].occassion,
            type: result.flowers[0].type,
            color: result.flowers[0].colorid,
          };
          this.form.setValue({
            name: this.flower.name,
            description: this.flower.description,
            image: this.flower.image,
            price: this.flower.price,
            type: this.flower.type,
            occassion: this.flower.occassion,
            color: this.flower.color,
          });
        });
      } else {
        this.mode = 'create';
        this.flowerid = null;
      }
    });
  }

  onSaveFlower1() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.flowerService.createFlowers(
        this.form.value.name,
        this.form.value.image,
        this.form.value.description,
        this.form.value.price,
        this.form.value.type,
        this.form.value.occassion,
        this.form.value.color
      );
    } else {
      this.flowerService.updateFlower(
        this.flowerid,
        this.form.value.image,
        this.form.value.name,
        this.form.value.description,
        this.form.value.price,
        this.form.value.type,
        this.form.value.occassion,
        this.form.value.color
      );
    }

    this.form.reset();
  }

  onImagePicked(event: Event) {
    const image = event.target as HTMLInputElement;
    if (image.files !== null) {
      const file = image.files[0];
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
