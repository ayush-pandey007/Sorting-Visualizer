const barsContainer = document.getElementById("array-container");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");

const speed = document.getElementById("speed");
const speedValue = document.getElementById("speed-value");

const sortButton = document.getElementById("sortButton");
const resetButton = document.getElementById("resetButton");

const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContent = document.querySelector(".dropdown-content");
const dropdownArrow = document.querySelector(".dropdown-arrow");

let arrayToCreateBars = [];
let speedOfAlgo = 0;
let globalSelection = -1;
let isAlgorithmRunning = false;

const createArray = (min, max) => {
  let arr = [];
  for (let i = 0; i < max; i++) arr.push(Math.floor(Math.random() * 460) + 50);
  return arr;
};

const createBars = (min, max, isVisible) => {
  //TODO add min and max
  arrayToCreateBars = createArray(min, max);
  let barWidth = 1000;
  if (max < 65) {
    barWidth = 1000 / max;
  } else {
    barWidth = 1000 / 70;
  }
  arrayToCreateBars.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar-div");
    bar.dataset.value = value;
    if (isVisible) bar.innerHTML = value;
    bar.style.height = `${value}px`;
    bar.style.width = `${barWidth}px`;
    barsContainer.appendChild(bar);
  });

  // setTimeout(() => {
  //   mergeSort(arrayToCreateBars, 0, arrayToCreateBars.length - 1);
  // }, 3000);

  return arrayToCreateBars;
};

createBars(50, 40, false);
console.log(arrayToCreateBars);

slider.addEventListener("input", () => {
  if (!isAlgorithmRunning) {
    sliderValue.textContent = slider.value;
    barsContainer.replaceChildren();
    createBars(50, slider.value, slider.value <= 28);
  }
});

speed.addEventListener("input", (event) => {
  updateSliderValue(event.target.value);
});

function updateSliderValue(value) {
  const invertedValue = 1000 - value;
  speedValue.textContent = invertedValue;
  speedOfAlgo = invertedValue;
  speed.style.setProperty("--slider-progress", `${value}%`);
}

async function bubbleSort(arr) {
  const n = arr.length;
  let swapped = true;

  while (swapped) {
    swapped = false;

    for (let i = 0; i < n; i++) {
      if (i + 1 < n) await compareNumbers(i, i + 1);
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        await animateSwap(i, i + 1, arr);
        swapped = true;
      }
    }
  }
  console.log(arr);
  return arr;
}

async function compareNumbers(index1, index2) {
  const bar = document.getElementsByClassName("bar-div");
  bar[index1].style.backgroundColor = "#00BCD4";
  bar[index2].style.backgroundColor = "#00BCD4";
  await delay(speedOfAlgo);
  bar[index1].style.backgroundColor = "#f9e400";
  bar[index2].style.backgroundColor = "#f9e400";
}

async function animateSwap(index1, index2, arr) {
  const bar = document.getElementsByClassName("bar-div");

  bar[index1].style.backgroundColor = "#F5004F";
  bar[index2].style.backgroundColor = "#F5004F";
  let temp = bar[index1].innerHTML;
  bar[index1].innerHTML = bar[index2].innerHTML;
  await delay(speedOfAlgo);
  bar[index2].innerHTML = temp;
  console.log(arr[index1], arr[index2]);
  bar[index1].style.height = `${arr[index1]}px`;
  bar[index2].style.height = `${arr[index2]}px`;

  // await delay(speedOfAlgo);

  bar[index1].style.backgroundColor = "#f9e400";
  bar[index2].style.backgroundColor = "#f9e400";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function insertionSort(arr) {
  const bar = document.getElementsByClassName("bar-div");
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    const barKey = bar[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      await insertionSortHelper(i, j, j + 1, arr);
      j--;
    }
    arr[j + 1] = key;
    await insertionSortHelper(-1, i, j + 1, arr);
  }
  console.log(arr);
  return arr;
}

async function insertionSortHelper(key, index1, index2, arr) {
  const bar = document.getElementsByClassName("bar-div");

  bar[index1].style.backgroundColor = "#F5004F";
  bar[index2].style.backgroundColor = "#F5004F";

  bar[index1].style.height = `${arr[index1]}px`;
  await delay(speedOfAlgo);
  bar[index2].style.height = `${arr[index2]}px`;
  if (arrayToCreateBars.length < 28) bar[index1].innerHTML = arr[index1];
  if (arrayToCreateBars.length < 28) bar[index2].innerHTML = arr[index2];

  // await delay(speedOfAlgo);
  // bar[index1].innerHTML = arr[index1];
  // bar[index2].innerHTML = arr[index2];

  bar[index1].style.backgroundColor = "#f9e400";
  bar[index2].style.backgroundColor = "#f9e400";
}

async function mergeSort(arr, left, right) {
  if (left >= right) return;

  let mid = Math.floor((left + right) / 2);
  await mergeSort(arr, left, mid);
  await mergeSort(arr, mid + 1, right);
  await merge(arr, left, mid, right);
}

async function mark(index, color = "#A9A9A9") {
  const bars = document.getElementsByClassName("bar-div");
  if (index >= 0 && index < bars.length) {
    await delay(speedOfAlgo);
    bars[index].style.backgroundColor = color;
  }
}

async function unmark(index) {
  const bars = document.getElementsByClassName("bar-div");
  if (index >= 0 && index < bars.length) {
    await delay(speedOfAlgo);
    bars[index].style.backgroundColor = "#f9e400";
  }
}

async function merge(arr, left, mid, right) {
  await mark(left);
  await mark(mid + 1, "cyan");
  await mark(right, "green");

  const n1 = mid - left + 1;
  const n2 = right - mid;
  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }

  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }
  let i = 0,
    j = 0,
    k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      await mergeSortHelper(k, L[i]);
      i++;
    } else {
      arr[k] = R[j];
      await mergeSortHelper(k, R[j]);
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    await mergeSortHelper(k, L[i]);
    k++;
    i++;
  }

  while (j < n2) {
    arr[k] = R[j];
    await mergeSortHelper(k, R[j]);
    k++;
    j++;
  }

  unmark(mid + 1);
  unmark(left);
  unmark(right);
}

async function mergeSortHelper(i, value) {
  console.log(i);
  const bars = document.getElementsByClassName("bar-div");

  bars[i].style.backgroundColor = "#F5004F";
  await delay(speedOfAlgo);
  bars[i].style.height = `${value}px`;
  if (arrayToCreateBars.length < 28) bars[i].innerHTML = value;
  bars[i].style.backgroundColor = "#f9e400";
}

async function selectionSort(arr) {
  console.log(arr);
  const bars = document.getElementsByClassName("bar-div");
  for (let i = 0; i < arr.length - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < arr.length; j++) {
      await compareMinValue(arr, min_idx, j, bars);
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    console.log(arr);
    console.log(arr[i], arr[min_idx], i, min_idx);
    [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    console.log(arr[i], arr[min_idx], i, min_idx);
    await selectionSortHelper(arr[i], arr[min_idx], i, min_idx, bars);
  }
  console.log(arr);
}
async function compareMinValue(arr, min_idx, index2, bars) {
  bars[min_idx].style.backgroundColor = "cyan";
  bars[index2].style.backgroundColor = "cyan";
  await delay(speedOfAlgo);
  bars[index2].style.backgroundColor = "#f9e400";
  bars[min_idx].style.backgroundColor = "#f9e400";
}

async function selectionSortHelper(value1, value2, index1, index2, bars) {
  bars[index1].style.backgroundColor = "#F5004F";
  bars[index2].style.backgroundColor = "#F5004F";

  bars[index1].style.height = `${value1}px`;
  let temp = bars[index1].innerHTML;
  bars[index1].innerHTML = bars[index2].innerHTML;
  await delay(speedOfAlgo);
  bars[index2].innerHTML = temp;
  bars[index2].style.height = `${value2}px`;
  bars[index1].style.backgroundColor = "#f9e400";
  bars[index2].style.backgroundColor = "#f9e400";
}

async function quickSort(arr, low, high) {
  if (low < high) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

async function partition(arr, low, high) {
  const pivot = arr[high];

  let i = low - 1;
  await mark(high);

  for (let j = low; j < high; j++) {
    await quickSortCompare(arr, j, high);
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      await quickSortHelper(arr[i], arr[j], i, j);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  await unmark(high);
  await quickSortHelper(arr[i + 1], arr[high], i + 1, high);
  return i + 1;
}

async function quickSortCompare(arr, index1, index2) {
  const bars = document.getElementsByClassName("bar-div");
  bars[index1].style.backgroundColor = "cyan";
  await delay(speedOfAlgo);
  bars[index1].style.backgroundColor = "#f9e400";
}

async function quickSortHelper(value1, value2, index1, index2) {
  const bars = document.getElementsByClassName("bar-div");

  bars[index1].style.backgroundColor = "#F5004F";
  bars[index2].style.backgroundColor = "#F5004F";
  bars[index1].style.height = `${value1}px`;
  let temp = bars[index1].innerHTML;
  bars[index1].innerHTML = bars[index2].innerHTML;
  await delay(speedOfAlgo);
  bars[index2].innerHTML = temp;
  bars[index2].style.height = `${value2}px`;
  bars[index1].style.backgroundColor = "#f9e400";
  bars[index2].style.backgroundColor = "#f9e400";
}

async function radixSort(arr) {
  const maxDigit = getMaxNumber(arr);
  console.log(maxDigit);
  for (let i = 0; i < maxDigit; i++) {
    const bucket = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < arr.length; j++) {
      const digit = getDigit(arr[j], i);

      bucket[digit].push(arr[j]);
    }
    console.log(arr);
    arr = [].concat(...bucket);
    await radixSortHelper(arr);
  }

  return arr;
}

function getMaxNumber(arr) {
  let maxNum = Math.max(...arr);
  let maxDigits = 1;
  while (Math.floor(maxNum / 10) > 0) {
    maxDigits++;
    maxNum = Math.floor(maxNum / 10);
  }
  return maxDigits;
}

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

async function radixSortHelper(arr) {
  const bar = document.getElementsByClassName("bar-div");

  for (let i = 0; i < arr.length; i++) {
    bar[i].style.backgroundColor = "#F5004F";
    await delay(speedOfAlgo);
    bar[i].style.height = `${arr[i]}px`;
    if (arrayToCreateBars.length < 28) bar[i].innerHTML = arr[i];
    bar[i].style.backgroundColor = "#f9e400";
  }
}

function getColorCode(digit) {
  console.log(digit);
  switch (digit) {
    case 0:
      return "black";
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "red";
    case 4:
      return "#FF5722";
    case 5:
      return "#37E2D5";
    case 6:
      return "purple";
    case 7:
      return "#FF6969";
    case 8:
      return "#C80036";
    case 9:
      return "#0C1844";
    default:
      return undefined;
  }
}

async function heapSort(arr) {
  console.log(arr);
  let heapSize = arr.length;

  for (let i = Math.floor(heapSize / 2); i < heapSize; ++i) {
    mark(i, getColorCode(Math.log2(prevPowerOfTwo(i + 1)) + 4));
    console.log(i, Math.log2(prevPowerOfTwo(i + 1)) + 4);
  }

  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    mark(i, getColorCode(Math.log2(prevPowerOfTwo(i + 1)) + 4));
    await heapfy(arr, heapSize, i);
  }

  for (let i = heapSize - 1; i >= 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    await heapSortHelper(arr, 0, i, "#16FF00");
    heapSize--;
    await heapfy(arr, heapSize, 0);
  }
  console.log(arr);
}

async function heapfy(arr, heapSize, index) {
  let largest = index;
  let left = 2 * index + 1;
  let right = 2 * index + 2;

  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== index) {
    [arr[index], arr[largest]] = [arr[largest], arr[index]];
    await heapSortHelper(
      arr,
      index,
      largest,
      getColorCode(Math.log2(prevPowerOfTwo(largest + 1)) + 4)
    );

    await heapfy(arr, heapSize, largest);
  }
}
async function heapSortHelper(arr, i, j, color) {
  const bar = document.getElementsByClassName("bar-div");

  // bar[i].style.backgroundColor = "red";
  // bar[j].style.backgroundColor = "red";
  await delay(speedOfAlgo);
  bar[i].style.height = `${arr[i]}px`;
  bar[j].style.height = `${arr[j]}px`;
  let temp = bar[i].innerHTML;
  bar[i].innerHTML = bar[j].innerHTML;
  bar[j].innerHTML = temp;
  if (i === 0) {
    bar[j].style.backgroundColor = color;
  }
}

function prevPowerOfTwo(x) {
  x |= x >> 1;
  x |= x >> 2;
  x |= x >> 4;
  x |= x >> 8;
  x |= x >> 16;
  return x - (x >> 1);
}

const dropdowns = document.querySelectorAll(".dropdown");
const selectedValue = document.getElementById("selectedValue");

dropdowns.forEach((dropdown) => {
  const dropdownBtn = dropdown.querySelector(".dropdown-btn");
  const dropdownContent = dropdown.querySelector(".dropdown-content");
  const dropdownArrow = dropdown.querySelector(".dropdown-arrow");
  const options = dropdown.querySelectorAll(".dropdown-content a");

  dropdownBtn.addEventListener("click", () => {
    if (!isAlgorithmRunning) {
      dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";
      dropdownArrow.classList.toggle("up");
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedValue = option.getAttribute("data-value");
      dropdownBtn.textContent = option.textContent;
      globalSelection = selectedValue;
      // getAlgorithm(selectedValue, arrayToCreateBars);
      dropdownContent.style.display = "none";
      dropdownArrow.classList.remove("up");
    });
  });
});

sortButton.addEventListener("click", () => {
  // console.log("Sort button clicked!");
  if (!isAlgorithmRunning) {
    getAlgorithm(globalSelection, arrayToCreateBars);
  }
});

resetButton.addEventListener("click", () => {
  console.log(!isAlgorithmRunning);
  if (!isAlgorithmRunning) {
    console.log("yeyyay");
    barsContainer.replaceChildren();
    createBars(50, slider.value, slider.value <= 28);
  }
});

async function getAlgorithm(value, arrayToCreateBars) {
  isAlgorithmRunning = true;
  console.log(arrayToCreateBars);
  switch (value) {
    case "1":
      await bubbleSort(arrayToCreateBars);
      break;
    case "2":
      await insertionSort(arrayToCreateBars);
      break;
    case "3":
      await mergeSort(arrayToCreateBars, 0, arrayToCreateBars.length - 1);
      break;
    case "4":
      await selectionSort(arrayToCreateBars);
      break;
    case "5":
      await quickSort(arrayToCreateBars, 0, arrayToCreateBars.length - 1);
      break;
    case "6":
      await radixSort(arrayToCreateBars);
      break;
    case "7":
      await heapSort(arrayToCreateBars);
      break;
    default:
      console.log("error");
  }
  isAlgorithmRunning = false;
}
const handleOutsideClick = (event) => {
  if (
    !dropdownBtn.contains(event.target) &&
    !dropdownContent.contains(event.target)
  ) {
    dropdownContent.style.display = "none";
    dropdownArrow.classList.remove("up");
  }
};
document.addEventListener("click", handleOutsideClick);
