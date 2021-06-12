
const title = document.querySelector("#title");

const CLIKED_CLASS = "clicked";

function handleClick () {
	title.classList.toggle(CLIKED_CLASS);
}

function init () {
	title.addEventListener("click", handleClick);	
}

init();
