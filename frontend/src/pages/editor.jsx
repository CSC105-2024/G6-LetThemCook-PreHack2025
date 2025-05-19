import { useState } from "react";

function Editor() {
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const handleAddIngre = () => {
    setIngredients([...ingredients, ""]);
  };
  const handleRemoveIngre = (idex) => {
    setIngredients(ingredients.filter((_,i)=> i!== index ))
  };
  
  return (
    <div>
      <div className="editor-container">
        <div className="tape"></div>
        <div className="circle-row"></div>
        <form>
          <h4>Add your recipe</h4>
          <input placeholder="Recipe title" />
          <div className="dropdowm">
            <div>
              <label>Nationality</label>
              <select>
                <option>Thai</option>
                <option>Italian</option>
                <option>Korean</option>
              </select>
            </div>
            <div>
              <label>Category</label>
              <select>
                <option>Dessert</option>
                <option>Fried</option>
                <option>Boiled</option>
                <option>Soup</option>
              </select>
            </div>
          </div>
          <div className="imgfield">
            <div className="insideimg">
              <img src="AddMenu/upload_icon.svg" />
              <button>CHOOSE FILE</button>
            </div>
          </div>
          <input type="text" placeholder="Description" />
          <div className="ingreInput">
            <h4>Ingredients</h4>
            <ul className="addIngreBox">
              <li>
                <input placeholder="e.g. Crushed tomatoes" />
                <button>
                  <img src="AddMenu/bin.svg" />
                </button>
              </li>
              <li>
                <input placeholder="e.g 1/4 cup fresh basil" />
                <button>
                  <img src="AddMenu/bin.svg" />
                </button>
              </li>
              <li>
                <input placeholder="e.g. butter" />
                <button>
                  <img src="AddMenu/bin.svg" />
                </button>
              </li>
            </ul>
            <div className="addIngre">
              <button>+ADD INGREDIENT</button>
            </div>
          </div>
          <hr />
          <div className="DirectionInput">
            <h4>Directions</h4>
            <ul className="addIngreBox">
              <li>
                <input
                  placeholder="e.g.  Heat a non-reactive pot over medium heat. 
Melt in 4 Tbsp butter then sautee onions until softened and golden (10-12 min). "
                />
                <button>
                  <img src="AddMenu/bin.svg" />
                </button>
              </li>
              <li>
                <input placeholder="e.g. Stir in two 28 oz cans of crushed tomatoes with their juice, your chicken stock, chopped basil, sugar and black pepper. " />
                <button>
                  <img src="AddMenu/bin.svg" />
                </button>
              </li>
              <li>
                <input placeholder="e.g. use an immersion blender in the pot or blend in batches using a blender (be careful not to overfill the blender with hot liquid) and return soup to the pot." />
                <button>
                  <img src="AddMenu/bin.svg" />
                </button>
              </li>
            </ul>
            <div className="addStep">
              <button>+ADD STEP</button>
            </div>
          </div>
          <hr />
          <div className="edit-btn">
            <button>CANCEL</button>
            <button>SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Editor;
