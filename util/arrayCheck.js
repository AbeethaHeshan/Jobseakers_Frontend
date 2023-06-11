export const get_array_lendth_and_value_ok = (arr) => {
    console.log(arr);
    if (Array.isArray(arr) && arr.every((value) => value === false)) {
         return false;
      } else {
         return true;
      }
}