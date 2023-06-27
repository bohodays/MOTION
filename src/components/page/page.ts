import { BaseComponent } from "../component.js";

export class PageComponents extends BaseComponent<HTMLUListElement> {
  constructor() {
    // 무조건 상속하는 자식 클래스에서는 super를 이용해서 부모 클래스의 생성자를 호출해야 된다.
    super('<ul class="page">This is PageComponent</ul>');
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
