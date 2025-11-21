const shareButtonTemplate = document.createElement("template");
shareButtonTemplate.innerHTML = `
<style>
  .button {
    border: none;
    outline: 1px solid red
  }
</style>
<button>
  Share
</button>
`;

class ShareButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(shareButtonTemplate.content.cloneNode(true));
    shadow.addEventListener("click", this);
  }

  async handleEvent(e) {
    if (e.type === "click") {
      const shareData = {
        title: "The Font Combinator!",
        text: "Check out this font combination I made!",
        url: window.location.href,
      };
      try {
        await navigator.share(shareData);
        console.log(shareData);
      } catch (err) {
        console.log("Share failed:", err.message);
      }
    }
  }
}

customElements.define("share-button", ShareButton);
