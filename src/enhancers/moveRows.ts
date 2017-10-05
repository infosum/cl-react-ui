const moveRows = ({ setData, data, addScript }) => {
  return (selected, direction) => {

    // Get selected indexes
    const selectedIndexes = selected.map((sel) => {
      return data.findIndex((d) => d.id === sel.id);
    });

    // Reduce data removing selected
    let newData = data.reduce((prev, next, i) => {
      if (selectedIndexes.indexOf(i) === -1) {
        prev.push(next);
      }
      return prev;
    }, []);

    // slice back in re-ordered selected indexes
    selected.forEach((sel, i) => {
      const newIndex = selectedIndexes[i] + direction;
      newData = [
        ...newData.slice(0, newIndex),
        sel,
        ...newData.slice(newIndex),
      ];
    });
    addScript(newData);
    return setData(newData);
  };
};

export default moveRows;
