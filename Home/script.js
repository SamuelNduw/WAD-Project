document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector("[data-resize-btn]");
    const body = document.body;
  
    toggleButton.addEventListener("click", (e) => {
      e.preventDefault();
      body.classList.toggle("sb-expanded");
    });
});
