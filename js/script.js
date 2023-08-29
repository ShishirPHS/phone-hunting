const loadPhone = async (searchedPhone, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchedPhone}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phonesContainer = document.getElementById("phone-container");

  // clear phonesContainer
  phonesContainer.textContent = "";

  // display show all button if there are more than 12 phones
  const showAllBtnContainer = document.getElementById("show-all-btn-container");

  if ((phones.length > 12) & !isShowAll) {
    showAllBtnContainer.classList.remove("hidden");
  } else {
    showAllBtnContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    // display only first 12 phones
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `<figure class="pt-12">
        <img
        src="${phone.image}"
        alt="Shoes"
        />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
        </div>
    </div>`;
    phonesContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

// handle search
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;
  loadPhone(searchValue, isShowAll);
};

// toggle loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner-container");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle sow all
const handleShowAll = () => {
  handleSearch(true);
};

// loadPhone();
