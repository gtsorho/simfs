import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RouterLink } from '@angular/router';
import { ClassificationService } from './classification.service';

interface farmer {
  id?: string;
  name: string;
  phone: string;
  notify:boolean;
}


@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LoaderComponent],
  templateUrl: './classification.component.html',
  styleUrl: './classification.component.scss'
})


export class ClassificationComponent {

  constructor(private classificationService:ClassificationService){ }

  step: number = 1;
  stepEco: number = 1;
  isMfsResult: boolean = false
  isLoader: boolean = false

  selectedRegion: any = null;
  selectedCountry: any = null;
  selectedCrops: any[] = [];
  selectedAnimals: any[] = [];

  form = {
    region: '',
    valueChain: ''
  };

  countries:any = [];
  farmCrops:any = [];
  farmAnimals:any = [];
  regionsOfGhana: any = [];
  
  selectedCropQuantities: { [key: number]: number } = {};
  selectedAnimalQuantities: { [key: number]: number } = {};

  household_size: number = 0
  no_trees: number = 0
  no_economic_trees: number = 0

  farmer:farmer = {
    name:'',
    phone:'',
    notify:false
  }


  
  ngOnInit(){
    this.getCountries()
    this.getAnimals()
    this.getCrops()


    this.selectedCrops.forEach(crop => {
      this.selectedCropQuantities[crop.id] = crop.quantities;
    });

    this.selectedAnimals.forEach(crop => {
      this.selectedAnimalQuantities[crop.id] = crop.quantities;
    });
  }

  getCountries(){
    this.classificationService.getCountries().subscribe((res)=>{
      this.countries = res
    })
  }

  getRegions(id:number){
    this.classificationService.getRegions(id).subscribe((res)=>{
      this.regionsOfGhana = res
    })
  }

  getCrops(){
    this.classificationService.getCrops().subscribe((res)=>{
      this.farmCrops  = res
    })
  }

  getAnimals(){
    this.classificationService.getAnimals().subscribe((res)=>{
      this.farmAnimals  = res
    })
  }

  

  submitForm() {
    // console.log(
    //   {
    //     farmer:this.farmer,
    //     zone:[this.selectedCountry, this.selectedRegion],
    //     valueChain:[this.selectedCrops,this.selectedAnimals, {no_economic_trees:this.no_economic_trees, no_trees:this.no_trees, household_size:this.household_size}]

    //   }
    // )

    this.isLoader = true

    setTimeout(() => {
      this.isMfsResult = true
      this.isLoader = false
    }, 2000);

  }

  // Item Selection *********************************************
  selectRegion(region: any) {
    this.selectedRegion = region;
  }
  selectCountry(country: any) {
    this.selectedCountry = country;
    this.getRegions(country.id)
  }

  toggleCropSelection(crop: any) {
    const index = this.selectedCrops.findIndex((c) => c.id === crop.id);
    if (index === -1) {
      this.selectedCrops.push({ ...crop, quantities: 0, id:crop.id });
    } else {
      this.selectedCrops.splice(index, 1);
    }
  }
  
  isCropSelected(crop: any): boolean {
    return this.selectedCrops.some((c) => c.id === crop.id);
  }

  updateCropQuantity(crop: any, event: Event) {
    const quantity = (event.target as HTMLInputElement).value;
    const selectedCrop = this.selectedCrops.find((c) => c.id === crop.id);
    if (selectedCrop) {
      selectedCrop.quantities = quantity;
    }
  }

  toggleAnimalSelection(animal: any) {
    const index = this.selectedAnimals.findIndex((c) => c.id === animal.id);
    if (index === -1) {
      this.selectedAnimals.push({ ...animal, quantities: 0, id:animal.id });
    } else {
      this.selectedAnimals.splice(index, 1);
    }
  }
  
  isAnimalSelected(animal: any): boolean {
    return this.selectedAnimals.some((c) => c.id === animal.id);
  }
  
  updateAnimalQuantity(animal: any, event: Event) {
    const quantity = (event.target as HTMLInputElement).value;
    const selectedAnimal = this.selectedAnimals.find((c) => c.id === animal.id);
    if (selectedAnimal) {
      selectedAnimal.quantities = quantity;
    }
  }


// Navigation Control ***************************************************************
  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }

    if(this.step == 1){
      this.stepEco = 1
    }
  }

  nextStepEco() {
    if (this.stepEco <= 3) {
      this.stepEco++;
    }

    if(this.stepEco == 4){
      console.log(this.stepEco)
      this.step = 2
    }
  }

  previousStepEco() {
    if (this.stepEco > 1) {
      this.stepEco--;
    }
  }

  isEcoStepCompleted(step: number): boolean {
    switch (step) {
      case 1:
        return this.selectedCountry && this.selectedRegion;
      case 2:
        var arr:any = []
        this.selectedCrops.map((crop)=>{
          arr.push(crop.quantities)
        })
        return this.selectedCrops.length > 0  && arr.every((qty:number) => qty > 0)
      case 3:
        var arr:any = []
        this.selectedAnimals.map((animals)=>{
          arr.push(animals.quantities)
        })        
        return this.selectedAnimals.length > 0 && arr.every((qty:number) => qty > 0)
      default:
        return false;
    }
  }

  isStepCompleted(step: number): boolean {
    switch (step) {
      case 2:
        var arr:any = []
        this.selectedCrops.map((crop)=>{
          arr.push(crop.yield)
        })
        return this.household_size > 0 
        && this.selectedCrops.length > 0 
        && arr.every((qty:number) => qty > 0) 
        && this.no_economic_trees > 0 
        && this.no_trees > 0;

      case 3:
        return  (this.farmer.name?.trim() !== '') && 
                (this.farmer.phone?.trim() !== '') && 
                (!this.farmer.notify || (this.farmer.phone?.trim() !== ''));
      default:
        return false;
    }
  }

}
