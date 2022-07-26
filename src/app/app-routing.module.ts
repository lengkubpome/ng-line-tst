import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  {
    path: 'member',
    loadChildren: () =>
      import('./components/member/member.module').then((m) => m.MemberModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./components/product/product.module').then(
        (m) => m.ProductModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
