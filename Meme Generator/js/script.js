const templateBtn = document.querySelector(".template-btn");
const textBtn = document.querySelector(".text-btn");
const templateWrapper = document.querySelector(".template-wrapper");
const textWrapper = document.querySelector(".text-wrapper");
const closeBtnTemplate = document.querySelector(".close-button-template");
const closeBtnText = document.querySelector(".close-button-text");
const imageInput = document.querySelector(".image-input");
const downloadBtn = document.querySelector(".download-btn");
const shareBtn = document.querySelector(".share-btn");
const templateImgList = document.getElementsByClassName("memeTemplate");
const topTextInput = document.querySelector(".top-text-input");
const bottomTextInput = document.querySelector(".bottom-text-input");
const memeFrame = document.querySelector(".output");
const submitBtn = document.querySelector(".text-submit-btn");

let image, imageDataURL;

let imageCreate = (url) => {
    image = new Image();
    image.src = url;
    image.addEventListener("load", () => {
        updateMeme(memeFrame, image, topTextInput.value, bottomTextInput.value);
    }, { once: true })
}

let memeAssign = () => {
    for (const temp of templateImgList) {
        temp.onclick = () => imageCreate(temp.querySelector('img').src);
    }
}

memeAssign();


templateBtn.onclick = () => {
    if (textWrapper.style.display != 'None')
        textWrapper.style.display = 'None';
    templateWrapper.style.display = templateWrapper.style.display == 'block' ? 'None' : 'block';
}

closeBtnTemplate.onclick = () => {
    templateWrapper.style.display = templateWrapper.style.display == 'block' ? 'None' : 'None';
}

//If text button clicked
textBtn.onclick = () => {
    if (templateWrapper.style.display != 'None')
        templateWrapper.style.display = 'None';
    textWrapper.style.display = textWrapper.style.display == 'block' ? 'None' : 'block';
}

//if close text pallet button clicked
closeBtnText.onclick = () => {
    textWrapper.style.display = textWrapper.style.display == 'block' ? 'None' : 'None';
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
    imageCreate(URL.createObjectURL(e.target.files[0]));
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
    const fontSize = Math.floor(width / 12);
    const yOffset = height / 8;

    //update image background 
    memeFrame.width = width;
    memeFrame.height = height;
    ctx.drawImage(image, 0, 0);

    //prepare text
    ctx.strokestyle = 'black';
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = 'white';
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
}