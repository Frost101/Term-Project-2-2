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

  async function giveaway(ref){
    console.log(ref.parentNode.childNodes[1].innerText);
    let flag = confirm("Are You Sure About donating this bag?");
    if(flag){
        
    }
  }

  async function start(){
    let div1 = document.getElementById("insert");
    div1.innerHTML = "";
    for(let i=1;i<=10;i++){
        div1.innerHTML += `
        <div class="card text-white bg-success mb-3" style="max-width: 60rem;">
        <div class="card-header">
          <div class="row">

                <div class="col-sm-3">
                    Bag ID: #1234
                </div>
                <div class="col-sm-3">
                    Blood Group: B+
                </div>
                <div class="col-sm-3">
                    Added At: 20-AUG-2022
                </div>
                <div class="col-sm-1">
                </div>
                <div class="col-sm-1">
                <p hidden>1234</p>
                <button type="button" onclick="giveaway(this)"class="btn btn-dark">Giveaway</button>
                </div>


          </div>
        </div>
      </div>
        `;
    }
  }
  start();