/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '32.2L';
      assert.equal(convertHandler.getNum(input), 32.2)
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '1/2kg';
      assert.equal(convertHandler.getNum(input), 0.5)
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = '3.5/4';
      assert.equal(convertHandler.getNum(input),eval(3.5/4));
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input='3.5/4/';
      assert.equal(convertHandler.getNum(input),'invalid number')
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = 'sadsa';
      assert.equal(convertHandler.getNum(input),1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {

      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];

      //I am using async arrow functions to workaround chai's async testing methods!
      const chaiAsyncWorkaround = async (resolve)=>{
          input.forEach(function(ele) {
                  assert.equal(convertHandler.getUnit('10'+ele), ele.toLowerCase());
                })
      }
      chaiAsyncWorkaround();
      
      
      done();

    });
    
    test('Unknown Unit Input', function(done) {
      let input = '12ce'
      assert.equal(convertHandler.getUnit(input),'invalid unit')
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['L','gal','km','mi','kg','lbs'];

      const chaiAsyncWorkaround = async () => {
        input.forEach(function(ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
              });
      }
      chaiAsyncWorkaround();
      
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];

      const chaiAsyncWorkaround = async () =>{
          input.forEach(function(ele,i){
                  assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
                });

          resolve();
      }
      chaiAsyncWorkaround();
      
      //see above example for hint
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    test('Gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [5, 'L'];
      let expected = 5/galToL;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [5, 'mi'];
      let expected = 5*miToKm;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [5, 'km'];
      let expected = 5/miToKm;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 5*lbsToKg;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [5, 'kg'];
      let expected = 5/lbsToKg;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});