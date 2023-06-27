import { ImageComponent } from "./components/page/item/image.js";
import { PageComponents } from "./components/page/page.js";

class App {
  private readonly page: PageComponents;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponents();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );
    image.attachTo(appRoot, "beforeend");
  }
}

// document.querySelector(".document")이 null일수도 있기 때문에 에러가 발생한다.
// 그래서 뒤에 ! as HTMLElement을 붙여서 null이 아니라 HTMLElement라고 확정해준다. (Type Assertion)
new App(document.querySelector(".document")! as HTMLElement);
