const accessKey ="zB-ZlYGqCql3Y0QvDb-3I-As0nFsjJNJEHV_iBHj1rw";
const form1 = document.querySelector("form");
const inputCl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-result");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
async function searchImages() {
    inputData = inputCl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.map(result => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-results");
        
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        
        // Append the imageWrapper to the searchResults container
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "";
    }
}


form1.addEventListener("submit",(event) =>{
    event.preventDefault()
    page = 1;
    searchImages()


})
showMore.addEventListener("click", async (event) => {
    event.preventDefault();
    await searchImages(); // Call the searchImages function to load more results
});

