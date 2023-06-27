import { BaseComponent } from "../../component.js";

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(
      '<section class="image"><div class="image__holder"><img class="image__thumbnail" /></div><p class="image__title"></p></section>'
    );

    const imageElement = this.element.querySelector(
      ".image__thumbnail"
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      ".image__title"
    )! as HTMLParagraphElement;
    titleElement.textContent = title;
  }

  // BaseComponent 만들기 이전 방식
  // private element: HTMLElement;
  // constructor(title: string, url: string) {
  //   const template = document.createElement("template");
  //   // 사용자가 위험한 코드를 바로 동적으로 만들 수 있기 때문에 아래의 코드에 ${title} 형태로 넣지 않는다.
  //   template.innerHTML = `
  //   <section class="image">
  //     <div class="image__holder">
  //       <img class="image__thumbnail" />
  //     </div>
  //     <p class="image__title"></p>
  //   </section>
  //   `;

  //   this.element = template.content.firstElementChild! as HTMLElement; // section 태그를 가리킨다.

  //   const imageElement = this.element.querySelector(
  //     ".image__thumbnail"
  //   )! as HTMLImageElement;
  //   imageElement.src = url;
  //   imageElement.alt = title;

  //   const titleElement = this.element.querySelector(
  //     ".image__title"
  //   )! as HTMLParagraphElement;
  //   titleElement.textContent = title;
  // }

  // attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin"): void {
  //   parent.insertAdjacentElement(position, this.element);
  // }
}
