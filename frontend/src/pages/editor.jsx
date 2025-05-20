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
  };

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
    if (submitted && value.trim()) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors.steps?.[index]) {
          newErrors.steps[index] = undefined;
        }
        return newErrors;
      });
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
    const userId = parseInt(localStorage.getItem("userId"));
    if (userId) formData.append("userId", userId);
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

    try {
      const res = await fetch("http://localhost:3000/recipe/addRecipe", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to create post:", errorText);
        return;
      }
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <div className="editor-container flex min-h-screen justify-center items-center  bg-[#E9E5DC]">
      <form
        onSubmit={handleSubmit}
        className="bg-white relative md:px-10 mt-20 mb-20 px-7 py-10 flex flex-col gap-5"
      >
        <div className="tape-container absolute top-[-20px] left-0 w-full flex items-center justify-center">
          <div className="tape  h-10 w-40 bg-[#AE7E67] opacity-90"></div>
        </div>
        <div className="circle-row flex flex-row justify-between">
          <div className="circle bg-[#D9D9D9] h-5 w-5 rounded-full"></div>
          <div className="circle bg-[#D9D9D9] h-5 w-5 rounded-full"></div>
          <div className="circle bg-[#D9D9D9] h-5 w-5 rounded-full"></div>
          <div className="circle bg-[#D9D9D9] h-5 w-5 rounded-full"></div>
          <div className="circle bg-[#D9D9D9] h-5 w-5 rounded-full"></div>
          <div className="circle bg-[#D9D9D9] h-5 w-5 rounded-full"></div>
          <div className="circle bg-[#D9D9D9] h-5 w-5 rounded-full"></div>
          <div className="circle bg-[#D9D9D9] h-5 w-5 rounded-full"></div>
          <div className="circle bg-[#D9D9D9] h-5 w-5 rounded-full"></div>
        </div>
        <h4 className="text-3xl font-bold">Add your recipe</h4>
        <div className="inputTitle flex flex-col gap-2">
          <label>Recipe Title <span className="text-red-500">*</span> </label>
          <input
            className="px-4 py-3 border-1 w-full rounded-[10px]"
            placeholder="e.g Lasagna"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {submitted && errors.title && (
            <p className="text-red-500 pt-2">{errors.title._errors[0]}</p>
          )}
        </div>
        <div className="dropd">
        <div className="dropdowm flex w-full flex-col md:flex-row gap-5 ">
          <div className="md:w-1/2 flex flex-col gap-2">
          <label className="w-1/2">Nationality</label>
            <select
              className="w-full border-1 rounded-[10px] px-2 py-2"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              <option>Thai</option>
              <option>Italian</option>
              <option>Korean</option>
            </select>
          </div>
          <div className="md:w-1/2 flex flex-col gap-2">
          <label className="w-1/2">Category</label>
            <select
              className="w-full border-1 rounded-[10px] px-2 py-2"
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
        </div>
        <div className="imgfield md:w-[500px] flex-col flex border-1 rounded-[10px]">
          <div
            className="insideimg  h-[300px] flex justify-center items-center "
            style={{
              backgroundImage: imagePreview
                ? `url(${imagePreview})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!imagePreview && <img src="AddMenu/upload_icon.svg" />}
          </div>
          <input
            className="border-1 px-2 py-5 m-3"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="des flex flex-col gap-2">
        <p>Description</p>
        <textarea
          className="px-4 py-3 border-1 w-full rounded-[10px]"
          type="text"
          placeholder="e.g.This lasagna recipe takes a little work, but it is so satisfying and filling that it's worth it! "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div className="ingreInput">
          <h4 className="font-bold text-2xl">Ingredients</h4>
          <ul className="addIngreBox">
            {ingredients.map((ing, index) => (
              <li key={index} className="flex gap-2 py-3">
                <input
                  className="px-4 py-3 border-1 w-full rounded-[10px]"
                  placeholder="e.g. 1/2 tsp salt"
                  value={ing}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                />
                <button onClick={(e) => handleRemoveIngredient(e, index)}>
                  <img src="AddMenu/bin.svg" alt="remove" className="w-10 cursor-pointer" />
                </button>
                {submitted && errors.ingredients?.[index]?._errors && (
                  <p className="text-red-500">{errors.ingredients[index]._errors[0]}</p>
                )}
              </li>
            ))}
          </ul>
          {submitted && errors.ingredients?._errors && (
            <p className="text-red-500">{errors.ingredients._errors[0]}</p>
          )}
          <div className="addIngre flex justify-end pr-10 pt-3">
            <button
              className="font-bold hover:underline cursor-pointer"
              onClick={handleAddIngredient}
            >
              +ADD INGREDIENT
            </button>
          </div>
        </div>

        <hr />
        <div className="DirectionInput">
          <h4 className="font-bold text-2xl">Directions</h4>
          <ul className="addDirecBox">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-2 py-3">
                <textarea
                  className="px-4 py-3 border-1 w-full rounded-[10px]"
                  placeholder="e.g. Heat butter and sauté onions..."
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                />
                <button onClick={(e) => handleRemoveStep(e, index)}>
                  <img src="AddMenu/bin.svg" alt="remove" className="w-10 cursor-pointer"  />
                </button>
                {submitted && errors.steps?.[index]?._errors && (
                  <p className="text-red-500">
                    {errors.steps[index]._errors[0]}
                  </p>
                )}
              </li>
            ))}
          </ul>
          {submitted && errors.steps?._errors && (
            <p className="text-red-500">{errors.steps._errors[0]}</p>
          )}
          <div className="addStep flex justify-end pr-10 pt-3">
            <button
              className="font-bold hover:underline cursor-pointer"
              onClick={handleAddStep}
            >
              +ADD STEP
            </button>
          </div>
        </div>

        <hr />
        <div className="edit-btn flex justify-end gap-3">
          <button
            className="cursor-pointer rounded-[10px] px-5 py-4 font-bold text-black text-md  "
            type="button"
            onClick={() => window.location.reload()}
          >
            CANCEL
          </button>
          <button className="cursor-pointer rounded-[10px] px-5 py-4 font-bold text-white text-md bg-[#AE7E67] " type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editor;
