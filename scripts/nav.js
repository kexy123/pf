var currentHeader;

/**
 * Generates a table of contents.
 */
function GenerateTableOfContents(article) {
    let nav = document.createElement("nav");
    nav.classList.add("content-list");

    let header = document.createElement("h1");
    header.innerText = "Contents";

    nav.appendChild(header);

    let headers = article.querySelectorAll("h1, h2, h3, h4, h5, h6");
    let index = 1;
    for (let header of headers) {
        if (!header.id) continue;
        let link = document.createElement("a");
        link.href = "#" + header.id;
        link.classList.add(header.tagName);
        link.id = "link-header-" + header.id;
        link.tabIndex = index;
        link.innerHTML = header.innerHTML;
        header.id = "header-" + header.id;
        nav.appendChild(link);
        index++;
    }

    return nav;
}

/**
 * Highlights the header.
 */
function HighlightHeader(id) {
    if (currentHeader) {
        let link = document.querySelector("nav a.current-sidebar-nav");
        link.classList.remove("current-sidebar-nav");
    }
    let link = document.querySelector(`nav a#link-header-${id}`);
    link.classList.add("current-sidebar-nav");
    currentHeader = id;
}

/**
 * Goes to the header.
 */
function GoToHeader(id) {
    locationId = document.getElementById("header-" + id);
    if (locationId) {
        locationId.scrollIntoView();
        document.scrollingElement.scrollBy(0, -headerHeight - 13);
        locationId.classList.add("hash-selected");
        HighlightHeader(id);
    }
}