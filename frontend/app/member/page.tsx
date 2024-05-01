"use client"
import { useEffect, useState } from "react";
import axios from "axios";

type Poll = {
    id: string,
    title: string,
    options: string[]
};

export default function Member() {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

   //Selection Option
    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handleSubmit = async (e:any,id:string) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const url = `http://localhost:5000/api/v1/poll/submitPoll/${id}`;
            
            const res = await axios.put(url,{
                selectedOption
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            if(res){
                alert(res.data.msg);
            }
        } catch (error) {
            console.error("Error submitting poll:", error);
        }
    };

    //Fetching Poll
    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const token = localStorage.getItem("token");
                const url = "http://localhost:5000/api/v1/poll/getAPoll";
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.status === 200) {
                    console.log(res);
                    setPolls(res.data.Poll);
                }
            } catch (error) {
                console.error("Error fetching polls:", error);
            }
        };

        fetchPolls();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-20 text-2xl w-[50%] font-serif text-center">SUBMIT YOUR ANSWER FOR THE WELFARE OF THE SOCIETY...</h1>
            {polls.map((poll, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 w-96 mb-4 mt-10">
                    <form onSubmit={(e)=>handleSubmit(e,poll.id)}>
                    <h3 className="text-lg font-semibold mb-2">{poll.title}</h3>
                    <ul className="list-disc pl-4">
                        {poll.options.map((option, optionIndex) => (
                            <li key={optionIndex} className="mb-1">
                                <input
                                    type="radio"
                                    id={`option_${optionIndex}`}
                                    name={`poll_${index}`}
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={() => handleOptionChange(option)}
                                    className="mr-2"
                                />
                                <label htmlFor={`option_${optionIndex}`}>{option}</label>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="submit"
                        disabled={!selectedOption}
                        className={`mt-4 bg-blue-500 ml-28 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${!selectedOption && 'opacity-50 cursor-not-allowed'}`}
                    >
                        Submit Poll
                    </button>
                    </form>
                </div>
            ))}
        </div>
    );
}
