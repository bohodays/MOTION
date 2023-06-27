import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private closeListener?: OnCloseListener;
  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>
        `);

    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: OnCloseListener): void {
    this.closeListener = listener;
  }
}

export class PageComponents
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    // 무조건 상속하는 자식 클래스에서는 super를 이용해서 부모 클래스의 생성자를 호출해야 된다.
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }

  // BaseComponent 만들기 이전 방식
  // private element: HTMLUListElement;
  // constructor() {
  //   this.element = document.createElement("ul");
  //   this.element.setAttribute("class", "page");
  //   this.element.textContent = "This is PageComponent";
  // }
  // // position의 타입이 InsertPosition라는 것은 insertAdjacentElement 함수에 대한 설명을 통해 알 수 있다.
  // attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin"): void {
  //   parent.insertAdjacentElement(position, this.element);
  // }
}
