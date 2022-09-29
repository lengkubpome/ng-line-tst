import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'member',
    loadChildren: () =>
      import('./features/member/member.module').then((m) => m.MemberModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/product.module').then((m) => m.ProductModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
