const keypom_contract = "v2.keypom.near";

// if (!user){
//     return "Please Sign In";
// }

// Use and manipulate state
State.init({ 
    num_drops: 100000,
    user: context.accountId
});


const onInputChange = ({ target }) => {
    State.update({ 
        user: target.value 
    });
};

const onBtnClick = () => {
    // if (!state.user) {
    //   return;
    // }   

    let tempNum = Near.view(
        keypom_contract, 
        "get_drop_supply_for_owner",
        {
            account_id: state.user,
        }
    );
    State.update({
        num_drops: tempNum,
        user: state.user
    });
};


const get_user_form = (
    <>
    <div class="border border-black p-3">
      <label>User Account ID</label>
      <input placeholder="benji.near" onChange={onInputChange} />
      <button class="btn btn-primary mt-2" onClick={onBtnClick}>
        Update
      </button>
    </div>
  </>
)

// Render
return (
<>
  <div class="container border border-info p-3">
    <h3 class="text-center">
      The number of drops for {state.user}:
      <span class="text-decoration-underline"> {state.num_drops} </span>
    </h3>

    <p class="text-center py-2">
      Look at that! The number of drops, stored on the NEAR blockchain.
    </p>

    {get_user_form}
  </div>
</>)

