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

async function add() {
  let nameErr = document.getElementById("nameErr");
  nameErr.style.display = "none";
  let nidErr = document.getElementById("nidErr");
  nidErr.style.display = "none";
  let bloodGroupErr = document.getElementById("bloodGroupErr");
  bloodGroupErr.style.display = "none";

  let name = document.getElementById("name").value;
  let nid = document.getElementById("nid").value;
  let bloodGroup = document.getElementById("bloodGroup").value;
  console.log(bloodGroup);
  if (name === "" || nid === "" || bloodGroup === "Select") {
    if (name === "") {
      nameErr = document.getElementById("nameErr");
      nameErr.style.display = "block";
    }
    if (nid === "") {
      nidErr = document.getElementById("nidErr");
      nidErr.style.display = "block";
    }
    if (bloodGroup === "Select") {
      bloodGroupErr = document.getElementById("bloodGroupErr");
      bloodGroupErr.style.display = "block";
    }
  } else {
  }
}

async function start() {
  let div1 = document.getElementById("insert");
  div1.innerHTML = "";
  div1.innerHTML = `
        <div class = "row">
            <div class = "col-sm-8">
                <div class="form-group" style="border-color:#098927;">
                <label style="color: #098927;border-color: #098927;" for="name">Donor's Name</label>
                <input style="color: #098927;border-color: #098927;" type="text" class="form-control"  id="name" value="" placeholder="Enter Name">
                <p id="nameErr" style="color:red;display:none">Fill up the above text box correctly</p>
                </div>
            </div>
        </div>
        <div class = "row">
            <div class = "col-sm-8">
                <div class="form-group" style="border-color:#098927;">
                <label style="color: #098927;border-color: #098927;" for="nid">Donor's NID</label>
                <input style="color: #098927;border-color: #098927;" type="text" class="form-control"  id="nid" value="" placeholder="NID">
                <p id="nidErr" style="color:red;display:none">Fill up the above text box correctly</p>
                </div>
            </div>
        </div>
        <div class = "row">
            <div class = "col-sm-8">
                <label style="color: #098927" for="bloodGroup">Blood Group</label>
                <select id="bloodGroup" style="color: #098927" class="form-control border-success" id="bloodGroup">
                    <option selected disabled>Select</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                </select>
                <p id="bloodGroupErr" style="color:red;display:none">Select the above option correctly</p>
            </div>
        </div>
        <div class="container">
            <br>
            <button type="button" class="btn btn-success" onclick="add()">Add Blood</button>
        </div>

        

    `;
}

start();
