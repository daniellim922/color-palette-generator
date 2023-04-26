const form = document.getElementById("form");
console.log(form.action);
const url = form.action;

function submitForm() {
    const input = document.querySelector(".form-control").value;
    postJSON(url, { data: input }).then((colors) => {
        const mainBox = document.querySelector(".main-box");
        mainBox.innerHTML = "";

        colors.forEach((color) => {
            const div = document.createElement("div");
            div.style.backgroundColor = color;
            div.classList = "pt-5";
            hexCode(div, color);
            div.style.width = "100%";
            mainBox.insertAdjacentElement("afterbegin", div);
        });
    });
}

function hexCode(div, color) {
    const p = document.createElement("p");
    const text = `
    ${color} 
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
        <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
    </svg>`;
    p.innerHTML = text;
    p.classList = "text-center fs-4 text-primary";
    p.style.cursor = "pointer";
    p.addEventListener("click", () => {
        navigator.clipboard
            .writeText(color)
            .then(() => alert(`${color} copied to clipboard!`));
    });
    div.insertAdjacentElement("afterbegin", p);
}
