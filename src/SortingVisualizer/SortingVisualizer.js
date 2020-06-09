import React from "react";
import * as sortingAlgorithms from "../Algorithms/sortingAlgorithms";
import * as sortingAnimations from "../Animations/sortingAnimations";
import "./SortingVisualizer.css";

const NUM_BARS_CONVERSION = 3 / 20;
const HEIGHT_RATIO = 3 / 5;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      algo: "Insertion Sort",
      animations: [],
      numComparisons: 0,
      numAccesses: 0,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetCounters() {
    this.setState({ numComparisons: 0, numAccesses: 0 });
  }

  resetArray() {
    const { array } = this.state;
    array.length = 0;
    const max_value = window.innerHeight * HEIGHT_RATIO;
    const num_bars = window.innerWidth * NUM_BARS_CONVERSION;
    for (let i = 0; i < num_bars; ++i) {
      array.push(randomIntFromInterval(5, max_value));
    }
    this.setState({ array });
    this.resetCounters();

    const arrayBars = document.getElementsByClassName("array-bar");
    for (let arrayBar of arrayBars)
      arrayBar.style.backgroundColor = "turquoise";
  }

  setArrayToWorkArray(workArray) {
    this.setState({ array: workArray });
  }

  setSortingAlgorithm(algo) {
    this.setState({ algo });
    this.resetCounters();
  }

  getAlgo() {
    return this.state.algo;
  }

  verifyAnimationCorrectness = () => {
    const arrayBars = document.getElementsByClassName("array-bar");
    const lengthOfArray = arrayBars.length;
    for (let i = 0; i < lengthOfArray; ++i) {
      let leftHeight = parseInt(arrayBars[i].style.height, 10);
      let rightHeight;
      if (i !== lengthOfArray - 1)
        rightHeight = parseInt(arrayBars[i + 1].style.height, 10);
      if (i === lengthOfArray - 1 || leftHeight <= rightHeight) {
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = "chartreuse";
        }, i * 5);
      }
    }
  };
  /*
  testSort(){
    for(let i = 0; i < 1000; ++i){
      const testArray = [];
      const arrayLength = randomIntFromInterval(100,1000);
      for(let j = 0; j < arrayLength; ++j){
        testArray.push(randomIntFromInterval(0,1000));
      }
      const javascriptSortedArray = testArray.slice().sort((a,b) => a-b);
      sortingAlgorithms.radixLSD(testArray);
      console.log(compareSorts(javascriptSortedArray, testArray));
    }
  }*/

  incrementCounters(comparisons, accesses) {
    let accessesLength = accesses.length;
    for (let i = 0; i < accessesLength; ++i) {
      setTimeout(() => {
        if (comparisons.length > 1)
          this.setState({
            numComparisons: comparisons[i],
            numAccesses: accesses[i],
          });
        else this.setState({ numAccesses: accesses[i] });
      }, i * 5);
    }
  }

  heapSort(animations) {
    animations = sortingAlgorithms.heapSort(this.state.array);
    sortingAnimations.heapSortAnimations(animations);
    setTimeout(() => {
      this.verifyAnimationCorrectness();
    }, animations.length * 5);
  }

  radixLSD(animations) {
    animations = sortingAlgorithms.radixLSD(this.state.array);
    sortingAnimations.radixLSDAnimations(animations);
    setTimeout(() => {
      this.verifyAnimationCorrectness();
    }, animations.length * 5);
  }

  completeDisplay(workArray, animations, comparisons, accesses) {
    this.incrementCounters(comparisons, accesses);
    setTimeout(() => {
      this.verifyAnimationCorrectness();
    }, animations.length * 5);
    setTimeout(() => {
      this.setArrayToWorkArray(workArray);
    }, animations.length * 5 + workArray.length * 5);
  }

  sortArray() {
    let { algo, animations } = this.state;
    animations.length = 0;
    this.resetCounters();

    let comparisons, accesses;
    let workArray = copyArray(this.state.array, this.state.array.length);

    switch (algo) {
      case "Insertion Sort":
        [animations, comparisons, accesses] = sortingAlgorithms.insertionSort(
          workArray
        );
        sortingAnimations.insertionSortAnimations(animations);
        break;
      case "Quick Sort":
        [animations, comparisons, accesses] = sortingAlgorithms.quickSort(
          workArray
        );
        sortingAnimations.quickSortAnimations(animations);
        break;
      case "Merge Sort":
        let firstVisualizationComparisonsArray = [];
        let secondVisualizationComparisonArray = [];
        [
          firstVisualizationComparisonsArray,
          secondVisualizationComparisonArray,
          animations,
          comparisons,
          accesses,
        ] = sortingAlgorithms.mergeSort(workArray);
        sortingAnimations.mergeSortAnimations(
          firstVisualizationComparisonsArray,
          secondVisualizationComparisonArray,
          animations
        );
        break;
      case "Bubble Sort":
        [animations, comparisons, accesses] = sortingAlgorithms.bubbleSort(
          workArray
        );
        sortingAnimations.bubbleSortAnimations(animations);
        break;
      case "Radix Sort":
        [animations, comparisons, accesses] = sortingAlgorithms.radixLSD(
          workArray
        );
        sortingAnimations.radixLSDAnimations(animations);
        break;
      case "Heap Sort":
        [animations, comparisons, accesses] = sortingAlgorithms.heapSort(
          workArray
        );
        sortingAnimations.heapSortAnimations(animations);
        break;
      default:
        return;
    }

    this.completeDisplay(workArray, animations, comparisons, accesses);
  }

  render() {
    const { array, numComparisons, numAccesses } = this.state;

    const openPopupButtons = document.querySelectorAll("[data-popup-target]");
    const closePopupButtons = document.querySelectorAll("[data-close-button]");
    const overlay = document.getElementById("overlay");

    openPopupButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const popup = document.querySelector(button.dataset.popupTarget);
        openPopup(popup);
      });
    });

    /*overlay.addEventListener("click", () => {
      const popups = document.querySelectorAll(".popup.active");
      popups.forEach((popup) => {
        closePopup(popup);
      });
    });*/

    closePopupButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const popup = button.closest(".popup");
        closePopup(popup);
      });
    });

    const openPopup = (popup) => {
      if (popup === null) return;
      popup.classList.add("active");
      overlay.classList.add("active");
    };

    const closePopup = (popup) => {
      if (popup === null) return;
      popup.classList.remove("active");
      overlay.classList.remove("active");
    };

    return (
      <>
        <div className="popup" id="popup">
          <div className="popup-header">
            <div className="title">Sorting Algorithm Visualizer</div>
            <button data-close-button className="close-button">
              &times;
            </button>
          </div>
          <div className="popup-body">
            The Visualizer intends to assist in developing a stronger
            understanding of methods used for sorting items by showcasing the
            algorithms sorting bars of varying length.
            <br />
            <br />
            Some notables:
            <ul>
              <li>Red bar - A bar currently being considered</li>
              <li>Purple bar - The pivot bar (Quick Sort only)</li>
              <li>
                Number of comparisons - The number of times we compare two bars
                (is A longer than B?)
              </li>
              <li>
                Number of array accesses - The number of times we grab a bar
                from or place a bar into the array
              </li>
            </ul>
          </div>
        </div>
        <div id="overlay"></div>
        <div className="button-container">
          <span className="button-cell-about">
            <button data-popup-target="#popup" className="button">
              About this project
            </button>
          </span>
          <span className="button-cell-algo">
            <button
              className="button"
              style={{ borderRadius: "50%" }}
              onClick={() => this.setSortingAlgorithm("Insertion Sort")}
            >
              Insertion Sort
            </button>
          </span>
          <span className="button-cell-algo">
            <button
              className="button"
              style={{ borderRadius: "50%" }}
              onClick={() => this.setSortingAlgorithm("Quick Sort")}
            >
              Quick Sort
            </button>
          </span>
          <span className="button-cell-algo">
            <button
              className="button"
              style={{ borderRadius: "50%" }}
              onClick={() => this.setSortingAlgorithm("Bubble Sort")}
            >
              Bubble Sort
            </button>
          </span>
          <span className="button-cell-algo">
            <button
              className="button"
              style={{ borderRadius: "50%" }}
              onClick={() => this.setSortingAlgorithm("Merge Sort")}
            >
              Merge Sort
            </button>
          </span>
          <span className="button-cell-algo">
            <button
              className="button"
              style={{ borderRadius: "50%" }}
              onClick={() => this.setSortingAlgorithm("Heap Sort")}
            >
              Heap Sort
            </button>
          </span>
          <span className="button-cell-algo">
            <button
              className="button"
              style={{ borderRadius: "50%" }}
              onClick={() => this.setSortingAlgorithm("Radix Sort")}
            >
              Radix Sort (LSD)
            </button>
          </span>
          <span className="button-cell-sort">
            <button
              className="button"
              style={{ borderRadius: "50%" }}
              onClick={() => this.sortArray()}
            >
              Sort the Array
            </button>
          </span>
          <span className="button-cell-generate">
            <button
              className="button"
              style={{ borderRadius: "50%" }}
              onClick={() => this.resetArray()}
            >
              Generate New Array
            </button>
          </span>
        </div>
        <div className="array-container">
          {array.map((value, index) => (
            <div
              className="array-bar"
              style={{ height: `${value}px` }}
              key={index}
            />
          ))}
        </div>
        <div className="footer-container">
          <span className="cell-in-footer">
            <div>{this.getAlgo()}</div>
            <div style={{ fontSize: "30%" }}>Current Selection</div>
          </span>
          <span className="cell-in-footer">
            <div>{numComparisons}</div>
            <div style={{ fontSize: "30%" }}>Number of comparisons</div>
          </span>
          <span className="cell-in-footer">
            <div>{numAccesses}</div>
            <div style={{ fontSize: "30%" }}>Number of array accesses</div>
          </span>
        </div>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const copyArray = (array, length) => {
  const copiedArray = [];
  for (let i = 0; i < length; ++i) {
    copiedArray.push(array[i]);
  }
  return copiedArray;
};
/*
function compareSorts(A,B){
  if(A.length !== B.length) return false;
  for(let i=0;i<A.length;++i){
    if (A[i] !== B[i]) return false;
  }
  return true;
}*/
