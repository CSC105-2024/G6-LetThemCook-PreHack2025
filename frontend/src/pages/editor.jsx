import { z } from "zod";
import { useState } from "react";

const recipeSchema = z.object({
  title: z.string().min(1, "Please enter a recipe title."),
  nationality: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  image: z.any().nullable(),
  ingredients: z
    .array(z.string().min(1, "Empty ingredient."))
    .min(1, "Please add at least one ingredient"),
  steps: z
    .array(z.string().min(1, "Empty steps."))
    .min(1, "Please add at least one step"),
});

function Editor() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [nationality, setNationality] = useState("Thai");
  const [category, setCategory] = useState("Dessert");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (e, index) => {
    e.preventDefault();
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
    
  if (submitted && value.trim()) {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors.ingredients?.[index]) {
        newErrors.ingredients[index] = undefined;
      }
      return newErrors;
    });
  }
}

  const handleAddStep = (e) => {
    e.preventDefault();
    setSteps([...steps, ""]);
  };

  const handleRemoveStep = (e, index) => {
    e.preventDefault();
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
    if(submitted && value.trim()){
      setErrors((prev)=>{
        const newErrors = {...prev};
        if (newErrors.steps?.[index]) {
        newErrors.steps[index] = undefined;
      }
      return newErrors;
      })
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const parsed = recipeSchema.safeParse({
      title,
      nationality,
      category,
      description,
      image,
      ingredients,
      steps,
    });

    if (!parsed.success) {
      setErrors(parsed.error.format());
      return;
    }

    setErrors({}); 
    const formData = new FormData();
    const userId = parseInt(localStorage.getItem("userId"))
    if(userId) formData.append("userId", userId)
    formData.append("title", title);
    formData.append("nationality", nationality);
    formData.append("category", category);
    formData.append("description", description);
    if (image) formData.append("image", image);
    ingredients.forEach((item, i) =>
      formData.append(`ingredients[${i}]`, item)
    );
    steps.forEach((step, i) => formData.append(`steps[${i}]`, step));

    console.log("Submitting FormData:", formData);
    

    try{
      const res = await fetch("http://localhost:3000/recipe/addRecipe",{
        method:"POST",
        credentials:"include",
        body: formData
      })
      if(!res.ok){
        const errorText = await res.text();
        console.error("Failed to create post:", errorText);
        return;
      }
      const data = await res.json();
      console.log(data);

    }catch (err) {
    console.error("Network error:", err);
  }
  };

  return (
    <div className="editor-container">
      <form onSubmit={handleSubmit}>
        <h4>Add your recipe</h4>
        <div className="inputTitle">
          <input
            placeholder="Recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {submitted && errors.title && <p>{errors.title._errors[0]}</p>}
        </div>
        <div className="dropdowm">
          <div>
            <label>Nationality</label>
            <select
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              <option>Thai</option>
              <option>Italian</option>
              <option>Korean</option>
            </select>
          </div>
          <div>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Dessert</option>
              <option>Fried</option>
              <option>Boiled</option>
              <option>Soup</option>
            </select>
          </div>
        </div>
        <div className="imgfield">
          <div
            className="insideimg"
            style={{
              backgroundImage: imagePreview
                ? `url(${imagePreview})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!imagePreview && <img src="AddMenu/upload_icon.svg" />}
            <input type="file" onChange={handleImageChange} />
          </div>
        </div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="ingreInput">
          <h4>Ingredients</h4>
          <ul className="addIngreBox">
            {ingredients.map((ing, index) => (
              <li key={index}>
                <input
                  placeholder="e.g. 1/2 tsp salt"
                  value={ing}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                <button onClick={(e) => handleRemoveIngredient(e, index)}>
                  <img src="AddMenu/bin.svg" alt="remove" />
                </button>
                {submitted &&
                  errors.ingredients?.[index]?._errors && (
                    <p>{errors.ingredients[index]._errors[0]}</p>
                  )}
              </li>
            ))}
          </ul>
          {submitted && errors.ingredients?._errors && (
            <p>{errors.ingredients._errors[0]}</p>
          )}
          <div className="addIngre">
            <button onClick={handleAddIngredient}>+ADD INGREDIENT</button>
          </div>
        </div>

        <hr />
        <div className="DirectionInput">
          <h4>Directions</h4>
          <ul className="addIngreBox">
            {steps.map((step, index) => (
              <li key={index}>
                <input
                  placeholder="e.g. Heat butter and sauté onions..."
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                />
                <button onClick={(e) => handleRemoveStep(e, index)}>
                  <img src="AddMenu/bin.svg" alt="remove" />
                </button>
                {submitted &&
                  errors.steps?.[index]?._errors && (
                    <p>{errors.steps[index]._errors[0]}</p>
                  )}
              </li>
            ))}
          </ul>
          {submitted && errors.steps?._errors && (
            <p>{errors.steps._errors[0]}</p>
          )}
          <div className="addStep">
            <button onClick={handleAddStep}>+ADD STEP</button>
          </div>
        </div>

        <hr />
        <div className="edit-btn">
          <button type="button" onClick={() => window.location.reload()}>
            CANCEL
          </button>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default Editor;
