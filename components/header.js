class Header extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		this.innerHTML = `
			<header class="main-header">
                <h1>BetterRH</h1>
				<h5>Get the most out of your games!</h4>
				<nav class="nav main-nav">
                    <a href="index.html">Home</a>
					<a href="faq.html">FAQ</a>
				</nav>
			</header>
            <br>
		`
	}
}

customElements.define("header-component", Header)