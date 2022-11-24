import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { Message } from 'src/app/shared/models/message/message';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { AvatarService } from 'src/app/shared/services/user/avatar.service';

@Component({
  selector: 'app-update-avatar-popup',
  templateUrl: './update-avatar-popup.component.html',
  styleUrls: ['./update-avatar-popup.component.scss']
})
export class UpdateAvatarPopupComponent extends BaseComponent {

  formData = new FormData();

  constructor(
    baseService: BaseService,
    public avatarService: AvatarService,
  ) {
    super(baseService);
  }

  saveFiles() {
    // const header = new HttpHeaders();
    // header.append('Content-Type', 'undefined');

    // this.avatarService.updateAvatar(this.formData).subscribe(
    //   response => {
    //     this.saveFileBtn.isFinished = true;
    //     this.fileInput.nativeElement.value = null;
    //     if (response.success) {
    //       MessageBox.information(new Message(null, { content: "Uploaded successfully!" }));
    //     } else {
    //       MessageBox.information(new Message(null, { content: response.message }));
    //     }
    //   },
    //   error => MessageBox.information(new Message(null, { content: JSON.stringify(error) }))
    // );
  }
}
