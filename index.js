const navigationForm = performance.getEntriesByType("navigation");

const locationHash = location.hash.substring(1);
var locationId;

const externalLink = /^https/;

/**
 * Shows the sections in an animated form.
 */
async function AnimateSections() {
    let sections = document.querySelectorAll("main > div.section");
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
    let sections = document.querySelectorAll("main > div.section");
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

document.addEventListener("DOMContentLoaded", () => {
    if (navigationForm.length > 0 && navigationForm[0].type == "reload") {
        ShowSectionsImmediately();
    } else {
        AnimateSections();
    }

    ChangeHyperlinks();

    locationId = document.getElementById("header-" + locationHash);
    if (locationId) {
        locationId.scrollIntoView();
        locationId.classList.add("hash-selected");
    }
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