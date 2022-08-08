function settingName(){
    let setName = document.getElementById('setName');
    let name = localStorage.getItem('NAME');
    setName.innerText = `Welcome Dr. ${name}`;
    console.log(setName);
}

settingName();