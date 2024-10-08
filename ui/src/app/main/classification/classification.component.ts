import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './classification.component.html',
  styleUrl: './classification.component.scss'
})
export class ClassificationComponent {
  step: number = 1;
  stepEco: number = 1;
  isMfsResult: boolean = false
  isLoader: boolean = false

  selectedRegion: any = null;
  selectedCrops: any[] = [];
  selectedAnimals: any[] = [];

  form = {
    region: '',
    valueChain: ''
  };

  regionsOfGhana: any = [
    { id: 1, name: "Ahafo" },
    { id: 2, name: "Ashanti" },
    { id: 3, name: "Bono" },
    { id: 4, name: "Bono East" },
    { id: 5, name: "Central" },
    { id: 6, name: "Eastern" },
    { id: 7, name: "Greater Accra" },
    { id: 8, name: "Northern" },
    { id: 9, name: "North East" },
    { id: 10, name: "Oti" },
    { id: 11, name: "Savannah" },
    { id: 12, name: "Upper East" },
    { id: 13, name: "Upper West" },
    { id: 14, name: "Volta" },
    { id: 15, name: "Western" },
    { id: 16, name: "Western North" }
  ];

  farmCrops:any = [
    { id: 1, name: "Maize" },
    { id: 2, name: "Rice" },
    { id: 3, name: "Cassava" },
    { id: 4, name: "Yam" },
    { id: 8, name: "Pepper" },
    { id: 9, name: "Groundnut" },
    { id: 10, name: "Sorghum" },
    { id: 11, name: "Millet" },
    { id: 14, name: "Soybean" },
    { id: 15, name: "Cowpea" },
    { id: 18, name: "Cashew" },
  ];
  
  farmAnimals:any = [
    { id: 1, name: "Cattle" },
    { id: 2, name: "Goat" },
    { id: 3, name: "Sheep" },
    { id: 4, name: "Pig" },
    { id: 5, name: "Chicken" },
    { id: 6, name: "Duck" },
    { id: 7, name: "Turkey" },
    { id: 9, name: "Guinea Fowl" },
    { id: 10, name: "Donkey" },
  ];
  
  

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

  submitForm() {
    this.isLoader = true

    setTimeout(() => {
      this.isMfsResult = true
      this.isLoader = false
    }, 2000);

  }

  selectRegion(region: any) {
    this.selectedRegion = region;
  }

  toggleCropSelection(crop: any) {
    const index = this.selectedCrops.findIndex((c) => c.id === crop.id);
    if (index === -1) {
      this.selectedCrops.push({ ...crop, quantities: 0 });
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
      this.selectedAnimals.push({ ...animal, quantities: 0 });
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
}
