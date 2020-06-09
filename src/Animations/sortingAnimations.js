export const insertionSortAnimations = (animations) => {
  const arrayBars = document.getElementsByClassName("array-bar");

  for (let i = 0; i < animations.length; ++i) {
    const { leftIdx, rightIdx } = animations[i];
    const leftBarStyle = arrayBars[leftIdx].style;
    const rightBarStyle = arrayBars[rightIdx].style;
    if (leftIdx === rightIdx) {
      setTimeout(() => {
        leftBarStyle.backgroundColor = "turquoise";
      }, i * 5);
    } else {
      setTimeout(() => {
        rightBarStyle.backgroundColor = "red";
        const tmpHeight = leftBarStyle.height;
        leftBarStyle.height = rightBarStyle.height;
        rightBarStyle.height = tmpHeight;
        rightBarStyle.backgroundColor = "turquoise";
        leftBarStyle.backgroundColor = "red";
      }, i * 5);
    }
  }
};

export const quickSortAnimations = (animations) => {
  const arrayBars = document.getElementsByClassName("array-bar");
  const animationsLength = animations.length;

  for (let i = 0; i < animationsLength; ++i) {
    const { leftIdx, rightIdx, pivot, swap } = animations[i];
    const leftBarStyle = arrayBars[leftIdx].style;
    const rightBarStyle = arrayBars[rightIdx].style;
    const pivotBarStyle = arrayBars[pivot].style;
    setTimeout(() => {
      pivotBarStyle.backgroundColor = "purple";
      leftBarStyle.backgroundColor = "red";
      setTimeout(() => {
        leftBarStyle.backgroundColor = "turquoise";
        if (swap) {
          if (rightIdx === pivot) rightBarStyle.backgroundColor = "turquoise";
          const tmpHeight = leftBarStyle.height;
          leftBarStyle.height = rightBarStyle.height;
          rightBarStyle.height = tmpHeight;
        }
      }, 3);
    }, i * 5);
  }
};

export const bubbleSortAnimations = (animations) => {
  const arrayBars = document.getElementsByClassName("array-bar");
  const animationsLength = animations.length;

  for (let i = 0; i < animationsLength; ++i) {
    const { leftIdx, rightIdx, swap } = animations[i];
    const leftBarStyle = arrayBars[leftIdx].style;
    const rightBarStyle = arrayBars[rightIdx].style;
    setTimeout(() => {
      leftBarStyle.backgroundColor = "red";
      rightBarStyle.backgroundColor = "red";
      setTimeout(() => {
        leftBarStyle.backgroundColor = "turquoise";
        rightBarStyle.backgroundColor = "turquoise";
        if (swap) {
          const tmpHeight = leftBarStyle.height;
          leftBarStyle.height = rightBarStyle.height;
          rightBarStyle.height = tmpHeight;
        }
      }, 3);
    }, i * 5);
  }
};

export const mergeSortAnimations = (arrayOne, arrayTwo, animations) => {
  const arrayBars = document.getElementsByClassName("array-bar");
  const animationsLength = animations.length;

  for (let i = 0; i < animationsLength; ++i) {
    const { insertHere, insertFrom } = animations[i];
    setTimeout(() => {
      if (insertHere === -1) {
        copyArrays(arrayOne, arrayTwo);
      } else {
        const insertHereBarStyle = arrayBars[insertHere].style;
        insertHereBarStyle.backgroundColor = "red";
        insertHereBarStyle.height = `${arrayOne[insertFrom]}px`;
        arrayTwo[insertHere] = arrayOne[insertFrom];
        setTimeout(() => {
          insertHereBarStyle.backgroundColor = "turquoise";
        }, 4);
      }
    }, i * 5);
  }
};

const copyArrays = (arrayOne, arrayTwo) => {
  for (let i = 0; i < arrayOne.length; ++i) {
    arrayOne[i] = arrayTwo[i];
  }
};

export const heapSortAnimations = (animations) => {
  const arrayBars = document.getElementsByClassName("array-bar");
  const animationsLength = animations.length;

  for (let i = 0; i < animationsLength; ++i) {
    const { leftIndex, rightIndex } = animations[i];
    setTimeout(() => {
      const leftBarStyle = arrayBars[leftIndex].style;
      const rightBarStyle = arrayBars[rightIndex].style;
      leftBarStyle.backgroundColor = "red";
      rightBarStyle.backgroundColor = "red";
      const tmpHeight = leftBarStyle.height;
      leftBarStyle.height = rightBarStyle.height;
      rightBarStyle.height = tmpHeight;
      setTimeout(() => {
        leftBarStyle.backgroundColor = "turquoise";
        rightBarStyle.backgroundColor = "turquoise";
      }, 4);
    }, i * 5);
  }
};

export const radixLSDAnimations = (animations) => {
  const arrayBars = document.getElementsByClassName("array-bar");
  const animationsLength = animations.length;

  for (let i = 0; i < animationsLength; ++i) {
    const { value, index } = animations[i];
    const barAtIndexStyle = arrayBars[index].style;
    setTimeout(() => {
      barAtIndexStyle.backgroundColor = "red";
      if (value !== -1) {
        barAtIndexStyle.height = `${value}px`;
      }
      setTimeout(() => {
        barAtIndexStyle.backgroundColor = "turquoise";
      }, 4);
    }, i * 5);
  }
};
