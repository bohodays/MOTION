import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import {
  Composable,
  PageComponents,
  PageItemComponent,
} from "./components/page/page.js";

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    // page
    this.page = new PageComponents(PageItemComponent);
    this.page.attachTo(appRoot);

    // image
    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );
    this.page.addChild(image);

    // note
    const note = new NoteComponent("Note Title", "Note Body");
    this.page.addChild(note);

    // todo
    const todo = new TodoComponent("Todo Title", "Todo Item");
    this.page.addChild(todo);

    // video
    const video = new VideoComponent(
      "Video Title",
      "https://youtu.be/WJPRA3pXf6Y"
    );
    this.page.addChild(video);

    // dialog
    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imageBtn.addEventListener("click", () => {
      const dialog = new InputDialog();

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });

      dialog.setOnSubmitListener(() => {
        // 섹션을 만들어서 페이지에 추가해준다.
        dialog.removeFrom(document.body);
      });

      dialog.attachTo(document.body);
    });
  }
}

// document.querySelector(".document")이 null일수도 있기 때문에 에러가 발생한다.
// 그래서 뒤에 ! as HTMLElement을 붙여서 null이 아니라 HTMLElement라고 확정해준다. (Type Assertion)
new App(document.querySelector(".document")! as HTMLElement);
