async function logout(){
  localStorage.clear();
  let result = await fetch("http://localhost:4200/logout", {
      method: "DELETE"
    });
  window.location.replace('http://localhost:4200');
}

let testStr = "";
let result = null;

function settingName(){
    let setName = document.getElementById('setName');
    let name = localStorage.getItem('NAME');
    setName.innerText = `Welcome Dr. ${name}`;
    console.log(setName);
}

settingName();

async function search(){
    let info = {
        APPTID:localStorage.getItem('APPTID')
      };
      result = await fetch("http://localhost:4200/doctor/getSingleAppointment", {
          method: "POST",
          body: JSON.stringify(info),
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await result.json();
        // console.log(result);
        if(result.length==0){
          let div1 = document.getElementById("insert");
          div1.innerHTML="";
          alert('No Appointments Found!');
        }
        else{
          test(result);
        }
}

search();

async function uploadPrescription(){
  let medicines = document.getElementById('medicines').value;
  let advice = document.getElementById('advice').value;
  let remarks = document.getElementById('remarks').value;
  let bed = document.getElementById('bedRequired').value;

  // console.log(medicines);
  // console.log(advice);
  // console.log(remarks);
  // console.log(bed);

  if(medicines.trim() === "" || advice.trim() === "" || remarks.trim() === "" || bed.trim() === ""){
    alert('Please Fill up the medicines,advice,remarks,bed assigned fields properly');
  }
  else{
    let flag = confirm('Are You sure about uploading this prescription?');
    if(flag){
      const info = {
        TESTARR:testArr,
        APPTID:result[0].APPTID,
        REMARKS:remarks,
        ADVICE:advice,
        MEDICINES:medicines,
        BED:bed
      }
      let temp = await fetch("http://localhost:4200/doctor/uploadPrescription", {
          method: "POST",
          body: JSON.stringify(info),
          headers: {
            "Content-Type": "application/json",
          },
        });
        temp = await temp.json();
        if(temp==="success"){
          window.location.replace("http://localhost:4200/doctor/upcomingAppointments");
        }
    }
  }
}


async function getTestNames(){
  const info = {
    msg:'test de'
  }
  let temp = await fetch("http://localhost:4200/doctor/testNames", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
    temp = await temp.json();
    testStr = "";
    for(let i=0; i<temp.length;i++){
      testStr += `<li id = "${temp[i].TEST_NAME}" style = "display : none" onclick="addTest(this)"><a href="#">${temp[i].TEST_NAME}</a></li>`;
    }

    let ul = document.getElementById('myUL');
    ul.innerHTML = "";
    ul.innerHTML = testStr;
    // let li = document.createElement('li');
    // li.innerHTML = testStr;
    // ul.appendChild(li);
}



async function test(result) {
    let div1 = document.getElementById("insert");
    div1.innerHTML="";
  
    for (i = 0; i < result.length; i++) {
      let divTemp = document.createElement("div");
      let src ;
      divTemp.innerHTML = `<div class="card mb-3 bg-success" style="max-width: 1000px;">
      <div class="row g-0">
        <div class="col-md-3">
        <img src="images/editPrescription.png" class="img-fluid rounded-start" height="50px" width="200px" alt="...">
        </div>
        <div class="col-md-9">
        <div class="card-body">
          <p hidden>${result[i].APPTID}<p>
          <h4 class="card-title">Appointment ID: ${result[i].APPTID}</h4>
          <p style="color:white" class = "card-text">Patient Name: ${result[i].PATIENT_NAME}<br>
          NID: ${result[i].PID}</br>
          Age: ${result[i].AGE} Years </br>
          Blood Group: ${result[i].BLOOD_GROUP}</br>
          Phone: ${result[i].PHONE}</br>
          APPT_TIME: ${result[i].APPT_TIME}</br>
          APPT_DATE: ${result[i].APPT_DATE}</br>
          </p>
          <label for="#"><b>Selected Tests</b></label>
          <div style="color:white" id = "selectedTests">
          </div>
          <form action="#0">
            
          
          <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search And Click on required tests">

          
          <ul id="myUL">
            
          </ul>


            <label for="medicines"><b>Required Medicinies</b></label>
            <div class="grow-wrap">
                <textarea name="text" placeholder="1.Medicine_Name(After breakfast-Before Lunch-After Dinner : For n Days)" id="medicines" onInput="this.parentNode.dataset.replicatedValue = this.value"></textarea>
            </div>

            <label for="remarks"><b>Remarks</b></label>
            <div class="grow-wrap">
                <textarea name="text" placeholder="Remarks" id="remarks" onInput="this.parentNode.dataset.replicatedValue = this.value"></textarea>
            </div>

            <label for="advice"><b>Advice</b></label>
            <div class="grow-wrap">
                <textarea name="text" placeholder="Advice" id="advice" onInput="this.parentNode.dataset.replicatedValue = this.value"></textarea>
            </div>

            <label for="bedRequired"><b>Assigned to bed?</b></label>
            <select id = "bedRequired" class="form-select" value="" aria-label="Default select example">
            <option selected disabled>Select</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
            </select>
            

            <p>       </p>
            <p>       </p>
            <p>       </p>
            <button type="button" id="button" onClick="uploadPrescription()" class="btn btn-dark">Upload Prescription</button>

            </form>
                </div>
        </div>
      </div>
      </div>`;
      div1.appendChild(divTemp);
      getTestNames();
    }

  }

  let testArr = [];
  function addTest(ref) {
    testArr.push(ref.innerText);
    console.log(testArr);
    let parent = document.getElementById(ref.innerText).parentElement;
    let child = document.getElementById(ref.innerText);
    parent.removeChild(child);
    let selectedTests = document.getElementById('selectedTests');
    selectedTests.innerHTML="";
    selectedTests.innerText = testArr;
  }

  async function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 && filter.trim().length != 0) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }


  // <li id = "Ade le" style = "display : none" onclick="addTest(this)"><a href="#">Ade le</a></li>
  //           <li id = "Ag ne s" style = "display : none" onclick="addTest(this)"><a href="#">Ag ne s</a></li>
          
  //           <li id = "Billy" style = "display : none" onclick="addTest(this)"><a href="#">Billy</a></li>
  //           <li id = "Bob" style = "display : none" onclick="addTest(this)"><a href="#">Bob</a></li>
          
  //           <li id = "Calvin" style = "display : none" onclick="addTest(this)"><a href="#">Calvin</a></li>
  //           <li id = "Christina" style = "display : none" onclick="addTest(this)"><a href="#">Christina</a></li>
  //           <li id = "Cindy" style = "display : none" onclick="addTest(this)"><a href="#">Cindy</a></li>