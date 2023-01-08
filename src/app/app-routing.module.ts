import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { FirstCheckComponent } from './shared/components/first-check.component';
import { Routing } from './shared/constants/common.constant';
import { AdminGuard } from './shared/guard/admin.guard';
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
    path: Routing.LOGOUT.path,
    loadChildren: () => import('./authentication/components/logout/logout.module').then(m => m.LogoutModule),
    data: {
      title: Routing.LOGOUT.name,
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
    path: Routing.DASHBOARD.path,
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
    data: {
      title: Routing.DASHBOARD.name,
    }
  },
  {
    path: Routing.ADMIN.path,
    loadChildren: () => import('./components/user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AdminGuard],
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
    data: {
      title: Routing.ADMIN.name,
    }
  },
  {
    path: Routing.SETTING.path,
    loadChildren: () => import('./components/setting/setting.module').then(m => m.SettingModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
    data: {
      title: Routing.SETTING.name,
    }
  },
  {
    path: Routing.STORAGE.path,
    loadChildren: () => import('./components/secret-files/secret-files.module').then(m => m.SecretFilesModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
    data: {
      title: Routing.STORAGE.name,
    }
  },
  {
    path: Routing.NOTE_TAKING.path,
    loadChildren: () => import('./components/note-taking/note-taking.module').then(m => m.NoteTakingModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
    data: {
      title: Routing.NOTE_TAKING.name,
    }
  },
  {
    path: Routing.DUTY.path,
    loadChildren: () => import('./components/duty/duty.module').then(m => m.DutyModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
    data: {
      title: Routing.DUTY.name,
    }
  },
  {
    path: Routing.CALENDAR_CONVERTER.path,
    loadChildren: () => import('./components/calendar-converter/calendar-converter.module').then(m => m.CalendarConverterModule),
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
    data: {
      title: Routing.CALENDAR_CONVERTER.name,
    }
  },
  {
    path: Routing.SALARY_CONVERTER.path,
    loadChildren: () => import('./components/salary-converter/salary-converter.module').then(m => m.SalaryConverterModule),
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
    data: {
      title: Routing.SALARY_CONVERTER.name,
    }
  },
  {
    path: Routing.INCOME.path,
    canActivate: [BaseGuard],
    loadChildren: () => import('./components/income/income.module').then(m => m.IncomeModule),
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
    data: {
      title: Routing.INCOME.name,
    }
  },
  {
    path: Routing.PAYMENT.path,
    canActivate: [BaseGuard],
    loadChildren: () => import('./components/payment/payment.module').then(m => m.PaymentModule),
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
    data: {
      title: Routing.PAYMENT.name,
    },

  },
  {
    path: 'trigger-services',
    loadChildren: () => import('./shared/components/swt-trigger-services/swt-trigger-services.module').then(m => m.SwtTriggerServicesModule),
  },
  {
    path: Routing.NOT_FOUND.path,
    loadChildren: () => import('./shared/components/not-found/swt-not-found.module').then(m => m.SWETeamNotFoundModule),
    resolve: {
      resolver: BaseResolver,
    },
    runGuardsAndResolvers: 'always',
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
