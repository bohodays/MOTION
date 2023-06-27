export class PageComponents {
  private element: HTMLUListElement;
  constructor() {
    this.element = document.createElement("ul");
    this.element.setAttribute("class", "page");
    this.element.textContent = "This is PageComponent";
  }

  // position의 타입이 InsertPosition라는 것은 insertAdjacentElement 함수에 대한 설명을 통해 알 수 있다.
  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin"): void {
    parent.insertAdjacentElement(position, this.element);
  }
}
