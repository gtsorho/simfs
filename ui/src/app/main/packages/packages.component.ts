import { Component } from '@angular/core';
import { ClassificationService } from '../classification/classification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { PackagesService } from './packages.service';
import { SliderComponent } from './components/slider/slider.component';


interface farmer {
  id?: string;
  name: string;
  phone: string;
  notify:boolean;
}

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LoaderComponent, SliderComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {

  constructor(private classificationService:ClassificationService, private packagesService:PackagesService){ }

  step: number = 1;
  isMfsResult: boolean = false
  isLoader: boolean = false

  selectedRegion: any = null;
  selectedDistrict: any = null;
  selectedNugget: any = null;
  selectedCrops: any[] = [];
  selectedAnimals: any[] = [];
  selectedActivity: any = null;

  form = {
    region: '',
    valueChain: ''
  };

  districts:any = [];
  zoneSys:any = [];
  farmCrops:any = [];
  farmAnimals:any = [];
  regionsOfGhana: any = [];
  activities: any = [];
  nuggets: any = [];

  
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
    this.getRegions()
    this.getAnimals()
    this.getCrops()


    this.selectedCrops.forEach(crop => {
      this.selectedCropQuantities[crop.id] = crop.quantities;
    });

    this.selectedAnimals.forEach(crop => {
      this.selectedAnimalQuantities[crop.id] = crop.quantities;
    });
  }

  getActivities(id:number){
    this.packagesService.getActivities_per_System(id).subscribe((res)=>{
      this.activities = res
    })
  }

  getNuggets(id:number){
    this.packagesService.getNuggets_per_Activity(id).subscribe((res)=>{
      this.nuggets = res
      console.log(this.nuggets)
    })
  }

  getDistricts(id:number){
    this.packagesService.getDistricts(id).subscribe((res)=>{
      this.districts = res
    })
  }

  getZoneSys(id:number){
    this.packagesService.getZoneSystems(id).subscribe((res)=>{
      this.zoneSys = res
    })
  }

  getRegions(){
    this.packagesService.getRegions().subscribe((res)=>{
      this.regionsOfGhana = res
    })
  }
  
  getDistrict(id:number){
    this.packagesService.getDistrict(id).subscribe((res)=>{
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
  //   console.log(
  //     {
  //       farmer:this.farmer,
  //       zone:[this.selectedCountry, this.selectedRegion],
  //       valueChain:[this.selectedCrops,this.selectedAnimals, {no_economic_trees:this.no_economic_trees, no_trees:this.no_trees, household_size:this.household_size}]

  //     }
  // )

    // this.isLoader = true

    // setTimeout(() => {
    //   this.isMfsResult = true
    //   this.isLoader = false
    // }, 2000);

  }

  // Item Selection *********************************************
  selectRegion(region: any) {
    this.selectedRegion = region;
    this.getDistricts(region.id)
  }
  selectDistrict(district: any) {
    this.selectedDistrict = district;
    this.getZoneSys(this.selectedDistrict.ZoneId)
  }

  selectActivity(activity: any) {
    this.selectedActivity = activity;
    this.getNuggets(this.selectedActivity.id)
  }

  selectNugget(nugget: any) {
    this.selectedNugget = nugget;
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
  }



  isStepCompleted(step: number): boolean {
    switch (step) {
      case 1:
        return this.selectedDistrict && this.selectedRegion;
      case 2:
        return this.selectedActivity !== null

      case 3:
        return  (this.farmer.name?.trim() !== '') && 
                (this.farmer.phone?.trim() !== '') && 
                (!this.farmer.notify || (this.farmer.phone?.trim() !== ''));
      default:
        return false;
    }
  }


}

