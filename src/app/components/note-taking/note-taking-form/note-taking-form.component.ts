import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { SwtEditorComponent } from 'src/app/shared/components/swt-editor/swt-editor.component';
import { Routing } from 'src/app/shared/constants/common.constant';
import { FormMode } from 'src/app/shared/enumerations/common.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { Message } from 'src/app/shared/models/message/message';
import { Article } from 'src/app/shared/models/note-taking/article.model';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { NoteTakingService } from 'src/app/shared/services/note-taking/note-taking.service';

@Component({
  selector: 'note-taking-form',
  templateUrl: './note-taking-form.component.html',
  styleUrls: ['./note-taking-form.component.scss']
})
export class NoteTakingCreateComponent extends BaseComponent implements AfterViewInit {

  FormMode = FormMode;

  @ViewChild("editor")
  editor!: SwtEditorComponent;

  @ViewChild("saveBtn")
  saveBtn!: SwtButton;

  @ViewChild("cancelBtn")
  cancelBtn!: SwtButton;

  @ViewChild("titleInput")
  titleInput!: DxTextBoxComponent;

  article = new Article();

  maserId = 0;

  formMode: FormMode = FormMode.None;

  constructor(
    baseService: BaseService,
    public noteTakingService: NoteTakingService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.focus();
  }

  initData() {
    super.initData();
    this.maserId = this.activatedRoute.snapshot.params["id"];
    this.formMode = this.activatedRoute.snapshot.data["formMode"];

    if (this.formMode === FormMode.View || this.formMode === FormMode.Edit) {
      this.getMasterData();
    }
  }

  focus() {
    this.titleInput.instance.focus();
  }

  getMasterData() {
    this.isLoading = true;
    this.noteTakingService.getById("", this.maserId).subscribe(response => {
      this.isLoading = false;
      if (response.success) {
        this.article = response.data;
      }
    })
  }

  save() {
    this.article.content = this.editor.valueContent;
    if (!this.validateBeforeSave()) {
      this.saveBtn.isFinished = true;
      return;
    }

    const api = this.formMode === FormMode.Edit ? this.noteTakingService.update("", this.article) : this.noteTakingService.save("", [this.article]);
    api.subscribe(
      response => {
        this.saveBtn.isFinished = true;
        if (response.success) {
          MessageBox.information(new Message(this, { content: "Lưu thành công" }));

          if (this.formMode === FormMode.Add) {
            this.router.navigateByUrl(`/${Routing.NOTE_TAKING.path}`);
          }
          else {
            this.router.navigateByUrl(`/${Routing.NOTE_TAKING.path}/view/${this.maserId}`);
          }

        } else {
          MessageBox.information(new Message(this, { content: response.message }));
        }
      },
      error => {
        this.saveBtn.isFinished = true;
        MessageBox.information(new Message(this, { content: JSON.stringify(error) }));
      }
    );
  }

  cancel() {
    this.router.navigateByUrl(`/${Routing.NOTE_TAKING.path}`);
  }

  validateBeforeSave(): boolean {
    if (StringHelper.isNullOrEmpty(this.article.title)) {
      MessageBox.information(new Message(this, { content: "Tiêu đề không được để trống" }));
      return false;
    }

    if (StringHelper.isNullOrEmpty(this.article.content)) {
      MessageBox.information(new Message(this, { content: "Nội dung không được để trống" }));
      return false;
    }

    return true;
  }

  redirectToEditForm() {
    this.router.navigateByUrl(`/${Routing.NOTE_TAKING.path}/edit/${this.maserId}`);
  }
}
