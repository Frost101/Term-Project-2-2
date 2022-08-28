async function logout() {
  localStorage.clear();
  let result = await fetch("http://localhost:4200/logout", {
    method: "DELETE",
  });
  window.location.replace("http://localhost:4200");
}

function settingName() {
  let setName = document.getElementById("setName");
  let name = localStorage.getItem("NAME");
  setName.innerText = `Welcome ${name}`;
  console.log(setName);
}

settingName();

function addBlood(name){
 localStorage.setItem('Blood_Group',name);
 window.location.replace("http://localhost:4200/receptionist/addBlood");
}

function giveaway(name){
  localStorage.setItem('Blood_Group',name);
  window.location.replace("http://localhost:4200/receptionist/giveaway");
}

async function start() {
  let div1 = document.getElementById("insert");
  div1.innerHTML = "";
  for(let i=1; i<=8; i++){
    div1.innerHTML += `
        <div class="card text-white bg-success mb-3" style="max-width: 60rem;">
        <div class="card-header">
          <div class="row">
              <div class="col-sm-4">
              <p style="color:white"><i>Blood Group:</i> B+</p>
              </div>
              <div class="col-sm-4">
              <p style="color:white"><i>Currently Available:</i> 5 bags</p>
              </div>
              <div class="col-sm-1">
              </div>
              <div class="col-sm-3">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" onclick="addBlood()"class="btn btn-danger">Add Blood</button>
                <button type="button" onclick="giveaway()"class="btn btn-dark">Giveaway</button>
              </div>
              </div>
              
          </div>
        </div>
      </div>
    `;
  }
}

start();
