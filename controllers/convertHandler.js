/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
    const regexOnlyNumbers = /[\d\][\.\/]+/g
    const regexOnlyCharacters = /[a-zA-Z]+/
    const units = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    
  this.getNum = function(input) {

      let result;

      if(input[0].match(/[a-zA-Z]+/g)){

        return 1;
      }

      result = input.match(regexOnlyNumbers)[0]

      if(result.toString().includes('/')){
        let values = result.toString().split('/')
        if(values.length != 2){
          return 'invalid number'
        }
        values[0] = parseFloat(values[0])
        values[1] = parseFloat(values[1])
        result = parseFloat((values[0]/values[1]).toFixed(5));
        return result;
      }
      
      if(isNaN(result)){
        return 'invalid number';
      }

      return result;
  };
  
  this.getUnit = function(input) {
    let result= input.match(regexOnlyCharacters)[0];

    console.log(result + ' result of first getUnit regex match')
    //string.indexOf() returns -1 if no match occurs
    if(result === 'l' | result ==='L'){
      return 'L'
    }

    if(units.indexOf(input)===-1){
      return 'invalid unit'
    }

    
    return result.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    // gal to L
    //lbs to kg
    //mi to km
    let result;
    switch(initUnit){
      case 'gal':
         result = 'L';
         break;
      case 'L':
        result='gal';
        break;
      case 'lbs':
        result='kg'
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result= 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        break;
    }
    console.log(result);
   
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch(unit){
      case 'gal':
         result = 'gallons';
         break;
      case 'L':
        result='liters';
        break;
      case 'lbs':
        result='pounds'
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result= 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        break;
    }
    console.log(result);
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit){
        case 'mi':
                result = Number((initNum*miToKm).toFixed(5));
                break;
              case 'km':
                result = Number((initNum/miToKm).toFixed(5));
                break;
              case 'lbs':
                result = Number((initNum*lbsToKg).toFixed(5));
                break;
              case 'kg':
                result = Number((initNum/lbsToKg).toFixed(5));
                break;
              case 'gal':
                result = Number((initNum*galToL).toFixed(5));
                break;
              case 'L':
                result = Number((initNum/galToL).toFixed(5));
                break;
              default:
                break;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    
    let numToReturn = returnNum;
    // if(returnNum.includes('.')){
    //   returnNum = parseFloat(returnNum);
    // }else{
    //   returnNum = parseInt(returnNum)
    // }

    let spelledOutUnit = this.spellOutUnit(initUnit)
    let result = `${initNum} ${initial_Units=spelledOutUnit} converts to ${returnNum} ${return_Units=returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
