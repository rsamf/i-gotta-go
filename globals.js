class Validator {
  constructor(model){
    this.truth = model.schema.obj;
  }

  isTopNull(T, detail) {
    if(T )
    let keys = Object.keys(T);
    keys.forEach(k => {
      if(!detail[k]) return false;
    });
    return true;
  }

  verify(detail){
      return !this.isTopNull(this.truth, detail);
  }
}

class BathroomValidator extends Validator{
  constructor(){
    super(require('./models/bathroom'));
  }

  verify(detail){
    let valid = !this.isTopNull(this.truth, detail);
    if(!valid) return null;
    valid = !this.isTopNull(this.truth.location, detail.location);
    if(!valid) return null;


    let errors = [];
    let _ = detail.location;
    if(_.buildingName.length >= 20) errors.push("Building name should be less than 20 characters");
    if(_.street.length >= 20) errors.push("Street should be less than 20 characters");
    if(_.city.length >= 20) errors.push("City should be less than 20 characters");
    if(_.state.length !== 2) errors.push("State should be 2 characters long. (Use state code)");
    if(_.zip.length !== 5 && !isNaN(parseInt(_.zip))) errors.push("Zip code should be 5 numbers long.");
  }
}
module.exports = {
  BRTag: {
    AllGender: "ALL_GENDER",
    FamilyFriendly: "FAMILY_FRIENDLY"
  },
  Validator: Validator,
  BathroomValidator: BathroomValidator
};