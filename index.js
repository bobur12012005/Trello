import axios from "axios"
import { reload } from "./modules/ui.js"
import ApiHandler from "./modules/http.request.js"

const cols = document.querySelectorAll('.collumns-container .box .cont')
const api = new ApiHandler('http://localhost:8080')

let form = document.forms.namedItem('add-todo')
let baseURL = 'http://localhost:8080'
let button = document.querySelector('#create')
let modal = document.querySelector('#modal')
button.onclick = () => {
    modal.style.display = 'flex'
}

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(event.target)

    let task = {
        id: String(Math.random()),
        title: fm.get('title'),
        description: fm.get('description'),
        username: fm.get('username'),
        status: fm.get('status'),
        date: new Date().toLocaleDateString()
    }

    let { title, description } = task

    if (!title || !description) return

    axios.post(baseURL + '/todos', task)
        .then(res => {
            if (res.status == 200 || res.status === 201) {
                modal.style.display = 'none'
                updateData()
            }
        })
}

for (let col of cols) {
    // col.ondragover = (event) => {
    //     event.preventDefault()
    // }
    // col.ondrop = async (event) => {
    //     event.preventDefault()
    //     let cardId = event.dataTransfer.getData('text/plain')
    //     let draggedCard = document.getElementById(cardId)
    //     col.appendChild(draggedCard)

    //     const selected = document.querySelector('.hidden')
    //     const prev = selected.parentElement.dataset.col

    //     col.append(selected)

    //     axios.patch(baseURL + `/tasks/${selected.id}`, {status: col.dataset.col})
    //         .then(res => {
    //             if (res.status !== 200 && res.status !== 201) {
    //                 cols[prev].lastElementChild.append(selected)
    //                 alert('Network Error')
    //             }
    //         })
    // }

    col.ondragover = (e) => {
        e.preventDefault();
    }
    col.ondragenter = (e) => {
        e.preventDefault();
        col.classList.add('hovered')
    }
    col.ondragleave = () => {
        col.classList.remove('hovered')
    }
    col.ondrop = async () => {
        const selected = document.querySelector('.hidden')
        const prev = selected.parentElement.dataset.col

        col.append(selected)
        col.classList.remove('hovered')

        const res = await api.patchData(`/tasks/${selected.id}`, { status: col.dataset.col })

        if (res.status !== 200 && res.status !== 201) {
            cols[prev].lastElementChild.append(selected)
            alert('Network Error')
        }
    }
}

updateData()

function updateData() {
    axios.get(baseURL + '/todos')
        .then(res => {
            reload(res.data, cols)
        })
}