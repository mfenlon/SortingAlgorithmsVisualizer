export const insertionSort = (arr) => {
  const animations = [];
  let comparisons = [];
  let arrayAccesses = [];
  let comparisonsCounter = 0;
  let arrayAccessesCounter = 0;
  const size = arr.length;
  for (let i = 1; i < size; ++i) {
    ++arrayAccessesCounter;
    let tmp = arr[i];
    let j = i - 1;
    while (j >= 0 && tmp < arr[j]) {
      arrayAccessesCounter += 3;
      comparisons.push(comparisonsCounter++);
      arrayAccesses.push(arrayAccessesCounter);
      animations.push({
        leftIdx: j,
        rightIdx: j + 1,
      });
      arr[j + 1] = arr[j];
      --j;
    }
    comparisons.push(comparisonsCounter++);
    arrayAccesses.push(++arrayAccessesCounter);
    animations.push({
      leftIdx: j + 1,
      rightIdx: j + 1,
    });
    arr[j + 1] = tmp;
  }
  return [animations, comparisons, arrayAccesses];
};

const partitionQuickSort = (
  array,
  lo,
  hi,
  animations,
  comparisons,
  arrayAccesses
) => {
  let pivot = array[hi];
  let i = lo,
    j = hi - 1;
  while (i <= j) {
    comparisons.push(comparisons[comparisons.length - 1] + 1);
    if (array[j] < pivot) {
      arrayAccesses.push(arrayAccesses[arrayAccesses.length - 1] + 5);
      animations.push({
        leftIdx: i,
        rightIdx: j,
        pivot: hi,
        swap: true,
      });
      let tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
      ++i;
    } else {
      arrayAccesses.push(arrayAccesses[arrayAccesses.length - 1] + 1);
      animations.push({
        leftIdx: i,
        rightIdx: j,
        pivot: hi,
        swap: false,
      });
      --j;
    }
  }
  comparisons.push(comparisons[comparisons.length - 1]);
  arrayAccesses.push(arrayAccesses[arrayAccesses.length - 1] + 3);
  animations.push({
    leftIdx: i,
    rightIdx: hi,
    pivot: hi,
    swap: true,
  });
  array[hi] = array[j + 1];
  array[j + 1] = pivot;
  return j + 1;
};

const quickSortHelper = (
  array,
  lo,
  hi,
  animations,
  comparisons,
  arrayAccesses
) => {
  if (lo < hi) {
    let pivot = partitionQuickSort(
      array,
      lo,
      hi,
      animations,
      comparisons,
      arrayAccesses
    );
    array = quickSortHelper(
      array,
      lo,
      pivot - 1,
      animations,
      comparisons,
      arrayAccesses
    );
    array = quickSortHelper(
      array,
      pivot + 1,
      hi,
      animations,
      comparisons,
      arrayAccesses
    );
  }
  return array;
};

export const quickSort = (array) => {
  const animations = [];
  let comparisons = [];
  let arrayAccesses = [];
  comparisons.push(0);
  arrayAccesses.push(0);
  array = quickSortHelper(
    array,
    0,
    array.length - 1,
    animations,
    comparisons,
    arrayAccesses
  );
  return [animations, comparisons, arrayAccesses];
};

export const bubbleSort = (array) => {
  const animations = [];
  let comparisons = [];
  let arrayAccesses = [];
  comparisons.push(0);
  arrayAccesses.push(0);
  let foundUnsortedElements = false;
  let lastIdxSorted = array.length - 1;
  while (lastIdxSorted) {
    for (let i = 0; i < lastIdxSorted; ++i) {
      comparisons.push(comparisons[comparisons.length - 1] + 1);
      if (array[i] > array[i + 1]) {
        arrayAccesses.push(arrayAccesses[arrayAccesses.length - 1] + 6);
        animations.push({
          leftIdx: i,
          rightIdx: i + 1,
          swap: true,
        });
        let tmp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tmp;
        foundUnsortedElements = true;
      } else {
        arrayAccesses.push(arrayAccesses[arrayAccesses.length - 1] + 2);
        animations.push({
          leftIdx: i,
          rightIdx: i + 1,
          swap: false,
        });
      }
    }
    if (!foundUnsortedElements) break;
    foundUnsortedElements = false;
    --lastIdxSorted;
  }
  return [animations, comparisons, arrayAccesses];
};

export const mergeSort = (arrayOne) => {
  const animations = [];
  let comparisons = [];
  let arrayAccesses = [];
  comparisons.push(0);
  arrayAccesses.push(0);
  const arrayTwo = copyArray(arrayOne, arrayOne.length);
  const firstVisualizationComparisonsArray = copyArray(
    arrayOne,
    arrayOne.length
  );
  const secondVisualizationComparisonArray = copyArray(
    arrayOne,
    arrayOne.length
  );
  doMergeSort(
    arrayTwo,
    arrayOne,
    animations,
    comparisons,
    arrayAccesses,
    0,
    arrayOne.length
  );
  return [
    firstVisualizationComparisonsArray,
    secondVisualizationComparisonArray,
    animations,
    comparisons,
    arrayAccesses,
  ];
};

const copyArray = (array, length) => {
  const copiedArray = [];
  for (let i = 0; i < length; ++i) {
    copiedArray.push(array[i]);
  }
  return copiedArray;
};

const doMergeSort = (
  arrayOne,
  arrayTwo,
  animations,
  comparisons,
  arrayAccesses,
  first,
  last
) => {
  if (last - first < 2) return;
  const middle = Math.floor((last + first) / 2);

  doMergeSort(
    arrayTwo,
    arrayOne,
    animations,
    comparisons,
    arrayAccesses,
    first,
    middle
  );
  doMergeSort(
    arrayTwo,
    arrayOne,
    animations,
    comparisons,
    arrayAccesses,
    middle,
    last
  );

  merge(
    arrayOne,
    arrayTwo,
    animations,
    comparisons,
    arrayAccesses,
    first,
    middle,
    last
  );
};

const merge = (
  arrayOne,
  arrayTwo,
  animations,
  comparisons,
  arrayAccesses,
  first,
  middle,
  last
) => {
  let firstHalfIndex = first,
    secondHalfIndex = middle,
    arrayTwoIndex = first;
  while (firstHalfIndex < middle || secondHalfIndex < last) {
    comparisons.push(comparisons[comparisons.length - 1] + 1);
    arrayAccesses.push(arrayAccesses[arrayAccesses.length - 1] + 4);
    if (
      firstHalfIndex < middle &&
      (arrayOne[firstHalfIndex] < arrayOne[secondHalfIndex] ||
        secondHalfIndex >= last)
    ) {
      animations.push({
        insertHere: arrayTwoIndex,
        insertFrom: firstHalfIndex,
      });
      arrayTwo[arrayTwoIndex] = arrayOne[firstHalfIndex];
      ++firstHalfIndex;
    } else {
      animations.push({
        insertHere: arrayTwoIndex,
        insertFrom: secondHalfIndex,
      });
      arrayTwo[arrayTwoIndex] = arrayOne[secondHalfIndex];
      ++secondHalfIndex;
    }
    ++arrayTwoIndex;
  }
  comparisons.push(comparisons[comparisons.length - 1]);
  arrayAccesses.push(arrayAccesses[arrayAccesses.length - 1]);
  animations.push({
    insertHere: -1,
    insertFrom: -1,
  });
};

export const heapSort = (array) => {
  const animations = [];
  let comparisons = [];
  let arrayAccesses = [];
  comparisons.push(0);
  arrayAccesses.push(0);
  buildMaxHeap(array, animations, comparisons, arrayAccesses);
  doHeapSort(array, animations, comparisons, arrayAccesses);
  return [animations, comparisons, arrayAccesses];
};

const buildMaxHeap = (array, animations, comparisons, arrayAccesses) => {
  const length = array.length;
  for (let i = Math.floor(length / 2); i >= 0; --i) {
    const leftChildIndex = i * 2 + 1;
    const rightChildIndex = i * 2 + 2;
    maxHeapify(
      array,
      i,
      leftChildIndex,
      rightChildIndex,
      animations,
      comparisons,
      arrayAccesses
    );
  }
};

const maxHeapify = (
  array,
  parentIndex,
  leftChildIndex,
  rightChildIndex,
  animations,
  comparisons,
  arrayAccesses
) => {
  const leftExists = leftChildIndex < array.length ? true : false;
  const rightExists = rightChildIndex < array.length ? true : false;
  if (
    (leftExists && array[leftChildIndex] > array[parentIndex]) ||
    (rightExists && array[rightChildIndex] > array[parentIndex])
  ) {
    if (rightExists && array[leftChildIndex] < array[rightChildIndex]) {
      swap(
        array,
        parentIndex,
        rightChildIndex,
        animations,
        comparisons,
        arrayAccesses
      );
      const newLeftChildIndex = rightChildIndex * 2 + 1;
      const newRightChildIndex = rightChildIndex * 2 + 2;
      maxHeapify(
        array,
        rightChildIndex,
        newLeftChildIndex,
        newRightChildIndex,
        animations,
        comparisons,
        arrayAccesses
      );
    } else {
      swap(
        array,
        parentIndex,
        leftChildIndex,
        animations,
        comparisons,
        arrayAccesses
      );
      const newLeftChildIndex = leftChildIndex * 2 + 1;
      const newRightChildIndex = leftChildIndex * 2 + 2;
      maxHeapify(
        array,
        leftChildIndex,
        newLeftChildIndex,
        newRightChildIndex,
        animations,
        comparisons,
        arrayAccesses
      );
    }
  }
};

const swap = (
  array,
  indexOne,
  indexTwo,
  animations,
  comparisons,
  arrayAccesses
) => {
  comparisons.push(comparisons[comparisons.length - 1] + 3);
  arrayAccesses.push(arrayAccesses[arrayAccesses.length - 1] + 10);
  animations.push({
    leftIndex: indexOne,
    rightIndex: indexTwo,
  });
  const tmpValue = array[indexOne];
  array[indexOne] = array[indexTwo];
  array[indexTwo] = tmpValue;
};

const doHeapSort = (array, animations, comparisons, arrayAccesses) => {
  for (let i = array.length - 1; i > 0; --i) {
    swap(array, 0, i, animations, comparisons, arrayAccesses);
    siftDown(array, 0, i - 1, animations, comparisons, arrayAccesses);
  }
};

const siftDown = (
  array,
  parentIndex,
  unsortedArrayLength,
  animations,
  comparisons,
  arrayAccesses
) => {
  const leftChildIndex = parentIndex * 2 + 1;
  const rightChildIndex = parentIndex * 2 + 2;
  const leftExists = leftChildIndex <= unsortedArrayLength ? true : false;
  const rightExists = rightChildIndex <= unsortedArrayLength ? true : false;
  if (
    (leftExists && array[leftChildIndex] > array[parentIndex]) ||
    (rightExists && array[rightChildIndex] > array[parentIndex])
  ) {
    if (rightExists && array[leftChildIndex] < array[rightChildIndex]) {
      swap(
        array,
        parentIndex,
        rightChildIndex,
        animations,
        comparisons,
        arrayAccesses
      );
      siftDown(
        array,
        rightChildIndex,
        unsortedArrayLength,
        animations,
        comparisons,
        arrayAccesses
      );
    } else {
      swap(
        array,
        parentIndex,
        leftChildIndex,
        animations,
        comparisons,
        arrayAccesses
      );
      siftDown(
        array,
        leftChildIndex,
        unsortedArrayLength,
        animations,
        comparisons,
        arrayAccesses
      );
    }
  }
};

export const radixLSD = (array) => {
  const animations = [];
  let comparisons = [];
  let arrayAccesses = [];
  comparisons.push(0);
  arrayAccesses.push(0);
  const maxValue = getMaxValue(array);
  for (let i = 1; i <= maxValue; i *= 10) {
    bucketSort(array, i, animations, arrayAccesses);
  }
  return [animations, comparisons, arrayAccesses];
};

const bucketSort = (array, exp, animations, arrayAccesses) => {
  const buckets = createBuckets();
  const arrayLength = array.length;
  for (let i = 0; i < arrayLength; ++i) {
    arrayAccesses.push(arrayAccesses[arrayAccesses.length - 1] + 2);
    animations.push({
      value: -1,
      index: i,
    });
    const value = array[i];
    const bucket = Math.floor(value / exp) % 10;
    buckets[bucket].push(value);
  }

  let indexInSortedArray = 0;
  for (let j = 0; j < 10; ++j) {
    const bucketLength = buckets[j].length;
    for (let k = 0; k < bucketLength; ++k) {
      const val = buckets[j][k];
      arrayAccesses.push(arrayAccesses[arrayAccesses.length - 1] + 4);
      animations.push({
        value: val,
        index: indexInSortedArray,
      });
      array[indexInSortedArray] = val;
      ++indexInSortedArray;
    }
  }
};

const createBuckets = () => {
  let arr = [];
  for (let i = 0; i < 10; ++i) {
    arr.push([]);
  }
  return arr;
};

const getMaxValue = (array) => {
  let max = 0;
  const length = array.length;
  for (let i = 0; i < length; ++i) {
    if (array[i] > max) max = array[i];
  }
  return max;
};
