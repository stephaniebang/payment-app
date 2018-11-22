/* Set tableIndex to value. If value = -1, activate table list view mode,
 * else activate table tab view mode
 */
export const updateTableIndex = (state, value) => {
  state.tableIndex = value;
};

export const changeItemSelection = ind => {
/* Set item as selected, triggering payment mode view only when the item
 * wasn't fully paid, or set it as unselected
 */
  //this.dish.selected = !this.dish.selected;
};

