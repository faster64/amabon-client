import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './shared/constants/common.constant';
import { BaseGuard } from './shared/guard/base.guard';
import { BaseResolver } from './shared/resolver/base.resolver';
const routes: Routes = [
  {
    path: '',
    redirectTo: Routing.DASHBOARD,
    pathMatch: 'full',
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Tổng quan"
    }
  },
  {
    path: Routing.ACCESS_DENIED,
    loadChildren: () => import('./shared/components/access-denied/access-denied.module').then(m => m.AccessDeniedModule),
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Truy cập bị từ chối"
    }
  },
  {
    path: Routing.REGISTER,
    loadChildren: () => import('./authentication/components/register/register.module').then(m => m.RegisterModule),
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Đăng ký"
    }
  },
  {
    path: Routing.LOGIN,
    loadChildren: () => import('./authentication/components/login/login.module').then(m => m.LoginModule),
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Đăng nhập"
    }
  },
  {
    path: `${Routing.VERIFY_REGISTER}/:mailEncode`,
    loadChildren: () => import('./authentication/components/register-verify/register-verify.module').then(m => m.RegisterVerifyModule),
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Xác thực"
    }
  },
  {
    path: Routing.VERIFY_LOGIN,
    loadChildren: () => import('./authentication/components/login-verify/login-verify.module').then(m => m.LoginVerifyModule),
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Xác thực bảo mật"
    }
  },
  {
    path: Routing.DASHBOARD,
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Amazon3 Management Console"
    }
  },
  {
    path: Routing.SECRET_FILES,
    loadChildren: () => import('./components/secret-files/secret-files.module').then(m => m.SecretFilesModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Amazon3 Files Console"
    }
  },
  {
    path: Routing.AMAZON_STORAGE,
    loadChildren: () => import('./components/amazon-store/amazon-store.module').then(m => m.AmazonStoreModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Amazon3 Store"
    }
  },
  {
    path: Routing.CALENDAR_CONVERTER,
    loadChildren: () => import('./components/calendar-converter/calendar-converter.module').then(m => m.CalendarConverterModule),
    canActivate: [BaseGuard],
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Bộ chuyển đổi lịch"
    }
  },
  {
    path: Routing.NOT_FOUND,
    loadChildren: () => import('./shared/components/not-found/swe-team-not-found.module').then(m => m.SWETeamNotFoundModule),
    resolve: {
      resolver: BaseResolver,
    },
    data: {
      title: "Không tìm thấy :("
    }
  },
  {
    path: "**",
    redirectTo: `/${Routing.NOT_FOUND}`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
