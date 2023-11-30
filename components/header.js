class Header extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		this.innerHTML = `
			<header class="main-header">
                <h1>RH Improvements</h1>
				<nav class="nav main-nav">
                    <a href="index.html">Home</a>
                    <a href="about.html">About</a>
                    <a href="contact.html">Contact</a>
				</nav>
			</header>
            <br>
		`
	}
}

customElements.define("header-component", Header)