const copyURLButtonTemplate = document.createElement("template");
copyURLButtonTemplate.innerHTML = `
<button class="copy-url-button">
  Copy URL
</button>
`;

class CopyURLButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(copyURLButtonTemplate.content.cloneNode(true));
    shadow.addEventListener("click", this);
  }

  async handleEvent(e) {
    if (e.type === "click") {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      // Provide user feedback
      this.shadowRoot.querySelector(".copy-url-button").innerText = "Copied!";
      setTimeout(() => {
        this.shadowRoot.querySelector(".copy-url-button").innerText =
          "Copy URL";
      }, 2000);
    }
  }
}

customElements.define("copy-url-button", CopyURLButton);
