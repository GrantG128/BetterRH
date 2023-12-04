class TableGenerator extends HTMLElement {
    constructor() {
        super()
    }

    getCellText(row, column) {
        const cell = row.querySelector(`td:nth-child(${column + 1})`)
        return cell ? cell.textContent.trim() : '' // Handle null or undefined cells
    }

    sortTableByColumn(table, column, asc = true) {
        const dirModifier = asc ? 1 : -1
        const tBody = table.tBodies[0]
        const rows = Array.from(tBody.querySelectorAll("tr"))

        // Sort each row
        const sortedRows = rows.sort((rowA, rowB) => {
            const cellTextA = this.getCellText(rowA, column)
            const cellTextB = this.getCellText(rowB, column)

            return cellTextA.localeCompare(cellTextB) * dirModifier
        })

        // Remove all existing TRs from the table
        while (tBody.firstChild) {
            tBody.removeChild(tBody.firstChild)
        }

        // Re-add the newly sorted rows
        tBody.append(...sortedRows)

        // Remember how the column is currently sorted
        table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"))
        table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc)
        table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc)
    }

    async getRowsFromCSV() {
        let csvFileURL = "data/hack_db.csv"
        var result = []

        try {
            const response = await fetch(csvFileURL)
            const csvData = await response.text()

            var lines = csvData.split('\n')
            for (var i = 1; i < lines.length; i++) {
                var currentLine = lines[i].split('\t')
                result.push(currentLine)
            }
            return this.convertRows(result)
        } catch (error) {
            console.error('Error fetching CSV:', error)
            throw error
        }
    }

    convertRows(rows) {
        let string = ``
        // for (let [index, row] of rows.entries()) {
        for (let row of rows) {
            if (row == "") {
                break
            }
            string += `<tr>`
            string += `<td class="centered">` + row[row.length - 1] + `</td>`
            string += `<td>` + row[0] + `</td>`
            string += `<td>` + row[1] + `</td>`
            if (row[3] != "") {
                string += `<td><a href="` + row[3] + `" target="_blank">` + row[2] + `</a></td>`
            } else {
                string += `<td>` + row[2] + `</td>`
            }
            string += `<td class="cell-creator">` + row[4] + `</td>`
            string += `<td class="cell-description">` + row[5] + `</td>`
            for (let col = 6; col < row.length - 1; col++) {
                if (row[col] == "1") {
                    string += `<td class="cell-bool">✔</td>`
                } else {
                    string += `<td class="cell-bool">❌</td>`
                }
            }
            string += `</tr>`
        }
        return string
    }



    async createTable() {
        let fullTable = `
        <div class="div-table">
            <table class="table-sortable" id="table-hacks">
                <thead>
                    <tr>
                        <th>Date Added</th>
                        <th>System</th>
                        <th>Original Game</th>
                        <th>Hack</th>
                        <th>Creator</th>
                        <th>Description</th>
                        <th>Bug Fix</th>
                        <th>Relocalization<br>/ Text Edit</th>
                        <th>Balance<br>Hack</th>
                        <th>Content<br>Restoration</th>
                        <th>Connectivity<br>Requirement<br>Removal</th>
                        <th>Controls<br>Edit</th>
                        <th>Graphics<br>Edit</th>
                        <th>Hardware<br>Enhancement</th>
                        <th>Battery<br>Save<br>Addition</th>
                    </tr>
                </thead>
                <tbody>`
        await this.getRowsFromCSV().then(result => {
            fullTable += result
        }).catch(error => {
            console.error('Error:', error)
        })
        fullTable += `
                </tbody>
            </table>
        </div>
		`
        this.innerHTML = fullTable
    }

    handleTableSorting() {
        document.querySelectorAll(".table-sortable th").forEach(headerCell => {
            headerCell.addEventListener("click", () => {
                const tableElement = headerCell.parentElement.parentElement.parentElement
                const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell)
                const currentIsAscending = headerCell.classList.contains("th-sort-asc")

                this.sortTableByColumn(tableElement, headerIndex, !currentIsAscending)
            })
        })
    }

    handleExpandableDescriptions() {
        document.querySelectorAll(".cell-description").forEach(descriptionCell => {
            descriptionCell.addEventListener("click", () => {
                descriptionCell.classList.toggle('cell-description-expanded')
            })
        })
    }

    handleFilters() {
        const table = document.getElementById('table-hacks')
        document.querySelectorAll(".filters-box input").forEach((filter_checkbox, index) => {
            filter_checkbox.addEventListener('change', function () {
                console.log(index)
                if (index == "0") {
                    var cells = table.querySelectorAll(`tr > *:nth-child(1)`)
                } else {
                    var cells = table.querySelectorAll(`tr > *:nth-child(${index + 6})`)
                }

                if (this.checked) {
                    cells.forEach(cell => {
                        cell.style.display = ''
                    })
                } else {
                    cells.forEach(cell => {
                        cell.style.display = 'none'
                    })
                }
            })
        })
    }



    async connectedCallback() {
        await this.createTable()
        this.handleTableSorting()
        this.handleExpandableDescriptions()
        this.handleFilters()

        this.sortTableByColumn(document.getElementById("table-hacks"), 0, false)
    }
}

customElements.define("tablegen-component", TableGenerator)