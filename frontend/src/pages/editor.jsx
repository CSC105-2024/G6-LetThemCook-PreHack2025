import { useState } from "react";

function Editor() {
  const [title, setTitle] = useState("");
  const [nationality, setNationality]= useState("Thai");
  const [category, setCategory] = useState("Dessert")
  const [description , setDescription ]= useState("");
  const [image, setImage]= useState(null);
  const[ingredients, setIngredients] = useState([""]);
  const [steps , setSteps] = useState([""]);

  const handleAddIngredient = () =>{
    setIngredients([...ingredients, ""]);
  }
  const handleRemoveIngredient = (index) =>{
    setIngredients(ingredients.filter((_,i)=> i !== index));
  }
  const handleIngredientChange = (index,value)=>{
    const newIngredient = [...ingredients];
    newIngredient[index] = value;
    setIngredients(newIngredient);
  }
  const handleAddStep = () =>{
    setSteps([...steps,""]);
  }
  const handleRemoveStep = (index)=>{
    setSteps(steps.filter((_,i)=>i!==index));
  }
  const handleStepChange = (index,value)=>{
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  }
  const handleImageChange = (e)=>{
    setImage(e.target.files[0]);
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(title.trim()===""){
      alert("pls enter recepie");
      return;
    }
    const nonEmptyIngre = ingredients.filter(i=>i.trim() !== "");
    if(nonEmptyIngre.length===0){
      alert("Pls add at least one ingredient.");
      return;
    }
    const nonEmptySteps = steps.filter(i=>i.trim() !== "");
    if(nonEmptySteps.length===0){
      alert("Pls add at least one step.");
      return;
    }
    console.log({
      title,
      nationality,
      category,
      description,
      image,
      ingredients:nonEmptyIngre,
      steps: nonEmptySteps,
    })
  }
  return (
    <div>
      <div className="editor-container">
        <div className="tape"></div>
        <div className="circle-row"></div>
        <form onSubmit={handleSubmit}>
          <h4>Add your recipe</h4>
          <input placeholder="Recipe title" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
          <div className="dropdowm">
            <div>
              <label>Nationality</label>
              <select value={nationality} onChange={(e)=>setNationality(e.target.value)}>
                <option>Thai</option>
                <option>Italian</option>
                <option>Korean</option>
              </select>
            </div>
            <div>
              <label>Category</label>
              <select value={category} onChange={(e)=>setCategory(e.target.value)}>
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
              <input type="file" onChange={handleImageChange}/>
            </div>
          </div>
          <input type="text" placeholder="Description" 
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          />
          <div className="ingreInput">
            <h4>Ingredients</h4>
            <ul className="addIngreBox">
              {ingredients.map((ingredients,index)=>(
                <li key={index}>
                  <input
                  placeholder="e.g. 1/2 tsp salt"
                  value={ingredients}
                  onChange={(e)=>handleIngredientChange(index,e.target.value)}
                  />
                  <button onClick={()=>handleRemoveIngredient(index)}>
                    <img src="AddMenu/bin.svg" alt="remove" />
                  </button>
                </li>
               
              ))}
            </ul>
            <div className="addIngre">
              <button onClick={handleAddIngredient}>+ADD INGREDIENT</button>
            </div>
          </div>
          <hr />
          <div className="DirectionInput">
            <h4>Directions</h4>
            <ul className="addIngreBox">
              {steps.map((steps , index)=>(
                <li key={index}>
                  <input
                  onChange={(e)=>handleStepChange(index,e.target.value)}
                  value={steps}
                  placeholder="e.g.  Heat a non-reactive pot over medium heat. 
Melt in 4 Tbsp butter then sautee onions until softened and golden (10-12 min). "
                  />
                  <button onClick={()=>handleRemoveStep(index)}>
                    <img src="AddMenu/bin.svg" alt="remove" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="addStep">
              <button onClick={handleAddStep}>+ADD STEP</button>
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
