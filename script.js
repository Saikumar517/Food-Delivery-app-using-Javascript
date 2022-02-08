"use strict";
// Taking main webpage Element by using its ID
let mainPageContainer = document.getElementById("main-page-container");
let mainPageContainer2 = document.getElementById("main-page-container2");
let popUpBox = document.getElementById("popup");
let popUpBox2 = document.getElementById("cartItemsofArray");
let count = document.getElementById("count");

// calling a function for storing the user details for creating the account
const signUp = (e) => {
  let fname = document.getElementById("fname").value,
    lname = document.getElementById("lname").value,
    email = document.getElementById("email").value,
    pwd = document.getElementById("pwd").value;

  // getting user data from localStorage and stroing into an array
  let formData = JSON.parse(localStorage.getItem("formData")) || [];

  let exist =
    formData.length &&
    JSON.parse(localStorage.getItem("formData")).some(
      (data) =>
        data.fname.toLowerCase() == fname.toLowerCase() &&
        data.lname.toLowerCase() == lname.toLowerCase()
    );

  //pushing the data and  vailidating the form
  if (!exist) {
    formData.push({ fname, lname, email, pwd });
    localStorage.setItem("formData", JSON.stringify(formData));
    document.querySelector("form").reset();
    document.getElementById("fname").focus();
    alert("Account Created.\n\nPlease Sign In using the link below.");
  } else {
    alert("Oopss... Duplicate found!!!\nYou have already signed up");
  }
  e.preventDefault();
};

//calling the user singin function and validating the user credentials

function signIn(e) {
  let email2 = document.getElementById("email2").value,
    pwd2 = document.getElementById("pwd2").value;
  let formData = JSON.parse(localStorage.getItem("formData")) || [];
  let exist =
    formData.length &&
    JSON.parse(localStorage.getItem("formData")).some(
      (data) =>
        data.email.toLowerCase() == email2 && data.pwd.toLowerCase() == pwd2
    );
  if (!exist) {
    alert(
      "Incorrect login credentials (OR) If You are New User Please Sign Up"
    );
  } else {
    location.href = "./webpage.html";
  }
  e.preventDefault();
}

async function apiCalling() {
  fetch("https://6193976ed3ae6d0017da86a1.mockapi.io/api/restaurants") // Fetching the data from API
    .then((response) => {
      return response.json(); // returning the json data from the API
    })
    .then((data) => {
      let [restaurant__1, restaurant__2] = data; //Destructiong an array from API DATA

      // console.log(restaurant__1);
      // creating HTML elements dynamically and adding in the Webpage
      let htmlData = ` 
          <a class="link" href="items.html"> 
            <div class="api-main-container" >
                <div class="img-container" >
                        <img class="img" src =${restaurant__1.img}  />
                    <div class="api-container" >
                        <div>
                            <p> <span class="spanElement">Food Type :</span>  ${restaurant__1.foodType}</p>
                        </div>
                        <div>
                            <p> <span class="spanElement rating">Rating</span> : ${restaurant__1.ratings}</p>
                        </div>
                    </div>
                    <div class="heading-ele" >
                        <h1><span class="spanElement">Food Name:</span> ${restaurant__1.name}</h1>
                    </div>
                </div>
            </div>
          </a>  
      `;
      // creating HTML elements dynamically and adding in the Webpage
      let htmlData2 = `
      <a class="link" href="items.html">
            <div class="api-main-container" >
                <div class="img-container" >
                        <img class="img" src =${restaurant__2.img}  />
                    <div class="api-container" >
                        <div>
                            <p> <span class="spanElement">Food Type :</span>  ${restaurant__2.foodType}</p>
                        </div>
                        <div>
                            <p> <span class="spanElement rating">Rating</span> : ${restaurant__2.ratings}</p>
                        </div>
                    </div>
                    <div class="heading-ele" >
                        <h1><span class="spanElement">Food Name:</span> ${restaurant__2.name}</h1>
                    </div>
                </div>
            </div>
            </a>
      `;
      //appending the API data in the webpage
      mainPageContainer.insertAdjacentHTML("beforeend", htmlData);
      mainPageContainer2.insertAdjacentHTML("beforeend", htmlData2);
    });
}
// calling API function
apiCalling();

// creating the array of food Data

let foodArray = [
  {
    name: "Biryani",
    Price: "250",
    available: "Yes",
    foodType: "Non-veg",
    foodImage: "./pexels-brigitte-tohm-239581.jpg",
    btnId: "image1",
  },
  {
    name: "Pizza",
    Price: "350",
    available: "No",
    foodType: "Non-veg",
    foodImage: "./pexels-sydney-troxell-708587.jpg",
    btnId: "image2",
  },
  {
    name: "Veg Biryani",
    Price: "150",
    available: "No",
    foodType: "Veg",
    foodImage: "pexels-ella-olsson-3026808.jpg",
    btnId: "image3",
  },
  {
    name: "Grilled chicken",
    Price: "550",
    available: "Yes",
    foodType: "Non-veg",
    foodImage: "pexels-ella-olsson-3026808.jpg",
    btnId: "image4",
  },
  {
    name: "Burger",
    Price: "500",
    available: "Yes",
    foodType: "Non-veg",
    foodImage: "./pexels-cats-coming-406152.jpg",
    btnId: "image5",
  },
  {
    name: "Sandwich",
    Price: "200",
    available: "No",
    foodType: "veg",
    foodImage: "./pexels-lisa-1279330.jpg",
    btnId: "image6",
  },
];

// storing the food data in localStorage
localStorage.setItem("arrayOfData", JSON.stringify(foodArray));

// getting the food data from local storage
let dataFood = JSON.parse(localStorage.getItem("arrayOfData"));

let foodFunction = function () {
  // storing the individual items in the array
  let foodItems = [];

  // iterating the localStorage food data by using for of loop

  for (let i of dataFood) {
    foodItems.push(`
  <div class="flex">
    <img class="food-image" src=${i.foodImage} alt="Food-Image" />
    <h1>${i.name}</h1>
    <p class="cost" >&#8377 ${i.Price}  </p>
    <p>Food type : ${i.foodType} </p>
    <p>Available : ${i.available}</p>
  <div class="add-to-cart item" >
    <button class="addBtn" id="${i.btnId}" >Add to cart</button>
  </div>
</div>
  `);
    popUpBox.innerHTML = foodItems.join(""); // sending the data to website
  }
};
foodFunction(); // calling the first restaurent items

window.onload = function () {
  //cart box
  const iconShopping = document.querySelector(".cart-icon");
  const cartCloseBtn = document.querySelector(".fa-close");
  const cartBox = document.querySelector(".cartBox");
  iconShopping.addEventListener("click", function () {
    cartBox.classList.add("active");
  });
  cartCloseBtn.addEventListener("click", function () {
    cartBox.classList.remove("active");
  });

  // //adding cart data to local storage
  const addToCartBtn = document.getElementsByClassName("addBtn");
  let items = [];
  for (let i = 0; i < addToCartBtn.length; i++) {
    addToCartBtn[i].addEventListener("click", function (e) {
      if (typeof Storage !== "undefined") {
        let item = {
          id: i + 1,
          name: e.target.parentElement.parentElement.children[1].textContent,
          price: e.target.parentElement.parentElement.children[2].textContent,
          no: 1,
        };
        if (JSON.parse(localStorage.getItem("items")) === null) {
          items.push(item);
          localStorage.setItem("items", JSON.stringify(items));
          window.location.reload();
        } else {
          const localItems = JSON.parse(localStorage.getItem("items"));
          localItems.map((data) => {
            if (item.id === data.id) {
              item.no = data.no + 1;
            } else {
              items.push(data);
            }
          });
          items.push(item);
          localStorage.setItem("items", JSON.stringify(items));
          window.location.reload();
        }
      } else {
        alert("Oops..! Error in your local storage");
      }
    });
  }

  // //adding data to cart
  const iconCart = document.querySelector(".count");
  let no = 0;
  JSON.parse(localStorage.getItem("items")).map((data) => {
    no = no + data.no;
  });
  iconCart.innerHTML = no;

  //creating cart and adding data in that
  let cardBoxTable = cartBox.querySelector("table");
  let tableData = "";
  tableData +=
    "<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>";
  if (JSON.parse(localStorage.getItem("items"))[0] === null) {
    tableData += '<tr><td colspan="5">No items found</td></tr>';
  } else {
    JSON.parse(localStorage.getItem("items")).map((data) => {
      tableData +=
        "<tr><th>" +
        data.id +
        "</th><th>" +
        data.name +
        "</th><th>" +
        data.no +
        "</th><th>" +
        data.price +
        '</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>'; // delete functionality added as inline script in the HTML File
    });
  }
  cardBoxTable.innerHTML = tableData;
};

let orderNow = document.querySelector(".orderBtn");

orderNow.addEventListener("click", function () {
  alert("Thank You for Ordering the food");
});
