window.onload = function (){
    const dogFilterBtn = document.querySelector("#good-dog-filter");
    const dogFilterCon = document.querySelector("#filter-div");
    const dogBar = document.querySelector("#dog-bar");

    const dogInfo = document.querySelector("#dog-info");
    const goodDogText = "Good Dog!";
    const badDogText = "Bad Dog";
    const goodDogBtn = document.createElement("button");
    let goodDogValue = true;
    let dogFilterValue = false;

    function dogFetch (){
    fetch ('http://localhost:3000/pups')
    .then (response => response.json())
    .then (data =>{
        for (let i = 0; i < data.length; i++){
                let dogSpan = document.createElement("span");
                dogSpan.innerText = data[i].name;
                dogSpan.setAttribute("id", `${i+1}`);
                dogBar.appendChild(dogSpan);
        }
    })
    .catch(console.error);
    }

    dogFetch();

    dogBar.addEventListener("click", function (e) {
        if (e.target.tagName === "SPAN"){
            dogInfo.innerHTML ="";
            dogInfo.className ="";
            fetch (`http://localhost:3000/pups/${e.target.id}`)
            .then (response => response.json())
            .then (data =>{
             dogInfo.className = e.target.id;   
                             
             dogImg = document.createElement("img");
             dogImg.src = data.image;
             dogInfo.appendChild(dogImg);

             dogName = document.createElement("h2");
             dogName.innerText = data.name;
             dogInfo.appendChild(dogName);
            
             goodDogValue = data.isGoodDog;
             if (goodDogValue){
                goodDogBtn.innerText = goodDogText;
             } else {
                goodDogBtn.innerText = badDogText;
            }
             dogInfo.appendChild(goodDogBtn);

            })

            .catch(console.error); 
        };

        goodDogBtn.addEventListener("click", function (e){
            if (goodDogBtn.innerText == goodDogText){
                goodDogBtn.innerText = badDogText;
                goodDogValue = false;
            } else if (goodDogBtn.innerText == badDogText){
                goodDogBtn.innerText = goodDogText;
                goodDogValue = true;
            }

            fetch(`http://localhost:3000/pups/${e.target.parentNode.className}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                isGoodDog: goodDogValue
                })

            })
            .then(response => response.json)
            .then(data =>console.log(data))
            .catch(console.error);

        });
    })

    dogFilterCon.addEventListener("click", function (){
        dogBar.innerHTML="";
        if (dogFilterValue){
            dogFilterBtn.textContent = "Filter good dogs: OFF";
            dogFilterValue = false;
            dogFetch();
        } else {
            dogFilterBtn.textContent = "Filter good dogs: ON";
            dogFilterValue = true;
            fetch ('http://localhost:3000/pups')
            .then (response => response.json())
            .then (data =>{
                for (let i = 0; i < data.length; i++){
                    if (data[i].isGoodDog){
                    let dogSpan = document.createElement("span");
                    dogSpan.innerText = data[i].name;
                    dogSpan.setAttribute("id", `${i+1}`);
                    dogBar.appendChild(dogSpan);
                    }
                }
            })
            .catch(console.error);
        }
    })
    


    
}