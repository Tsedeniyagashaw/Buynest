import { useState } from "react";
import API from "../services/api";

function FeedbackModal({ onClose }) {

    const [form, setForm] = useState({

        type: "Suggestion",
        subject: "",
        message: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try{

            const token = localStorage.getItem("token");

            await API.post(
                "/feedback",
                form,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            alert("Feedback submitted successfully!");

            onClose();

        }
        catch(error){

            alert(error.response?.data?.message);

        }
        finally{

            setLoading(false);

        }

    };



    return (

<div className="fixed top-100 inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

<h2 className="text-2xl font-semibold mb-6">

Contact Support

</h2>


<form onSubmit={handleSubmit} className="space-y-4">


<div>

<label className="block mb-1 text-sm font-medium">

What would you like to report?

</label>

<select

name="type"

value={form.type}

onChange={handleChange}

className="w-full border rounded-lg p-3"

>

<option>Bug Report</option>

<option>Suggestion</option>

<option>Complaint</option>

<option>Question</option>

</select>

</div>



<div>

<label className="block mb-1 text-sm font-medium">

Subject

</label>

<input

type="text"

name="subject"

value={form.subject}

onChange={handleChange}

required

className="w-full border rounded-lg p-3"

/>

</div>



<div>

<label className="block mb-1 text-sm font-medium">

Message

</label>

<textarea

name="message"

rows="5"

value={form.message}

onChange={handleChange}

required

className="w-full border rounded-lg p-3 resize-none"

/>

</div>



<div className="flex justify-end gap-3 pt-2">

<button

type="button"

onClick={onClose}

className="px-5 py-2 rounded-lg border"

>

Cancel

</button>



<button

type="submit"

disabled={loading}

className="px-5 py-2 rounded-lg bg-violet-700 text-white"

>

{loading ? "Sending..." : "Send Feedback"}

</button>

</div>

</form>

</div>

</div>

    );

}

export default FeedbackModal;