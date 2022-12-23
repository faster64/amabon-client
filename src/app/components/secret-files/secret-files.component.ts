import { Component, OnInit, ViewChild } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { Routing } from 'src/app/shared/constants/common.constant';
import { SessionStorageKey } from 'src/app/shared/constants/sessionstorage.key';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { environment } from 'src/environments/environment';
import { Folder } from 'src/app/shared/models/storage/folder/folder.model';
import { CookieHelper } from 'src/app/shared/helpers/cookie.hepler';
import { CookieKey } from 'src/app/shared/constants/cookie.key';

@Component({
  selector: 'app-secret-files',
  templateUrl: './secret-files.component.html',
  styleUrls: ['./secret-files.component.scss']
})
export class SecretFilesComponent extends BaseComponent {

  passSecurity = false;

  secretKey = "";

  folders: Folder[] = [];

  newFolder = "";

  @ViewChild("commitBtn") commitBtn!: SwtButton;

  @ViewChild("createFolderBtn") createFolderBtn!: SwtButton;

  constructor(
    baseService: BaseService,
    public authenticationService: AuthenticationService,
    public storageService: StorageService,
    public router: Router
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.passSecurity = sessionStorage.getItem(`${environment.team}_${SessionStorageKey.PASSED_SECURITY}`) != null;
    if (this.passSecurity) {
      this.getFolders();
    }
  }



  commit() {
    if (this.secretKey === '') {
      this.commitBtn.isFinished = true;
      return;
    }

    this.authenticationService.verifySecretKey(this.secretKey).subscribe(response => {
      this.commitBtn.isFinished = true;

      if (response.success) {
        this.passSecurity = true;
        CookieHelper.setCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`, response.data, 1/24);

        this.getFolders();
        sessionStorage.setItem(`${environment.team}_${SessionStorageKey.PASSED_SECURITY}`, "passed");

      } else {
        SnackBar.openSnackBarDanger(new SnackBarParameter(this, "Mã bí mật không đúng!"));
      }
    })
  }

  commitByEnter() {
    this.commitBtn.clickExecute(null);
  }

  getFolders() {
    this.isLoading = true;
    this.storageService.getAll().subscribe(response => {
      this.isLoading = false;
      if (response.success) {
        this.folders = response.data;
      }
    })
  }

  redirectToFolder(folderName: string) {
    this.router.navigateByUrl(`/${Routing.STORAGE.path}/view-files/${folderName}`);
  }

  createFolder() {
    if (this.newFolder.trim() !== '') {
      this.storageService.save("", [{ folderName: this.newFolder }]).subscribe(response => {
        this.createFolderBtn.isFinished = true;
        if (response.success) {
          this.newFolder = "";
          this.getFolders();
          MessageBox.information(new Message(this, { content: "Success" }));
        }
      })
    }
    else {
      this.createFolderBtn.isFinished = true;
    }
  }
}
