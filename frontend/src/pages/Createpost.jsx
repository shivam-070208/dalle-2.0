import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets';
import { Loader, FormField } from '../components';
import { getRandomPrompt } from '../utils';


const Createpost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generatingImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://dalle-2-0-silk.vercel.app/api/v1/dalle/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        if (response.ok) {
          setForm({ ...form, photo: data.photo }); // Set base64 image string to form.photo
        } else {
          alert(data.error || 'Failed to generate image');
        }
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a prompt');
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      try {
        setLoading(true);
        const response = await fetch('https://dalle-2-0-silk.vercel.app/api/v1/posts', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: form.name, prompt: form.prompt, photo: form.photo }),
        });
        const data = await response.json();
        if (response.ok) {
         
          navigate('/');
        } else {
          alert(data.error || 'Failed to share the post');
        }
      } catch (error) {
        alert(error);
      }
      finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image before sharing');
      return;
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, name: e.target.value });
  };

  const handlesurChange = (e) => {
    setForm({ ...form, prompt: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 texxt-[#666e75] text-[14px] max-w-[500px]">Create imaginative and visually stunning images through DALL-E AI </p>
        </div>
        <form className='mt-16 max-w-3xl' onSubmit={handlesubmit}>
          <div className="flex flex-col gap-5">
            <FormField LabelName="Your Name" type="text" name="name"
              placeholder="John Doe" value={form.name} handleChange={handleChange} />

            <FormField LabelName="Prompt" type="text" name="prompt" placeholder="A plush toy robot sitting against a yellow wall" surprise value={form.prompt} handleChange={handlesurChange} handleSurpriseMe={handleSurpriseMe} />
            <div className="relative photo w-[30vw] min-w-[20rem] h-[40vh] border-1 border-gray-200 rounded">
              {form.photo ? <img src={form.photo} alt={form.prompt} className="w-full h-full object-fit rounded" /> : <img src={preview} alt="preview" className="w-full h-full object-contain rounded" />}
              {generatingImg && <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.9)] rounded-lg'><Loader /></div>}
            </div>
          </div>
          <div className='mt-5 flex gap-5'>
            <button type='button' onClick={generatingImage} className='text-white bg-[#134f78] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              {generatingImg ? 'Generating...' : 'Generate Image'}
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">Once you have created the image you want, you can share it with others in the community</p>
            <button type='submit' className='mt-3 text-white bg-[#134f78] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>{!loading?"Share with the Community":"Sharing....."}</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Createpost;
