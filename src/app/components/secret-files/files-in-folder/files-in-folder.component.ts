import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { FileType } from 'src/app/shared/enumerations/file-type.enum';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { Message } from 'src/app/shared/models/message/message';
import { FileStorage } from 'src/app/shared/models/storage/file/file.model';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { PopupService } from 'src/app/shared/services/base/popup.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Utility } from 'src/app/shared/utils/utility';
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

  @ViewChild("file") fileInput: any;

  @ViewChild("saveFileBtn") saveFileBtn!: SwtButton;

  @ViewChild("clearCacheBtn") clearCacheBtn!: SwtButton;

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
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData(): void {
    this.folderName = this.activatedRoute.snapshot.params["folder"];

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
              isVideo: Utility.isVideo(f.presignedUrl),
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
      }
    })
  }

  /**
   * Obsolete
   */
  selectedFile(files: any) {
    this.formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      this.formData.append('files', files[i], files[i].name);
    }
  }

  /**
   * Obsolete
   */
  resetFiles() {
    this.fileInput.nativeElement.value = null;
    this.formData = new FormData();
  }

  /**
   * Obsolete
   */
  saveFiles() {
    const header = new HttpHeaders();
    header.append('Content-Type', 'undefined');

    this.baseService.takeOriginHttpClient().post<ServiceResult>(`${this.baseService.getApiUrl()}/${this.storageService.serviceName}/storage/upload?folder=${this.folderName}`, this.formData).subscribe(
      response => {
        this.saveFileBtn.isFinished = true;
        this.fileInput.nativeElement.value = null;
        if (response.success) {
          this.loadFileInFolder(this.folderName);
          MessageBox.information(new Message(null, { content: "Uploaded successfully!" }));
        } else {
          MessageBox.information(new Message(null, { content: response.message }));
        }
      },
      error => MessageBox.information(new Message(null, { content: JSON.stringify(error) }))
    );
  }

  clearCache() {
    this.storageService.clearCache(this.folderName).subscribe(response => {
      this.clearCacheBtn.isFinished = true;
      if (response.success) {
        MessageBox.information(new Message(null, { content: "Clear successfully!" }));
      } else {
        MessageBox.information(new Message(null, { content: response.message }));
      }
    })
  }

  openUploader() {
    const config = this.popupService.getBaseConfig();
    config.data = {
      folderName: this.folderName,
    }
    this.diaglog.open(StorageUploadPopupComponent, config).afterClosed().subscribe(
      (response: ServiceResult) => {
        if(response) {
          if (response.success) {
            this.loadFileInFolder(this.folderName);
            MessageBox.information(new Message(null, { content: "Uploaded successfully!" }));
          } else {
            MessageBox.information(new Message(null, { content: response.message }));
          }
        }
      },
      error => MessageBox.information(new Message(null, { content: JSON.stringify(error) }))
    );
  }
}

export class Url {
  public url = "";
  public isVideo = false;
  public fileType: FileType = FileType.None;
}
