function settingName(){
    let setName = document.getElementById('setName');
    let firstName = localStorage.getItem('FIRST_NAME');
    let lastName = localStorage.getItem('LAST_NAME')
    setName.innerText = `Welcome ${firstName} ${lastName}`;
    console.log(setName);
}

settingName();


async function getDoctor(){
    let docInfo = {
        EID:localStorage.getItem('EID')
    };
    let result = await fetch("http://localhost:4200/patient/getDoctorConfirm",{
        method: "POST",
        body: JSON.stringify(docInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      let div = document.getElementById('insert');
      div.innerHTML="";
      let tempCard = document.createElement('div');
      let radioBox="";
      for(let i=0;i<result.VIS_TIME.length;i++){
        radioBox += `<div class="form-check">
        <input class="form-check-input" type="radio" name="radioButtonTime" value ="${result.VIS_TIME[i]}" id="${i}">
        <label class="form-check-label" for="${i}">
          ${result.VIS_TIME[i]}
        </label>
      </div>`
      }
    let date = new Date();
    let date1="";
    let date2="";
    let date3="";
    const today = new Date();
    date1 += (today.getFullYear()+"-");
    today.setMonth(today.getMonth() + 1);
    if(today.getMonth().toString().length == 1) {
        date1 += ('0' + today.getMonth() + "-");
    }
    else {
        date1 += (today.getMonth() + "-");
    }
    if(today.getDate().toString().length == 1) {
        date1 += ('0' + today.getDate());
    }
    else {
        date1 += (today.getDate());
    }

    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); 
    date2 += (tomorrow.getFullYear()+"-");
    if(tomorrow.getMonth().toString().length == 1) {
        date2 += ('0' + tomorrow.getMonth() + "-");
    }
    else {
        date2 += (tomorrow.getMonth() + "-");
    }
    if(today.getDate().toString().length == 1) {
        date2 += ('0' + tomorrow.getDate());
    }
    else {
        date2 += (tomorrow.getDate());
    }

    tomorrow.setDate(tomorrow.getDate() + 1);
    date3 += (tomorrow.getFullYear()+"-");
    if(tomorrow.getMonth().toString().length == 1) {
        date3 += ('0' + tomorrow.getMonth() + "-");
    }
    else {
        date3 += (tomorrow.getMonth() + "-");
    }
    if(tomorrow.getDate().toString().length == 1) {
        date3 += ('0' + tomorrow.getDate());
    }
    else {
        date3 += (tomorrow.getDate());
    }

    let radioBoxDate ="";
    radioBoxDate += `<div class="form-check">
    <input class="form-check-input" type="radio" name="radioButtonDate" value ="${date1}" id="1">
    <label class="form-check-label" for="1">
      ${date1}
    </label>
  </div>`;

  radioBoxDate += `<div class="form-check">
  <input class="form-check-input" type="radio" name="radioButtonDate" value ="${date2}" id="2">
  <label class="form-check-label" for="2">
    ${date2}
  </label>
</div>`;

  radioBoxDate += `<div class="form-check">
  <input class="form-check-input" type="radio" name="radioButtonDate" value ="${date3}" id="3">
  <label class="form-check-label" for="3">
    ${date3}
  </label>
</div>`;

      

      tempCard.innerHTML = `<div class="card text-white bg-success mb-1" style="max-width: 80%;">
      <div class="card-header">Confirm Appointment</div>
      <div class="card-body">
        <div class = "row">
            <div class = "col-sm-3">
            <img src="https://cdn1.vectorstock.com/i/1000x1000/14/80/doctor-web-icon-therapist-avatar-vector-18531480.jpg" class="img-fluid rounded-start" height="50px" width="200px" alt="...">

            </div>
            <div class = "col-sm-9">
            
            <h4 class="card-title">Prof. Dr. ${result.NAME}</h4>
            <p class="card-text">Qualifications: ${result.DEGREE}</p>
            <p class="card-text">${result.SPECIALITY} specialist</p>
            <p class="card-text">Working At: Health++ Hospital,${result.BRANCH}</p>
            <p class="card-text">Contact Info: </br>
                                Email:  ${result.EMAIL}<br>
                                Phone Number: ${result.PHONE}</br>
                                Address: ${result.ADDRESS}</br>
                                </p>
            <p class="card-text">Fees: ${result.FEES} BDT</p>
            <h5>Select Time</h5>
            ${radioBox}
            <p>  </p>
            <h5>Select Date(Format:(YEAR-MONTH-DAY)</h5>
            ${radioBoxDate}
            <p> </p>
            <button type="button" onClick="clicked()" id="button" class="btn btn-dark">Book Appointment</button>
            </div>
        </div>

      </div>
    </div>`;
      div.appendChild(tempCard);
};

getDoctor();


async function clicked(){
    let dateAp = document.querySelector('input[name="radioButtonDate"]:checked');
    let timeAP = document.querySelector('input[name="radioButtonTime"]:checked');
    if(dateAp===null || timeAP === null ){
        alert('Select the Appointment Date And Time Properly');
    }
    else{
        dateAp = dateAp.value ;
        timeAP = timeAP.value ;
        let docInfo = {
            DEID:localStorage.getItem('EID'),
            PID:localStorage.getItem('PID'),
            APPT_TIME:timeAP,
            APPT_DATE:dateAp
        };
        let result = await fetch("http://localhost:4200/patient/bookAppointment",{
            method: "POST",
            body: JSON.stringify(docInfo),
            headers: {
              "Content-Type": "application/json",
            },
          });
          result = await result.json();
          if(result === 'success'){
            alert('Booking Request has been completed.Please Wait for Approval...');
            window.location.replace("http://localhost:4200/patient/home");
          }

    }
    
}