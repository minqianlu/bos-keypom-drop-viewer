const user = context.accountId;

if (!user) {
  return "Please Sign In!";
}

const keypom_contract = "v2.keypom.testnet";

let my_drops = Near.view(keypom_contract, "get_drops_for_owner", {
  account_id: user,
});

let keysVec = Near.view(keypom_contract, "get_keys_for_drop", {
  drop_id: my_drops[my_drops.length - 1],
});

State.init({
  dropId: my_drops[my_drops.length - 1],
  keys: keysVec,
});

State.update({
  //   numDrops: my_drops.length,
  dropIds: drop_ids,
  dropTypes: drop_types,
});

// const uglyIdDispley = (
//   <>
//     <div class="border border-black p-3">
//       <label>Drop IDs</label>
//     </div>
//   </>
// );
//   <h3 class="text-center">Your Drop IDs:</h3>
//   <p>
//     {" "}
//     {state.dropIds.map((el, index) => {
//       <p key={index}>{el}</p>;
//     })}{" "}
//   </p>
//   <h3 class="text-center">Types of Drops:</h3>
//   <p>
//     {" "}
//     {state.dropTypes.map((el, index) => {
//       <p key={index}>{el}</p>;
//     })}{" "}
//   </p>
// Render

return (
  <>
    <div class="container border border-info p-3">
      <h2 class="text-center"> LIMITED TO 50 </h2>
      <h3 class="text-center">Drop ID:</h3>
      <p class="text-center"> {state.dropId} </p>
      <h3 class="text-center">Keys:</h3>
      <p class="text-center">
        {state.keys.map((key) => (
          <div key={key}>
            {" "}
            Public Key: {key.pk} Remaining Uses: {key.remaining_uses}{" "}
          </div>
        ))}
      </p>
      <h3 class="text-center">Your Drop Types:</h3>
      <p class="text-center">
        {state.dropTypes.map((type) => (
          <div key={type}> {type} </div>
        ))}
      </p>
    </div>
  </>
);
