const templateBtn = document.querySelector(".template-btn");
const textBtn = document.querySelector(".text-btn");
const templateWrapper = document.querySelector(".template-wrapper");
const textWrapper = document.querySelector(".text-wrapper");
const closeBtnTemplate = document.querySelector(".close-button-template");
const closeBtnText = document.querySelector(".close-button-text");
const imageInput = document.querySelector(".image-input");
const shareBtn = document.querySelector(".share-btn");
const shareOptions = document.querySelector(".share-options");
const templateImgList = document.getElementsByClassName("memeTemplate");
const topTextInput = document.querySelector(".top-text-input");
const bottomTextInput = document.querySelector(".bottom-text-input");
const memeFrame = document.querySelector(".output");
const submitBtn = document.querySelector(".text-submit-btn");
const memeBtn = document.querySelector(".meme-btn");
const memeImg = document.querySelector(".meme-img");
const nextBtn = document.querySelector(".next-btn");
const inputColor = document.querySelector(".input-color");
const inputFontSize = document.querySelector(".input-font");

let image, imageDataURL, count = 0, link;

let imageCreate = (url) => {
    image = new Image();
    image.src = url;
    image.addEventListener("load", () => {
        updateMeme(memeFrame, image, topTextInput.value, bottomTextInput.value);
    }, { once: true })
}

//array of templates
let memeAssign = () => {
    for (const temp of templateImgList) {
        temp.onclick = () => imageCreate(temp.querySelector('img').src);
    }
}

let display = () => {
    templateWrapper.style.display = 'none';
    textWrapper.style.display = 'none';
    memeImg.style.display = 'none';
    memeFrame.style.display = 'block';
    shareOptions.style.display = 'none';
}

templateBtn.onclick = () => {
    display();
    memeAssign();
    templateWrapper.style.display = templateWrapper.style.display == 'block' ? 'None' : 'block';
}

closeBtnTemplate.onclick = () => {
    templateWrapper.style.display = templateWrapper.style.display == 'block' ? 'None' : 'None';
}

//If text button clicked
textBtn.onclick = () => {
    display();
    textWrapper.style.display = textWrapper.style.display == 'block' ? 'None' : 'block';
}

//if close text pallet button clicked
closeBtnText.onclick = () => {
    textWrapper.style.display = textWrapper.style.display == 'block' ? 'None' : 'None';
}

shareBtn.onclick = () => {
    display();
    shareOptions.style.display = shareOptions.style.display == 'block' ? 'None' : 'block';
    shareMeme();
}

// function resizeAndDownload(e) {
//     const imageInput = document.querySelector(".image-input").files[0];
//     if(!imageInput) return;
//     const reader = new FileReader();

//     reader.readAsDataURL(imageInput);

//     reader.onload = function(event) {
//         const imgElement = document.querySelector(".output");
//         imgElement.src = event.target.result;

//         imgElement.onload = function(e) {
//             const canvas = document.createElement("canvas");
//             const max_width = 450;
//             const max_height = 420;

//             const scaleSize = max_width / e.target.width;
//             canvas.width = max_width;
//             canvas.height = e.target.height * scaleSize;

//             const ctx = canvas.getContext("2d");

//             ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

//             const srcEncoded = ctx.canvas.toDataURL(e.target, "image/png");

//             memeFrame.src = srcEncoded;
//             document.querySelector(".meme-frame").style.backgroundColor = 'white';
//         }
//     }
// }

imageInput.addEventListener("change", (e) => {
    memeImg.style.display = 'none';
    memeFrame.style.display = 'block';
    imageCreate(URL.createObjectURL(e.target.files[0]));
    count = 1;
})

submitBtn.onclick = () => {
    updateMeme(memeFrame, image, topTextInput.value, bottomTextInput.value);
}
// topTextInput.addEventListener("change", () => {
//     updateMeme(memeFrame, image, topTextInput.value, bottomTextInput.value);
// })

// bottomTextInput.addEventListener("change", () => {
//     updateMeme(memeFrame, image, topTextInput.value, bottomTextInput.value);
// })

function updateMeme(memeFrame, image, topTextInput, bottomTextInput) {
    const ctx = memeFrame.getContext("2d");
    const width = image.width;
    const height = image.height;
    const fontSize = inputFontSize.value;
    const yOffset = height / 8;

    //update image background 
    memeFrame.width = width;
    memeFrame.height = height;
    ctx.drawImage(image, 0, 0);

    //prepare text
    ctx.strokestyle = 'black';
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = inputColor.value;
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';
    ctx.font = `${fontSize}px sans-serif`;

    //add top text
    ctx.textBaseLine = "top";
    ctx.strokeText(topTextInput, width / 2, yOffset);
    ctx.fillText(topTextInput, width / 2, yOffset);

    //add bottom text
    ctx.textBaseLine = "bottom";
    ctx.strokeText(bottomTextInput, width / 2, height - yOffset);
    ctx.fillText(bottomTextInput, width / 2, height - yOffset);
    document.querySelector(".img-download").href = memeFrame.toDataURL();
    document.querySelector(".copy-content").innerHTML = encodeURIComponent(memeFrame.toDataURL());
    document.querySelector(".copy-btn").onclick = () => {
        navigator.clipboard.writeText(document.querySelector(".copy-content").innerHTML);
    }
    if(imageInput.files[0] == undefined) document.querySelector(".img-download").download = image.src.substring(28);
    else document.querySelector(".img-download").download = imageInput.files[0].name;
}

function shareMeme() {
    link = image.src;
    let title = encodeURIComponent("Hi everyone, please check this out : \n");

    document.querySelector(".facebook-btn").href = `https://www.facebook.com/sharer.php?u=${link}`;
    document.querySelector(".whatsapp-btn").href = `https://web.whatsapp.com/send?text=${title}${link}`;
    document.querySelector(".pinterest-btn").href = `https://pinterest.com/pin/create/bookmarklet/?url=${link}&description=${title}`;
    document.querySelector(".twitter-btn").href = `https://twitter.com/share?url=${link}&text=${title}`;
    document.querySelector(".linkedin-btn").href = `https://www.linkedin.com/post/new/?url=${link}&title=${title}`;
}

const updateDetails = (url, title) => {
    document.querySelector(".meme-img img").src = url;
    document.querySelector(".meme-title").innerHTML = title;
}

const showMemes = () => {
    memeFrame.style.display = 'none';
    memeImg.style.display = 'block';
    templateWrapper.style.display = 'none';
    textWrapper.style.display = 'none';
    fetch("https://meme-api.com/gimme/wholesomememes")
        .then((Response) => Response.json())
        .then((data) => {
            updateDetails(data.url, data.title);
            document.querySelector(".img-download").href = data.url;
            document.querySelector(".img-download").download = data.title;
        });
}

memeBtn.addEventListener("click",showMemes);
nextBtn.addEventListener("click",showMemes);