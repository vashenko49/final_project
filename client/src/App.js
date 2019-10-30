import React from 'react';
import "./../node_modules/materialize-css/dist/css/materialize.min"
import materialize from './../node_modules/materialize-css/dist/js/materialize.min'
import './App.css';
import Product from './../src/components/Product/Product.js'
function App() {
  return (
      <div>
         <Product></Product> {/*just test  */}
      </div>
  );
}

export default App;
