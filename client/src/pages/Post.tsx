import { Container } from "../components";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { FormField, Spinner } from "../components";
import { getRandomPrompt } from "../utils";
import { useState } from "react";

export default function Post() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.photo && form.prompt) {
      setLoading(true);
      await fetch("http://localhost:8050/api/v1/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => {
          res.json();
          navigate("/");
        })
        .catch((err) => alert(err))
        .finally(() => setLoading(false));
    } else {
      alert("Please enter a name and prompt");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const updater = (prevForm: typeof form) => ({ ...prevForm, [name]: value });
    setForm(updater);
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGenerating(true);
        const response = await fetch(`http://localhost:8050/api/v1/dalle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        setGenerating(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <Container>
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[16px]">
            Create imaginative and stunning images through AI and share them with your friends.
          </p>
        </div>
        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              label="Your name"
              type={"text"}
              name={"name"}
              placeholder={"John Doe"}
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              label="Prompt"
              type={"text"}
              name={"prompt"}
              placeholder={"teddy bears shopping for groceries in Japan, ukiyo-e"}
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className={"w-full h-full object-contain"}
                />
              ) : (
                <img
                  className={"w-9/12 h-9/12 object-contain opacity-40"}
                  src={preview}
                  alt="preview"
                />
              )}
              {generating && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex gap-5">
            <button
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              type="button"
              onClick={generateImage}
            >
              {generating ? "Generating" : "Generate"}
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              Once you got image, you can share it with others!
            </p>
            <button
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              type="submit"
            >
              {loading ? "Sharing..." : "Share with others"}
            </button>
          </div>
        </form>
      </section>
    </Container>
  );
}
