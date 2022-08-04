

function settingName(){
    let setName = document.getElementById('setName');
    let firstName = localStorage.getItem('FIRST_NAME');
    let lastName = localStorage.getItem('LAST_NAME')
    setName.innerText = `Welcome ${firstName} ${lastName}`;
    console.log(setName);
}

settingName();