exports.sortData = (data, sortBy) => {
    if (sortBy === 'nome') {
      return data.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (sortBy === 'mesa') {
      return data.sort((a, b) => a.mesa.localeCompare(b.mesa));
    } else if (sortBy === 'votou') {
      return data.sort((a, b) => b.votou - a.votou);
    }
    return data;
  };
  
  exports.filterData = (data, filterBy) => {
    if (filterBy) {
      return data.filter((item) => item.nome.toLowerCase().includes(filterBy.toLowerCase()));
    }
    return data;
  };