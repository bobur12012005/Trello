export function reload(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let card = document.createElement('div')
        let cardHeader = document.createElement('div')
        let cardTitle = document.createElement('span')
        let cardContent = document.createElement('div')
        let cardDescription = document.createElement('p')
        let cardFooter = document.createElement('div')
        let dueDate = document.createElement('span')
        let assignee = document.createElement('span')

        card.className = 'card'
        cardHeader.className = 'card-header'
        cardTitle.className = 'card-title'
        cardContent.className = 'card-content'
        cardFooter.className = 'card-footer'
        dueDate.className = 'due-date'
        assignee.className = 'assignee'

        cardTitle.textContent = item.title
        cardDescription.textContent = item.description
        dueDate.textContent = `Due: ${item.date}`
        assignee.textContent = `Assigned to: ${item.username}`

        card.id = item.id

        card.setAttribute('draggable', true)
        cardHeader.appendChild(cardTitle)
        cardContent.appendChild(cardDescription)
        cardFooter.appendChild(dueDate)
        cardFooter.appendChild(assignee)
        card.appendChild(cardHeader)
        card.appendChild(cardContent)
        card.appendChild(cardFooter)

        // card.ondragstart = (event) => {
        //     event.dataTransfer.setData('text/plain', event.target.id)
        //     setTimeout(() => event.target.classList.add('hidden'), 0)
        // }
        // card.ondragend = (event) => {
        //     event.target.classList.remove('hidden')
        // }

        card.ondragstart = () => {
            setTimeout(() => card.classList.add('hidden'), 0)
            // const trash = document.querySelector('.trash')
            // trash.classList.add('active-trash')
        }
        card.ondragend = () => {
            card.classList.remove('hidden')
            // const trash = document.querySelector('.trash')
            // trash.classList.remove('active-trash')
        }

        place[item.status].append(card)
    }
}