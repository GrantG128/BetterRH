class Footer extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		this.innerHTML = `
            <br>
			<footer class="main-footer">
				<nav class="nav main-nav">
                    <a href="index.html">Home</a>
                    <a href="about.html">About</a>
                    <a href="contact.html">Contact</a>
				</nav>
                <small>2023 <a href="https://github.com/Mips96" target="_blank">Mips96</a></small>
			</footer>
		`
	}
}

customElements.define("footer-component", Footer)