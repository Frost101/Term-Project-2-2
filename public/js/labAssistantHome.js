function settingName(){
    let setName = document.getElementById('setName');
    let name = localStorage.getItem('NAME');
    setName.innerText = `Welcome ${name}`;
    console.log(setName);
}

settingName();