import { HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { FileType } from 'src/app/shared/enumerations/file-type.enum';
import { File } from 'src/app/shared/models/amazon-file/file/file.model';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { Message } from 'src/app/shared/models/message/message';
import { AmazonFileService } from 'src/app/shared/services/amazon-file/amazon-file.service';
import { BaseService } from 'src/app/shared/services/base/base.service';

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

  constructor(
    baseService: BaseService,
    public amazonFileService: AmazonFileService,
    public activatedRoute: ActivatedRoute
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
    this.amazonFileService.loadFilesInFolder(folderName, this.paginationRequest).subscribe({
      next: response => {
        this.isLoading = false;
        if (response.success) {
          this.urls = response.data.map((f: File) => {
            return {
              url: f.presignedUrl,
              isVideo: this.isVideo(f.presignedUrl),
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

  isVideo(url: string) {
    const videoExtensions = [
      "m2v",
      "mpg",
      "mp2",
      "mpeg",
      "mpe",
      "mpv",
      "mp4",
      "m4p",
      "m4v",
      "mov",
    ];

    return videoExtensions.find(ext => url.toLowerCase().includes(`.${ext}`)) != null;
  }

  isImage(url: string) {
    const imageExtensions = [
      "apng",
      "avif",
      "gif",
      "jpg",
      "jpeg",
      "jfif",
      "pjpeg ",
      "pjp",
      "png",
      "svg",
      "webp",
    ];

    return imageExtensions.find(ext => url.toLowerCase().includes(`.${ext}`)) != null;
  }

  selectedFile(files: any) {
    this.formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      this.formData.append('files', files[i], files[i].name);
    }
  }

  resetFiles() {
    this.fileInput.nativeElement.value = null;
    this.formData = new FormData();
  }

  saveFiles() {
    const header = new HttpHeaders();
    header.append('Content-Type', 'undefined');

    this.baseService.takeOriginHttpClient().post<ServiceResult>(`${this.baseService.getApiUrl()}/ams/amazon-file/upload?folder=${this.folderName}`, this.formData).subscribe(
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
    this.amazonFileService.clearCache(this.folderName).subscribe(response => {
      this.clearCacheBtn.isFinished = true;
      if (response.success) {
        MessageBox.information(new Message(null, { content: "Clear successfully!" }));
      } else {
        MessageBox.information(new Message(null, { content: response.message }));
      }
    })
  }
}

export class Url {
  public url = "";
  public isVideo = false;
  public fileType: FileType = FileType.None;
}
