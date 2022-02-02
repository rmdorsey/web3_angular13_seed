import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesComponent } from './examples.component';
import { ExamplesRoutingModule } from './examples-routing.module';
import { Web3ExamplesComponent } from './web3-examples/web3-examples.component';

@NgModule({
  declarations: [
    ExamplesComponent,
    Web3ExamplesComponent
  ],
  imports: [
    CommonModule,
    ExamplesRoutingModule
  ]
})
export class ExamplesModule { }
