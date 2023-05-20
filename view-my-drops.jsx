const user = context.accountId;

if (!user) {
  return "Please Sign In!";
}

State.init({
  numDrops,
  dropIds: [],
  dropTypes: [],
});

const keypom_contract = "v2.keypom.testnet";
let my_drops = Near.view(keypom_contract, "get_drop_for_owner", {
  account_id: state.user,
});

let drop_ids = [];
let drop_types = [];

for (var i = 0; i < my_drops.length; i++) {
  let dropObj = JSON.parse(my_drops[i]);
  drop_ids.push(dropObj.drop_id);
  if (dropObj.hasOwnProperty("simple")) {
    drop_types.push("Simple Drop");
  } else if (dropObj.hasOwnProperty("nft")) {
    drop_types.push("Non-Fungible Token Drop");
  } else if (dropObj.hasOwnProperty("ft")) {
    drop_types.push("Fungible Token Drop");
  } else {
    drop_types.push("Function Call Drop");
  }
}

State.update({
  numDrops: my_drops.length,
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

// Render
return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">Number of Drops:</h3>
      <p> {my_drops.length} </p>
      <h3 class="text-center">Your Drop IDs:</h3>
      <p> {state.dropIds} </p>
      <h3 class="text-center">Types of Drops:</h3>
      <p> {state.dropTypes} </p>

      {get_user_form}
    </div>
  </>
);
