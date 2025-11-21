const resetButtonTemplate = document.createElement("template");
resetButtonTemplate.innerHTML = `
<button class="reset-button">
  Reset
</button>
`;

class ResetButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(resetButtonTemplate.content.cloneNode(true));
    shadow.addEventListener("click", this);
  }

  async handleEvent(e) {
    if (e.type === "click") {
      // clear query params
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.toString());

      // clear local storage
      localStorage.removeItem("config");

      // reload page
      window.location.reload();
    }
  }
}

customElements.define("reset-button", ResetButton);
