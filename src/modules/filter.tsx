const groupByArray = () => {
  {/** FUNCTION GROUP BY */}
  const groupBy = (listDashboard, key) => {
    return listDashboard.reduce(function(accumulator, current) {
      (accumulator[current[key]] = accumulator[current[key]] || []).push(current);
      return accumulator;
    }, {});
  }

  return {
    groupBy
  }
}

export default groupByArray;