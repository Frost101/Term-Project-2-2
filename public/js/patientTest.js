function settingName(){
    let setName = document.getElementById('setName');
    let firstName = localStorage.getItem('FIRST_NAME');
    let lastName = localStorage.getItem('LAST_NAME')
    setName.innerText = `Welcome ${firstName} ${lastName}`;
    console.log(setName);
}

settingName();

async function search(){
    let info = {
        PID:localStorage.getItem('PID')
      };
      let result = await fetch("http://localhost:4200/patient/getTestResultHistory", {
          method: "POST",
          body: JSON.stringify(info),
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await result.json();
        //console.log(result);
        if(result.length==0){
          let div1 = document.getElementById("insert");
          div1.innerHTML="";
          alert('No Appointment History Found!');
        }
        else{
          test(result);
        }
}


search();


function test(result) {
    let div1 = document.getElementById("insert");
    div1.innerHTML="";
  
    for (i = 0; i < result.length; i++) {
      let divTemp = document.createElement("div");
      let src ;
      divTemp.innerHTML = `<div class="card mb-3 bg-success" style="max-width: 900px;">
      <div class="row g-0">
        <div class="col-md-4">
        <img src="images/testResult.png" class="img-fluid rounded-start" height="50px" width="200px" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body">
          <p hidden>${result[i].APPTID}<p>
          <p hidden>${result[i].TEST_NAME}<p>
          <h4 class="card-title">Test Name: ${result[i].TEST_NAME}</h4>
          <p style="color:white" class = "card-text">${result[i].LABNAME} Laboratory<br>
          ${result[i].HOSPITAL_NAME}, ${result[i].BRANCH}</br>
          APPT_DATE: ${result[i].APPT_DATE}</br>
          </p>
          <button type="button" class="btn btn-dark" onclick="clicked(this)">View Test Result</button>
        </div>
        </div>
      </div>
      </div>`;
      div1.appendChild(divTemp);
    }

  }


  function clicked(ref) {
    localStorage.setItem('APPT_ID',ref.parentElement.childNodes[1].innerText);
    localStorage.setItem('TEST_NAME',ref.parentElement.childNodes[3].innerText)
    window.location.replace("http://localhost:4200/patient/testResult")
  }


