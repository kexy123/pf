/**
 * Displays a dropdown.
 */
function DisplayDropdown(dropdown, target) {
    target.appendChild(dropdown);
    dropdown.classList.add("dropdown-menu");
    dropdown.style.transform = `translateX(calc(${dropdown.offsetWidth} - 1.5lh))`;
}

/**
 * Displays the table of contents dropdown menu.
 */
function DropdownTOC() {
    
}