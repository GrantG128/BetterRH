class Header extends HTMLElement {
	constructor() {
		super()
	}

	handleDarkMode() {
		const darkModeSwitch = document.getElementById('dark-mode-switch')
		darkModeSwitch.addEventListener('change', function () {
			document.body.classList.toggle('dark-mode')
			localStorage.setItem('darkMode', darkModeSwitch.checked)
		})

		if (localStorage.getItem('darkMode') === 'true') {
			document.body.classList.add('dark-mode')
			darkModeSwitch.checked = 'true'
		}
	}

	connectedCallback() {
		this.innerHTML = `
			<header class="main-header">
				<span class="dark-mode-toggle">
					<input type="checkbox" id="dark-mode-switch" class="toggle-switch">
					<label for="dark-mode-switch" class="toggle-label"></label>
				</span>
                <h1>BetterRH</h1>
				<h5>Get the most out of your games!</h4>
				<nav class="nav main-nav">
                    <a href="index.html">Home</a>
					<a href="faq.html">FAQ</a>
				</nav>

				</header>
            <br>
		`

		this.handleDarkMode()
	}
}

customElements.define("header-component", Header)