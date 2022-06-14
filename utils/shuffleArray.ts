const handleShuffle = <T>(arr: T[]): T[] => {
  let j: number;
  let temp: T;

  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));

    console.log(j)
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
}

export default handleShuffle