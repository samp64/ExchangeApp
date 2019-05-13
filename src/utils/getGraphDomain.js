
export default function getGraphDomain(dataSet, key) {
  let highValue = 0;
  let lowValue = 1000;

  Object.values(dataSet).forEach(data => {
    if(data[key] > highValue) {
      highValue = data[key];
    }
    if(data[key] < lowValue) {
      lowValue = data[key];
    }
  });

  return [lowValue * 0.99, highValue * 1.01];
}