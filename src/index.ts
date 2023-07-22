import { Repository } from "./@types/Repository";


const domElements = {
    loadingContainer: document.querySelector(".loading-container"),
    userRepoTable: document.querySelector("table.c-user-repo-table"),
    messageElement: document.querySelector("span.message")
};


const urlParams = new URLSearchParams(window.location.search);
const params = ["name"];


function hasParams(urlParams: URLSearchParams, params: Array<string>) {
    return params.every(param => urlParams.has(param));
}


function removeLoading() {
    domElements.loadingContainer?.classList.add("disabled");
}


function setMessage(message: string) {
    if (domElements.messageElement) {
        domElements.messageElement.textContent = message;
    }
}


function createTableRepoRow({ id, name, full_name, html_url: url }: Repository) {
    const tableBody = domElements.userRepoTable?.querySelector("tbody");
    const tableRow = `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${full_name ?? "Not fullname"}</td>
            <td>
                ${url ? `<a  target="_blank"
                href="${url}">${url}</a>` : "Not link" }
            </td>
        </tr>
    `;


    if (tableBody) {
        tableBody.insertAdjacentHTML("beforeend", tableRow);
    }
}


window.addEventListener("load", async () => {
    if (hasParams(urlParams, params)) {
        const name = urlParams.get(params[0]);
        const url = `https://api.github.com/users/${name}/repos`;

        const response = await fetch(url);
        const repos : Repository[] = await response.json();
        removeLoading();
        domElements.userRepoTable?.classList.remove("hidden");
        repos.forEach(repo => {
            createTableRepoRow(repo);
        })
        
    }
    else {
        removeLoading();
        if (domElements.messageElement) {
            domElements.messageElement.classList.remove("hidden");
        }
        setMessage("Nenhum usuário encontrado!!");
    }

});
