let data = [
    {
        firstName: 'Ashton',
        lastName: 'Kutcher',
        age: 40
    }, {
        firstName: 'Bradley',
        lastName: 'Pitt',
        age: 54
    }, {
        firstName: 'Hannah',
        lastName: 'Dakota',
        age: 24
    }
];
const DeleteButton = document.querySelector('.DeleteUser');
const formAddUser = document.querySelector('form');

let tbody = document.querySelector("tbody");

function deleteUser(){
    let deleteTr = this.closest('tr');
    deleteTr.remove();
}
function addUser(firstName, lastName, age){ 
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${age}</td>`
    addTdWithBtns(tr);
    tbody.append(tr);
}
function editRow() {
    const tr = this.closest('tr');
    const tdArr = tr.cells;
    for(let i = 0; i < tdArr.length - 1; i++) {
        const value = tdArr[i].querySelector('input').value;
        tdArr[i].innerHTML = value;
    }
    tdArr[tdArr.length - 1].remove();
    addTdWithBtns(tr);
}
function editUser() {
    let tr = this.closest('tr');
    let tdArr = tr.cells;
    for(let i = 0; i < tdArr.length; i++) {
        if(tdArr[i].classList.contains('btns_td')) {
            console.log(tdArr[i]);
            tdArr[i].innerHTML = `<button class="submit_btn">ok</button>
                                <button class="cancel_btn">cancel</button>`;
            const submitBtn = tdArr[i].querySelector('.submit_btn');
            submitBtn.addEventListener('click', editRow);
            const cancelBtn = tdArr[i].querySelector('.cancel_btn');
            cancelBtn.addEventListener('click', editRow);
        } else { 
            let tdValue = tdArr[i].innerHTML;
            let input = document.createElement('input');
            input.value = tdValue;
            tdArr[i].innerHTML = '';
            tdArr[i].append(input);
        }
    }
}
function addTdWithBtns(tr) {
    let editUserBtn = document.createElement('button')
    let deleteUserBtn = document.createElement('button');
    let btnsTd = document.createElement('td');

    editUserBtn.className = 'edit_user_btn';
    deleteUserBtn.className = 'delete_user_btn';
    btnsTd.className = 'btns_td';

    editUserBtn.addEventListener('click', editUser);
    deleteUserBtn.addEventListener('click', deleteUser);

    editUserBtn.innerHTML = 'edit';
    deleteUserBtn.innerHTML = 'delete'

    btnsTd.append(editUserBtn);
    btnsTd.append(deleteUserBtn);
    tr.append(btnsTd);
}


for (let i = 0; i < data.length; i++ ) {
    let tr = document.createElement("tr");

    for (let item in data[i]) {
        let td = document.createElement("td");
        td.innerHTML = data[i][item];
        tr.append(td)
    }
    addTdWithBtns(tr);
    tbody.append(tr);
}

formAddUser.addEventListener('submit', (event) => {
    console.log(event);
    event.preventDefault();
    let inputNameValue = event.target.querySelector('.input_name').value;
    let inputSecondNameValue = event.target.querySelector('.input_second_name').value;
    let inputAgeValue = event.target.querySelector('.input_age').value;
    addUser(inputNameValue, inputSecondNameValue, inputAgeValue);
    formAddUser.reset();
});

