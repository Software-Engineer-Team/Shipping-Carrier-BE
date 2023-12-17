// export default {
//   beforeCreate(event) {
//     const { data, where, select, populate } = event.params;
//     console.log("Before create data order");
//     console.log(data);
//     // let's do a 20% discount everytime
//     // event.params.data.price = event.params.data.price * 0.8;
//   },
//
//   afterCreate(event) {
//     const { result, params } = event;
//     console.log("After create data");
//     console.log(result);
//     // do something to the result;
//   },
// };
