const dropArea = document.querySelector(".dropArea");

class DragAndDrop {
  constructor(element) {
    this.element = element;
    this.fileInput = element.querySelector("input");
    this.uploadList = element.querySelector(".uploadList");
  }

  initEventListeners() {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      this.element.addEventListener(
        eventName,
        (e) => {
          this.preventDefaults(e);
        },
        false
      );
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      this.element.addEventListener(
        eventName,
        () => {
          this.highlight();
        },
        false
      );
    });
    ["dragleave", "drop"].forEach((eventName) => {
      this.element.addEventListener(
        eventName,
        () => {
          this.unhighlight();
        },
        false
      );
    });

    this.element.addEventListener(
      "drop",
      (e) => {
        this.handleDrop(e);
      },
      false
    );

    this.fileInput.addEventListener("change", (e) => {
      this.fileInputOnChange();
    });
  }

  preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  highlight() {
    this.element.classList.add("highlight");
  }

  unhighlight() {
    this.element.classList.remove("highlight");
  }

  handleDrop(event) {
    const files = event.dataTransfer.files;
    this.fileInput.files = files;
    this.fileInputOnChange();
  }

  fileInputOnChange() {
    [...this.fileInput.files].forEach((file) => {
      this.previewFile(file);
      this.uploadFile();
    });
  }

  previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const item = `
        <li class="uploadItem">
          <span>${file.name}</span>
        </li>
      `;
      this.uploadList.insertAdjacentHTML("beforeend", item);
    };
  }

  uploadFile() {
    // upload file to server
  }
}

new DragAndDrop(dropArea).initEventListeners();
