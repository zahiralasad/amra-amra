import React from "react";
import "./picnic.css";  

// var formData = {
//     name: null,
//     email: null,
//     phone: null,
//     adult: null,
//     binKid: null,
//     smallKid: null,
//     baby: null,
//     busStop: null,
//     fee: null,
//     swishTo: null
//   };
//   window.onload = function () {
//     if (window.addEventListener) {
//       document.getElementById('name').addEventListener('change', totalFee, false);
//       document.getElementById('email').addEventListener('change', totalFee, false);
//       document.getElementById('phone').addEventListener('change', totalFee, false);
//       document.getElementById('adult').addEventListener('change', totalFee, false);
//       document.getElementById('bigKid').addEventListener('change', totalFee, false);
//       document.getElementById('smallKid').addEventListener('change', totalFee, false);
//       document.getElementById('baby').addEventListener('change', totalFee, false);
//       getSwishNumber();
//       console.log(formData);
//     }

//   }

// function totalFee() {
//     formData.name = document.getElementById('name').value;
//     formData.email = document.getElementById('email').value;
//     formData.phone = document.getElementById('phone').value;

//     let adult = document.getElementById('adult').value;
//     let bigKid = document.getElementById('bigKid').value;
//     let smallKid = document.getElementById('smallKid').value;
//     let baby = document.getElementById('baby').value;

//     let fee = parseInt(adult) * 395 + parseInt(bigKid) * 295 + parseInt(smallKid) * 250 + parseInt(baby) * 0;
//     let output = document.getElementById('fee');
//     output.value = fee;
//     formData.fee = fee;
//   }
//   function getSwishNumber() {
//     const numbers = ["Zahir Al-Asad (0760141646)", "Hossain Jahan Adil Mahmud (0704050314)", "Md Shawon Hasan Reza (0739109544)", "Musfiqur Hilaly (0760292018)", "Md Tarek Hasan (0700295808)"];
//     const randomIndex = Math.floor(Math.random() * numbers.length);
//     const number = numbers[randomIndex];
//     let output = document.getElementById('swishTo');
//     output.value = number;
//     formData.swishTo= number;
//   }

//   function info() {
//     console.log(formData);
//     if  (formData.name == null || formData.name == "" 
//     || formData.email == null || formData.email == "" 
//     || formData.phone == null || formData.phone == ""
//     || (!document.getElementById('busStop1').checked && !document.getElementById('busStop2').checked))
//     {
//       alert("\nসুধী বন্ধু,\nঅনুগ্রহ করে বাদ্ধতামুলোক ('*') কলাম গুলো পুরন করুন");
//     }
//     else {
//       alert("ধন্যবাদ "+formData.name+",\nআপার নিবন্ধন তথ্য আমাদের কাছে সংরক্ষিত আছে। \nবনভোজনে আপনার উপস্থিতি নিশ্চিত করতে অনুগ্রহ করে তাড়াতাড়ি " +formData.swishTo+" কে "+formData.fee+"kr swish করুন। \n আয়োজনে, \n'আমরা আমরা'");
//     }
//   }
function Picnic2022() {
    
    return (
        <div className="picnic">
            <div class="container">
                <header class="p-3 d-flex flex-wrap rounded align-items-center justify-content-center text-bg-dark">
                    <a href="/" class="text-decoration-none">
                        <img src="https://ssbc.club/wp-content/uploads/2023/05/logo_amra_amra.jpg" width="40" height="auto" />
                        <span class="fs-4 text-white ">বনভোজন ২০২৪</span>
                    </a>
                </header>
            </div>
            <div class="container">
                <div class="mt-2 p-4 p-md-5 mb-4 rounded text-bg-dark">
                    <div class="col-md-12 px-0">
                        <img src="https://ssbc.club/wp-content/uploads/2023/05/Benar_picnic2023.jpg" class="img-fluid" alt="Responsive image"
                            style={{ width: "100%;" }} />
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="mt-2 p-4 rounded border">
                    <form id="entryForm" onsubmit="handleFormSubmit(this)">
                        <div class="form-group mt-3">
                            <label for="email">ই-মেইল *</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" required />
                        </div>
                        <div class="form-group mt-3">
                            <label for="phone">মোবাইল নাম্বার *</label>
                            <input type="text" class="form-control" id="phone" name="phone" maxlength="10" required />
                        </div>
                        <div class="form-group mt-3">
                            <label for="adult">কজন যার জম্ম সাল ১৯১১-২০১১? </label>
                            <input type="number" class="form-control" id="adult" name="adult" value="0" min="0" required />
                            <small id="adultPrice" class="form-text text-muted">(প্রতিজন 395kr)</small>
                            <div id="display"></div>
                        </div>
                        <div id="test"></div>
                        <div class="form-group mt-3">
                            <label for="bigKid">কজন যার জম্ম সাল ২০১২-২০১৭? </label>
                            <input type="number" class="form-control" id="bigKid" name="bigKid" value="0" min="0" />
                            <small id="bigKidPrice" class="form-text text-muted">(প্রতিজন 295kr)</small>
                        </div>
                        <div class="form-group mt-3">
                            <label for="smallKid">কজন যার জম্ম সাল ২০১৮-২০১৯?</label>
                            <input type="number" class="form-control" id="smallKid" name="smallKid" value="0" min="0" />
                            <small id="smallKidPrice" class="form-text text-muted">(প্রতিজন 250kr)</small>
                        </div>
                        <div class="form-group mt-3">
                            <label for="baby">কজন যার জম্ম সাল ২০২০-২০২৩?</label>
                            <input type="number" class="form-control" id="baby" name="baby" value="0" min="0" />
                            <small id="smallKidPrice" class="form-text text-muted">(প্রতিজন 0kr)</small>
                        </div>
                        <p class="mt-2">কোথা থেকে বাসে উঠবেন? *</p>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="busStop" id="busStop1" value="Sollentuna" required />
                            <label class="form-check-label" for="busStop1">
                                Sollentuna
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="busStop" id="busStop2" value="Kungens Kurva" />
                            <label class="form-check-label" for="busStop2">
                                Kungens Kurva
                            </label>
                        </div>
                        <div class="mt-3">সর্বমোট চাঁদা: </div>
                        <input type="number" class="form-control" id="fee" name="fee" />

                        <div class="mt-3"> কাকে swish করবেন?</div>
                        <input type="text" class="form-control" id="swishTo" name="swishTo" />
                        <div class="mt-3">
                            <button type="submit" class="btn btn-primary mt-3" onclick="info()">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="container">
                <footer class="d-flex flex-wrap rounded justify-content-between align-items-center py-3 my-4 border-top">
                    <div class="col-md-4 d-flex align-items-center">
                        <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <img src="https://ssbc.club/wp-content/uploads/2023/05/logo_amra_amra.jpg" width="30" height="auto" />
                        </a>
                        <span class="mb-3 mb-md-0 text-white">&copy; আমরা আমরা</span>
                    </div>

                    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li class="ms-3"><a class="text-muted" href="https://fb.me/e/46hiDK1Ky"><svg class="bi" width="24" height="24">
                            {/* <use xlink:href="#facebook" /> */}
                        </svg></a></li>
                    </ul>
                </footer>
            </div>

        </div>


    )
}
export default Picnic2022;