let addBtn = document.querySelector('.add-btn');
let modal = document.querySelector('.modal-cont');
let addModal = true;
let textArea = document.querySelector('.textarea-cont');
let mainCont = document.querySelector('.main-cont');
let selectedPriorityElement = null;
let colorClass = 'red';
let removeBtn = document.querySelector('.remove-btn');



addBtn.addEventListener('click', function () {
    addBtn.classList.toggle('clicked');
    if (addModal) {
        let defaultPriorityColor = document.querySelector('.priority-color.red');
        defaultPriorityColor.click();
        modal.style.display = 'flex';
        addModal = false;
    } else {
        modal.style.display = 'none';
        addModal = true;
    }
});

textArea.addEventListener('keydown', function (e) {
    let key = e.key;
    let isShiftPressed = e.shiftKey;

    if (key === "Enter" && !isShiftPressed) {
        let enteredText = textArea.value.trim();
        if (enteredText !== "") {
            enteredText = enteredText.replace(/\n/g, '<br>');

            generateTicket(enteredText, colorClass);
            textArea.value = "";
            modal.style.display = 'none';
            addModal = true;
        }
    }
});

function generateRandomHexId() {
    const randomHexId = Math.floor(Math.random() * 0x10000000).toString(16).toUpperCase();

    const paddedHexId = randomHexId.padStart(7, '0');

    return `#${paddedHexId}`;
}



function generateTicket(text, colorClass) {
    const ticketId = generateRandomHexId();
    let ticketCont = document.createElement('div');
    ticketCont.className = 'ticket-cont';
    ticketCont.innerHTML = `<div class="ticket-color ${colorClass}"></div>
                                <div class="ticket-id">${ticketId}</div>
                                <div class="ticket-area">${text}</div>
                                <div class="ticket-lock"><i class="fa-solid fa-lock"></i></div>`;
    mainCont.appendChild(ticketCont);

    let TaskArea = ticketCont.querySelector('.ticket-area');
    let lockUnlockBtn = ticketCont.querySelector('.ticket-lock i');
    lockUnlockBtn.addEventListener('click', function () {
        if (lockUnlockBtn.classList.contains('fa-lock')) {
            lockUnlockBtn.classList.remove('fa-lock');
            lockUnlockBtn.classList.add('fa-lock-open')
            TaskArea.setAttribute('contenteditable', 'true');
        } else {
            lockUnlockBtn.classList.remove('fa-lock-open');
            lockUnlockBtn.classList.add('fa-lock')
            TaskArea.setAttribute('contenteditable', 'false');
        }
    });
}

document.querySelector('.priority-color-cont').addEventListener('click', function (event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('priority-color')) {
        if (selectedPriorityElement) {
            selectedPriorityElement.classList.remove('clicked');
        }
        clickedElement.classList.toggle('clicked');
        selectedPriorityElement = clickedElement;
        colorClass = clickedElement.classList[1];
    }
});

removeBtn.addEventListener('click', function () {
    removeBtn.classList.toggle('clicked');
});
