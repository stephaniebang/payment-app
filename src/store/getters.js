const totalLeft = table => {
  return table.dishes.reduce((total, dish) => total+dish.left, 0);
};

// current chosen table index. Is -1 when none
export const tableIndex = state =>
  state.tableIndex;

// number of tables
export const numTables = state =>
  state.tables.length;

// infos of table of index i in table list
export const numDishes = state => i =>
  state.tables[i].dishes.length;

export const tableNumber = state => i =>
  state.tables[i].n;

export const tableStatus = state => i =>
  (1 - totalLeft(state.tables[i]) /
   state.tables[i].dishes.reduce((total, dish) => total+dish.total, 0)
  )*100;

export const tableTotal = state => i =>
  state.tables[i].dishes.reduce((total, dish) => total+dish.left, 0);

// info of dish of index i in current table's dish list
export const dish = state => i =>
  state.tables[state.tableIndex].dishes[i];

