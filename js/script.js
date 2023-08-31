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
    phoneCard.innerHTML = `
    <figure class="pt-12">
        <img
        src="${phone.image}"
        alt="Shoes"
        />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center mt-4">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
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

// handle show all button
const handleShowAll = () => {
  handleSearch(true);
};

// handle show details button
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

// handle show details button
const showPhoneDetails = (phone) => {
  console.log(phone);
  const showDetailsOfPhones = document.getElementById("show-details-of-phones");
  showDetailsOfPhones.innerHTML = `
    <div class="flex justify-center bg-[#0d6efd0d] mb-10 rounded-lg">
      <img src="${phone?.image || "not available"}" class="py-[51px] " alt="" />
    </div>
    <h3 class="text-3xl font-bold mb-6">${phone?.name || "not available"}</h3>
    <p class="text-[#706F6F] mb-5">
      It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout.
    </p>
    <!-- single feature -->
    <p class="text-xl mb-4">
      <span class="font-semibold">Storage:</span> ${
        phone?.mainFeatures?.storage || "not available"
      }
    </p>
    <!-- single feature -->
    <p class="text-xl mb-4">
      <span class="font-semibold">Display Size:</span> ${
        phone?.mainFeatures?.displaySize || "not available"
      }
    </p>
    <!-- single feature -->
    <p class="text-xl mb-4">
      <span class="font-semibold">Chipset:</span> ${
        phone?.mainFeatures?.chipSet || "not available"
      }
    </p>
    <!-- single feature -->
    <p class="text-xl mb-4">
      <span class="font-semibold">Memory:</span> ${
        phone?.mainFeatures?.memory || "not available"
      }
    </p>
    <!-- single feature -->
    <p class="text-xl mb-4">
      <span class="font-semibold">Slug:</span> ${
        phone?.slug ? phone?.slug : "not available"
      }
    </p>
    <!-- single feature -->
    <p class="text-xl mb-4">
      <span class="font-semibold">Release date:</span> ${
        phone?.releaseDate ? phone?.releaseDate : "not available"
      }
    </p>
    <!-- single feature -->
    <p class="text-xl mb-4">
      <span class="font-semibold">Brand:</span> ${
        phone?.brand ? phone?.brand : "not available"
      }
    </p>
    <!-- single feature -->
    <p class="text-xl mb-4">
      <span class="font-semibold">GPS:</span> ${
        phone?.others?.GPS ? phone?.others?.GPS : "not available"
      }
    </p>
  `;

  show_details_modal.showModal();
};

// loadPhone();
