import React from 'react';
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient";

const burger = (props) => {
  console.log("Tranformation", Object.keys(props.ingredients));

  // Object.keys() is a default javaScript object which extracts the keys of a given object and turns it into an array of the keys
  // Our Object.keys(props.ingredients) will be and array of strings ["salad", "bacon", "cheese", "meat"]
  let transformedIngredients = Object.keys(props.ingredients)
    // map executes a function on each element in the input array
    // igKey represents the ingredient keys (salad, bacon, cheese, meat)...
    .map(igKey => {
      // this is transforming the string value into an array with as many elements
      // the spread operator is used (...) with the javaScript method Array() w/ length of array inside the parentheses
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        console.log("Array", props.ingredients[igKey]);
        // before the 2nd .map(), we have an array with 2 elements [,]
        // an underscore is used to represent a blank, the index is what matters
        return <BurgerIngredient key={igKey + i} type={igKey} />
        // key= igKey (the string) and i (the index) and type= property type
      })
    }).reduce((arr, el) => {
      return arr.concat(el)
    }, []);
    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients!</p>
    }
    // .reduce() takes a function as an input w/ 2 arg. auto (previous (arr) & current (el) value)
    // it also provides an initial value [], with each interation it will add the reduced value to the initial
    console.log("transformedIngredients", transformedIngredients);
  return (

    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
