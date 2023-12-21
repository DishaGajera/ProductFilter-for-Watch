const data = [
    {
        id: 1,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress"
    },
    {
        id: 11,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 50,
        cat: "Dress"
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        cat: "Sports"
    },
    {
        id: 6,
        name: "Garmin Venu Smartwatch",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 27,
        cat: "Casual"
    },
    {
        id: 7,
        name: "Garmin Venu Smartwatch",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 40,
        cat: "Casual"
    },
    {
        id: 5,
        name: "Casio Classic Resin Strap",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        cat: "Sports"
    },
];

const prodContainer = document.querySelector(".prodContainer");
const search = document.querySelector(".search");
const categories = document.querySelector(".categories");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProduct) => {
    prodContainer.innerHTML = filteredProduct.map(
        (product) =>
            `<div class="product">
            <img src=${product.img} />
            <span class="name">${product.name}</span>
            <span class="priceText">${product.price}</span>
        </div>`
    ).join("")
};

displayProducts(data);

search.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();

    if (value) {
        displayProducts(
            data.filter((item) => item.name.toLowerCase().indexOf(value) != -1)
        );
    } else {
        displayProducts(data);
    }
})

const setCategories = () => {
    const allCats = data.map((item) => item.cat);
    const category = [
        "All",
        ...allCats.filter((item, i) => {
            return allCats.indexOf(item) === i;
        }),
    ];

    categories.innerHTML = category.map(cat =>
        `
        <span class = "cat">${cat}</span>
        `).join("");

    categories.addEventListener("click", (e) => {
        const selectedCat = e.target.textContent;

        selectedCat === "All" ? displayProducts(data) : displayProducts(data.filter((item) => item.cat === selectedCat));
    });
};

const setPrice = () => {
    const priceList = data.map((item) => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "$" + maxPrice

    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = "$" + e.target.value;
        displayProducts(data.filter(item => item.price <= e.target.value));

    })
}

setCategories();
setPrice();