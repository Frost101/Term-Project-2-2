
function test(){
let div1 = document.getElementById('insert');
console.log(div1);

for(i=1;i<=20;i++){
    let divTemp = document.createElement('div');
    divTemp.innerHTML = `<div class="card mb-3 bg-success" style="max-width: 800px;">
    <div class="row g-0">
      <div class="col-md-4">
      <img src="https://cdn1.vectorstock.com/i/1000x1000/14/80/doctor-web-icon-therapist-avatar-vector-18531480.jpg" class="img-fluid rounded-start" height="50px" width="200px" alt="...">
      </div>
      <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title">Prof. Dr. Abc Hossain</h4>
        <h5 class = "card-text">MBBS(DMC),FCPS(Medicine)</h5>
        <p hidden>${i}<p>
        <p >Medicine Specialist.</br>
        Working at Health++ Rajshahi Branch</p>
        <button type="button" class="btn btn-dark" onclick="clicked(this)">Book Appointment</button>
      </div>
      </div>
    </div>
    </div>` ;
  div1.appendChild(divTemp);
}
}

function clicked(ref){
  console.log(ref.parentElement.childNodes[5].innerText);
}

test();

