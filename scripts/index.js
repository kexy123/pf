const navigationForm = performance.getEntriesByType("navigation");

const locationHash = location.hash.substring(1);
var locationId;

const externalLink = /^https/;


/**
 * Shows the sections in an animated form.
 */
async function AnimateSections() {
    let sections = document.querySelectorAll("main > section");
    for (let section of sections) {
        await new Promise(resolve => setTimeout(resolve, 100));
        section.style.top = "0";
        section.style.opacity = "1";
    }
}

/**
 * Shows the sections immediately.
 */
function ShowSectionsImmediately() {
    let sections = document.querySelectorAll("main > section");
    for (let section of sections) {
        section.style.transition = "none";
        section.style.top = "0";
        section.style.opacity = "1";
    }
}

/**
 * Forces hyperlinks to create a new tab.
 */
function ChangeHyperlinks() {
    let links = document.querySelectorAll("a");
    for (let link of links) {
        if (!externalLink.test(link.href)) continue;
        link.classList.add("external");
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    }
}

/**
 * Adds the alt caption of the image as the title.
 */
function AltToTitle() {
    let images = document.querySelectorAll("img");
    for (let image of images) {
        image.title = image.alt;
    }
}

/**
 * Initiates the sidebar contents navigation.
 */
function InitiateNavigation() {
    let sidebar = document.querySelector("nav.content-list");
    console.log(sidebar);
    if (!sidebar) return;
    console.log(getOffset(sidebar));
    sidebar.style.top = `${getOffset(sidebar)}px`;
}

/**
 * Updates the header height.
 */
function UpdateHeaderHeight() {
    let header = document.querySelector("header");
    document.documentElement.style.setProperty("--header-height", header.offsetHeight + "px");
}

document.addEventListener("DOMContentLoaded", () => {
    if (navigationForm.length > 0 && navigationForm[0].type == "reload") {
        ShowSectionsImmediately();
    } else {
        AnimateSections();
    }

    ChangeHyperlinks();
    AltToTitle();
    UpdateHeaderHeight();

    locationId = document.getElementById("header-" + locationHash);
    if (locationId) {
        locationId.scrollIntoView();
        locationId.classList.add("hash-selected");
    }
})

window.addEventListener("resize", () => {
    UpdateHeaderHeight();
})

window.addEventListener("hashchange", () => {
    const locationHash = location.hash.slice(1);
    if (locationId) {
        locationId.classList.remove("hash-selected");
    }

    locationId = document.getElementById("header-" + locationHash);
    if (locationId) {
        locationId.scrollIntoView();
        locationId.classList.add("hash-selected");
    }
});