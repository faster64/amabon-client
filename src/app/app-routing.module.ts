import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { FirstCheckComponent } from './shared/components/first-check.component';
import { Routing } from './shared/constants/common.constant';
import { BaseGuard } from './shared/guard/base.guard';
import { SignInUpGuard } from './shared/guard/sign-in-up.guard';
import { BaseResolver } from './shared/resolver/base.resolver';
const routes: Routes = [
  {
    path: '',
    component: FirstCheckComponent,
  },
  {
    path: Routing.ACCESS_DENIED.path,
    loadChildren: () => import('./shared/components/access-denied/access-denied.module').then(m => m.AccessDeniedModule),
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: Routing.ACCESS_DENIED.name,
    }
  },
  {
    path: Routing.REGISTER.path,
    loadChildren: () => import('./authentication/components/register-v2/register-v2.module').then(m => m.RegisterV2Module),
    canActivate: [SignInUpGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: Routing.REGISTER.name,
    }
  },
  {
    path: Routing.LOGIN.path,
    loadChildren: () => import('./authentication/components/login/login.module').then(m => m.LoginModule),
    canActivate: [SignInUpGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: Routing.LOGIN.name,
    }
  },
  {
    path: Routing.VERIFY_LOGIN.path,
    loadChildren: () => import('./authentication/components/login-verification/login-verification.module').then(m => m.LoginVerificationModule),
    canActivate: [SignInUpGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: Routing.VERIFY_LOGIN.name,
    }
  },
  {
    path: Routing.SETTING.path,
    loadChildren: () => import('./components/setting/setting.module').then(m => m.SettingModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: Routing.SETTING.name,
    }
  },
  {
    path: Routing.DASHBOARD.path,
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: Routing.DASHBOARD.name,
    }
  },
  {
    path: Routing.SECRET_FILES.path,
    loadChildren: () => import('./components/secret-files/secret-files.module').then(m => m.SecretFilesModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: Routing.SECRET_FILES.name,
    }
  },
  {
    path: Routing.AMAZON_STORAGE.path,
    loadChildren: () => import('./components/amazon-store/amazon-store.module').then(m => m.AmazonStoreModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: Routing.AMAZON_STORAGE.name,
    }
  },
  {
    path: Routing.CALENDAR_CONVERTER.path,
    loadChildren: () => import('./components/calendar-converter/calendar-converter.module').then(m => m.CalendarConverterModule),
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: Routing.CALENDAR_CONVERTER.name,
    }
  },
  {
    path: Routing.NOT_FOUND.path,
    loadChildren: () => import('./shared/components/not-found/swe-team-not-found.module').then(m => m.SWETeamNotFoundModule),
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: Routing.NOT_FOUND.name,
    }
  },
  {
    path: "**",
    redirectTo: `/${Routing.NOT_FOUND.path}`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
