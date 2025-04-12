// DOM Selectors
const display = document.querySelector("#display");
const displayName = document.querySelector("#imageName");
const errorMsg = document.querySelector("#errorMsg");



//Global Variables
let dataResp;
let dataArr = [];
let dataArrName = [];
let currIdx = 0;
let mode;
let imgId;
let rand = -1;

/* LAMBDA */
let displayImage = (data, idx, mod) => {
    let imgSrc = mod ? data[idx].imageURL : data[idx].src;
    display.src = imgSrc;
    displayName.value = imgSrc;
    if (!mode) {
        displayName.value = dataArrName[idx];
    }
}

function fetchFromUrl() {
    urlInput = document.getElementById("url").value
    mode = true;

    fetch(urlInput)
        .then(response => response.json())
        .then(json => {
            dataResp = json.images;
            currIdx = 0;
            displayImage(dataResp, currIdx, mode);
        });
}

function fetchFromLocal() {
    fname = document.getElementById("fname").value + "/" + document.getElementById("cname").value
    start = parseInt(document.getElementById("snum").value)
    end = parseInt(document.getElementById("enum").value)
    mode = false;

    if (start <= end) {
        for (let i = start; i <= end; i++) {
            const img = new Image();
            let n = fname + i + ".jpg";
            img.src = n;
            dataArrName.push(n);
            dataArr.push(img);
        }
        errorMsg.textContent = "Photo Viewer System";
    } else {
        errorMsg.textContent = "ERROR: Invalid Range!";
    }
    currIdx = 0;
    displayImage(dataArr, currIdx, false);
}

function prev() {
    if (currIdx > 0) {
        if (mode) {
            displayImage(dataResp, --currIdx, true);
        } else {
            displayImage(dataArr, --currIdx, false);
        }
        errorMsg.textContent = "Photo Viewer System";
    } else {
        errorMsg.textContent = "ERROR: No More Images";
    }
}

function next() {
    if (mode) {
        if (currIdx < dataResp.length - 1) {
            displayImage(dataResp, ++currIdx, true);
            errorMsg.textContent = "Photo Viewer System";
        } else {
            errorMsg.textContent = "ERROR: No More Images";
        }
    } else {
        if (currIdx < dataArr.length - 1) {
            displayImage(dataArr, ++currIdx, false);
            errorMsg.textContent = "Photo Viewer System";
        } else {
            errorMsg.textContent = "ERROR: No More Images";
        }
    }

}

function first() {
    if (mode) {
        displayImage(dataResp, 0, true);
    } else {
        displayImage(dataArr, 0, false);
    }
}

function last() {
    if (mode) {
        displayImage(dataResp, dataResp.length - 1, true);
    } else {
        displayImage(dataArr, dataArr.length - 1, false);
    }
}

function startSlideShow() {
    if (dataArr.length == 0 && dataResp == null) {
        errorMsg.textContent = "ERROR: Photos are not loaded!"
    } else {
        let len = mode ? dataResp.length : dataArr.length;
        errorMsg.textContent = "Photo Viewer System";
        if (currIdx == len - 1) {
            currIdx = -1;
        }
        next();
    }
}

function startRandSlideShow() {
    if (dataArr.length == 0 && dataResp == null) {
        errorMsg.textContent = "ERROR: Photos are not loaded!"
    } else {
        let len = mode ? dataResp.length : dataArr.length
        errorMsg.textContent = "Photo Viewer System";
        let dataTemp = mode ? dataResp : dataArr
        rand = (Math.floor(Math.random() * len));
        displayImage(dataTemp, rand, mode)
    }
}

function slideShow() {
    clearInterval(imgId);
    imgId = setInterval("startSlideShow()", 1000);
}


function randomSlideShow() {
    clearInterval(imgId);
    imgId = setInterval("startRandSlideShow()", 1000);
}

function stopSlideShow() {
    clearInterval(imgId)
}

function reset() {
    // Clear the arrays storing the images
    dataArr = [];
    dataArrName = [];

    // Clear the display area (reset the image source to a placeholder or empty)
    display.src = ""; // or set to a default image like "InitialImage.jpg"

    // Clear any input fields or form values
    document.getElementById("fname").value = "";
    document.getElementById("cname").value = "";
    document.getElementById("snum").value = "";
    document.getElementById("enum").value = "";

    // Reset any other necessary variables
    currIdx = 0;

    // Reset the error message
    errorMsg.textContent = "Photo Viewer System";
}
