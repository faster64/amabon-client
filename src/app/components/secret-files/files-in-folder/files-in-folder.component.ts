import { HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { SessionStorageKey } from 'src/app/shared/constants/sessionstorage.key';
import { FileType } from 'src/app/shared/enumerations/file-type.enum';
import { HttpStatusCodeExtension } from 'src/app/shared/enumerations/http-status-code-extension.enum';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { FileStorage } from 'src/app/shared/models/storage/file/file.model';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { PopupService } from 'src/app/shared/services/base/popup.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Utility } from 'src/app/shared/utils/utility';
import { environment } from 'src/environments/environment';
import { MoveFilePopupComponent } from '../move-file-popup/move-file-popup.component';
import { StorageUploadPopupComponent } from '../storage-upload-popup/storage-upload-popup.component';

@Component({
  selector: 'app-files-in-folder',
  templateUrl: './files-in-folder.component.html',
  styleUrls: ['./files-in-folder.component.scss']
})
export class FilesInFolderComponent extends BaseComponent {

  urls: Url[] = [];

  folderName = "";

  imageCount = 0;

  videoCount = 0;

  formData = new FormData();

  isDeleting = false;

  @ViewChild("file") fileInput: any;

  @ViewChild("saveFileBtn") saveFileBtn!: SwtButton;

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // const currentScrollValue = event.target.offsetHeight + event.target.scrollTop;
    // console.log(event.target.scrollHeight, currentScrollValue)
  }

  constructor(
    baseService: BaseService,
    public storageService: StorageService,
    public activatedRoute: ActivatedRoute,
    public diaglog: MatDialog,
    public popupService: PopupService,
    public router: Router,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData(): void {
    this.folderName = atob(this.activatedRoute.snapshot.params["folder"]);

    this.paginationRequest.pageIndex = 1;
    this.paginationRequest.pageSize = 5;
    this.loadFileInFolder(this.folderName);
  }

  loadFileInFolder(folderName: string) {
    this.isLoading = true;
    this.storageService.loadFilesInFolder(folderName).subscribe({
      next: response => {
        this.isLoading = false;
        if (response.success) {
          this.urls = response.data.map((f: FileStorage) => {
            return {
              url: f.presignedUrl,
              fileName: f.fileName,
              isVideo: Utility.isVideo(f.presignedUrl),
              checked: false,
            }
          });

          this.urls.sort((a, b) => {
            if (a.isVideo && b.isVideo)
              return 0;
            if (a.isVideo && !b.isVideo)
              return 1;

            return -1;
          });

          this.imageCount = this.urls.filter(x => !x.isVideo).length;
          this.videoCount = this.urls.length - this.imageCount;
        }
        else {
          MessageBox.information(new Message(null, { content: response.message }));
        }
      },
      error: error => {
        this.isLoading = false
        if (error?.code == HttpStatusCode.Forbidden) {
          sessionStorage.removeItem(`${environment.team}_${SessionStorageKey.PASSED_SECURITY}`);
          this.router.navigate([`/${this.Routing.STORAGE.path}`], { queryParams: { continue: btoa(this.folderName) } });
        }
      }
    });
  }

  clearCache() {
    this.storageService.clearCache(this.folderName).subscribe(
      response => {
        if (response.success) {
          this.loadFileInFolder(this.folderName);
          SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Làm mới dữ liệu thành công"));
        } else {
          MessageBox.information(new Message(null, { content: response.message }));
        }
      },
      error => {
        if (error?.code == HttpStatusCode.Forbidden) {
          sessionStorage.removeItem(`${environment.team}_${SessionStorageKey.PASSED_SECURITY}`);
          this.router.navigate([`/${this.Routing.STORAGE.path}`], { queryParams: { continue: btoa(this.folderName) } });
        }
      }
    )
  }

  openUploader() {
    const config = this.popupService.getBaseConfig();
    config.data = {
      folderName: this.folderName,
    }
    this.diaglog.open(StorageUploadPopupComponent, config).afterClosed().subscribe(
      (response: ServiceResult) => {
        if (response) {
          if (response.success) {
            SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Tải lên thành công"));
            this.loadFileInFolder(this.folderName);
          } else {
            MessageBox.information(new Message(null, { content: response.message }));
          }
        }
      },
      error => MessageBox.information(new Message(null, { content: JSON.stringify(error) }))
    );
  }

  confirmDelete() {
    MessageBox.confirmDelete(new Message(this, { content: "Bạn có chắc chắn muốn xóa các tệp này không?" })).subscribe(agree => {
      if (agree) {
        this.delete();
      }
    });
  }

  anyChecked() {
    return this.urls.findIndex(u => u.checked) !== - 1;
  }

  delete() {
    this.isDeleting = true;
    const checkedFileNames = this.urls.filter(u => u.checked).map(u => u.fileName);
    this.storageService.deleteFiles(this.folderName, checkedFileNames).subscribe(
      response => {
        this.isDeleting = false;
        if (response.success) {
          SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Xóa thành công"));
          this.loadFileInFolder(this.folderName);
        } else {
          MessageBox.information(new Message(this, { content: response.message }));
        }
      },
      () => this.isDeleting = false
    )
  }

  move() {
    const config = new MatDialogConfig();
    config.width = '80%';
    config.height = '80%';
    config.data = {
      folder: this.folderName,
      files: this.urls
    };
    this.diaglog.open(MoveFilePopupComponent, config).afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.loadFileInFolder(this.folderName);
      }
    });
  }
}

export class Url {
  public url = "";
  public fileName = "";
  public isVideo = false;
  public fileType: FileType = FileType.None;
  public checked: any;
}
