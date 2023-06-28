import { Component } from "./components/component.js";
import {
  InputDialog,
  MediaData,
  TextData,
} from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import {
  Composable,
  PageComponents,
  PageItemComponent,
} from "./components/page/page.js";

type InputComponentConstructor<T = MediaSectionInput | TextSectionInput> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    // page
    this.page = new PageComponents(PageItemComponent);
    this.page.attachTo(appRoot);

    // dialog

    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );

    // For demo :)
    this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
    this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
    this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
    this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
    this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
    this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        // 섹션을 만들어서 페이지에 추가해준다.
        // image
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

// document.querySelector(".document")이 null일수도 있기 때문에 에러가 발생한다.
// 그래서 뒤에 ! as HTMLElement을 붙여서 null이 아니라 HTMLElement라고 확정해준다. (Type Assertion)
new App(document.querySelector(".document")! as HTMLElement, document.body);
