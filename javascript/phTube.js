// categories data is collect for added category button
const handleCategories = async () => {
    const categoryUrl =
      "https://openapi.programming-hero.com/api/videos/categories";
    const response = await fetch(categoryUrl);
    const data = await response.json();
    displayCategories(data.data);
  };
  // showing categories data dynamically in button
  const displayCategories = (categories) => {
    categories.forEach((categoryName) => {
      const category_Name = document.getElementById("category_name");
      const createDiv = document.createElement("div");
           createDiv.classList.add('redBtn')
      createDiv.innerHTML = `
                    <button onclick=" handleCategoriesInfo('${categoryName.category_id}')"  class="bg-gray-200 text-[#797777cf] font-medium px-5 py-2 text-xl rounded-lg redBtn">${categoryName.category}</button>
                  
             `;
  
      category_Name.appendChild(createDiv);
  
          
    });
  };
  
  // catagories data collect which will be match with categories tab/button
      
  
  const handleCategoriesInfo = async (categoryId) => {
    const categoryIdUrl = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    const response = await fetch(categoryIdUrl);
    const categoryInfo = await response.json();
      displayCategoriesInfo(categoryInfo);
  };
  
  // categories information showing in card
  function displayCategoriesInfo(categoryInfo) {
    const notFoundImage = document.getElementById("data_notFound");
    const createDivElement = document.createElement("div");
    const category_Info = document.getElementById("category_info");
    category_Info.innerHTML = "";
    notFoundImage.innerHTML = "";
  
    {
      categoryInfo.status === true
        ? categoryInfo.data.forEach((categoryData) => {
          const secondStr = categoryData.others.posted_date;
          const second = Number(secondStr);
          const createDivTag = document.createElement("div");
          createDivTag.innerHTML = `
                                 <div class="card w-full">
                                <figure>
                                     <img class="w-full h-[220px] rounded-lg pt-1" src=${categoryData.thumbnail} alt="Shoes" /></figure>
                                     <div class='absolute right-5 bottom-[135px]'>
                                          ${second === 0
              ? ""
              : `<p class="text-white text-center text-sm rounded-xl bg-black px-3 py-2 
                                            font-medium ">${secToHrsAndMin(second)}</p>`}
                                     </div>
                                <div>
                                   <div class="flex gap-2 items-center mt-3">
                                        <img class="w-14 h-14 rounded-full" src=${categoryData.authors[0].profile_picture} alt="" srcset="">
                                        <h3 class="text-xl font-bold text-[#171717]">${categoryData.title}</h3>
                                   </div>
                                   
                                   <div class="pl-[65px] ">
                                    <div class="flex gap-4 items-center">
                                        <h3 class="text-gray-500 font-medium text-lg">${categoryData.authors[0].profile_name}</h3>
                                        <div> ${categoryData.authors[0].verified ===
              false
              ? ""
              : '<img class="w-6 h-6" src="images/verified-mark.png" alt="" srcset=""/>'} </div>
                                   </div>
                                      <p class="text-gray-500 font-medium text-lg">${categoryData.others.views} views</p>
                                    
                                   </div>
                    
                                </div>
                              </div>
                            `;
          category_Info.appendChild(createDivTag);
  
        })
        :
        (notFoundImage.innerHTML = `
                      <img class='m-auto' src="./images/Icon.png" alt="" srcset="">
                      <h3 class='text-3xl mt-3 font-bold text-red-500'>Opps!!! sorry there is no content here<h3/>
                 `);
      notFoundImage.appendChild(createDivElement);
    }
  }
   // convert seconds to hours and minute
  function secToHrsAndMin(totalSec) {
    const totalMin = Math.floor(totalSec / 60);
    const hrs = Math.floor(totalMin / 60);
    const min = totalMin % 60;
    const totalTime = hrs + "hr " + min + " min" + " ago";
    return totalTime;
  }
  
  
  handleCategories();
  handleCategoriesInfo("1000");
  
  
  
  