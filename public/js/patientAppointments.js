function settingName() {
  let setName = document.getElementById("setName");
  let firstName = localStorage.getItem("FIRST_NAME");
  let lastName = localStorage.getItem("LAST_NAME");
  setName.innerText = `Welcome ${firstName} ${lastName}`;
  console.log(setName);
}

settingName();

async function search() {
  let branch = document.getElementById("branch").value;
  let speciality = document.getElementById("speciality").value;
  if (branch.value === "" || speciality.value === "") {
    alert("Select The options correctly..");
  } else {
    let docInfo = {
      BRANCH: branch,
      SPECIALITY: speciality,
    };
    let result = await fetch("http://localhost:4200/patient/getDoctor", {
        method: "POST",
        body: JSON.stringify(docInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      if(result.length==0){
        let div1 = document.getElementById("insert");
        div1.innerHTML="";
        alert('No Doctors Found!');
      }
      else{
        test(result);
      }
  }
  
}

function test(result) {
  let div1 = document.getElementById("insert");
  div1.innerHTML="";

  for (i = 0; i < result.length; i++) {
    let divTemp = document.createElement("div");
    let src ;
    divTemp.innerHTML = `<div class="card mb-3 bg-success" style="max-width: 800px;">
    <div class="row g-0">
      <div class="col-md-4">
      <img src="https://cdn1.vectorstock.com/i/1000x1000/14/80/doctor-web-icon-therapist-avatar-vector-18531480.jpg" class="img-fluid rounded-start" height="50px" width="200px" alt="...">
      </div>
      <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title">Prof. Dr. ${result[i].NAME}</h4>
        <h5 class = "card-text">${result[i].DEGREE}</h5>
        <p hidden>${result[i].EID}<p>
        <p >${result[i].SPECIALITY} Specialist.</br>
        Working at ${result[i].HOSPITAL_NAME}</p>
        <button type="button" class="btn btn-dark" onclick="clicked(this)">Book Appointment</button>
      </div>
      </div>
    </div>
    </div>`;
    div1.appendChild(divTemp);
  }
}

function clicked(ref) {
  localStorage.setItem('EID',ref.parentElement.childNodes[5].innerText);
  window.location.replace("http://localhost:4200/patient/confirmAppointment");
}

