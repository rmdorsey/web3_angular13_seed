import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ExamplesComponent } from './examples.component';
import { Web3ExamplesComponent } from './web3-examples/web3-examples.component';

const routes: Routes = [{
    path: '',
    component: ExamplesComponent
},
{
    path: 'web3',
    component: Web3ExamplesComponent
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExamplesRoutingModule {}