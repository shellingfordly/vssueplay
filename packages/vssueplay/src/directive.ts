import type { App } from "vue";

let oldClass = "";

function loadingImg(el: HTMLImageElement, value: string) {
  const img = new Image();

  img.src = value;
  img.onload = () => {
    el.setAttribute("class", oldClass);
    el.src = value;
  };
}

export function lazyImgDirective(app: App) {
  app.directive("lazy", {
    mounted(el: HTMLImageElement, binding) {
      el.src = "/loading.svg";
      oldClass = el.getAttribute("class") as string;
      el.setAttribute("class", "w-5 h-5");

      loadingImg(el, binding.value);
    },
    updated(el, binding) {
      loadingImg(el, binding.value);
    },
  });
}
