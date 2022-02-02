import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExamplesComponent } from './examples.component';
import { ExamplesRoutingModule } from './examples-routing.module';
import { Web3ExamplesComponent } from './web3-examples/web3-examples.component';
// import { HdWalletAdapterModule } from '@heavy-duty/wallet-adapter';

@NgModule({
  declarations: [
    ExamplesComponent,
    Web3ExamplesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ExamplesRoutingModule,
    // HdWalletAdapterModule.forRoot({ autoConnect: true })
  ]
})
export class ExamplesModule { }
