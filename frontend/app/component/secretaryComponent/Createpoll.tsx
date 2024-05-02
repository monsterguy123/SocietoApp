"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Poll = {
    id:string,
    title: string,
    voted: {
        option: string,
        vote: number
    }[]
}

const CreatePoll: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<string[]>(['']);
    const [poll, setPoll] = useState<Poll[]>([]);
    const [totalPeople, setTotalPeople] = useState<number>(0);
    const [refresh,setRefresh] = useState<boolean>(false);

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleDeleteOption = (index: number) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value);
    };

// fetching the polls data...
    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://localhost:5000/api/v1/poll/getPolls';
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.statusText === "OK") {
                    setPoll(res.data.polls);
                    setTotalPeople(res.data.Total);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [refresh]);

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:5000/api/v1/poll/CreatePoll";
        const res = await axios.post(url, {
            title: question,
            options: options
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.statusText === "OK") {
            alert(res.data.msg)
            setRefresh(true);
            setOptions(['']);
            setQuestion('');
        }
    };

    const submitHandler = async (id: string) => {
        const url = `http://localhost:5000/api/v1/poll/deletePoll/${id}`;
        const token = localStorage.getItem('token');
        try {
            const res = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.statusText === "OK") {
                alert(res.data.msg)
                setRefresh(false)
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while deleting the poll.");
        }
    }

    const calculatePercentage = (votes: number) => {
        return `${(votes / totalPeople) * 100}%`;
    };

    return (
        <div>
            <div className="text-3xl text-center mt-20 font-serif">
                CREATE YOUR POLL FOR THE SOCIETY
            </div>
            <div className='flex'>
                <div className="max-w-md mx-auto mt-20 ml-20 bg-white p-8 rounded-lg shadow-lg">
                    <div>
                        <label className="text-lg font-semibold text-gray-800">Write your question to create a poll?</label>
                        <input type="text" className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" value={question} onChange={handleQuestionChange} />
                    </div>
                    {options.map((option, index) => (
                        <div key={index} className="mt-4 flex items-center">
                            <label className="mr-2 text-gray-800">Option {index + 1}:</label>
                            <input type="text" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
                            <button className="ml-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg focus:outline-none focus:bg-red-600" onClick={() => handleDeleteOption(index)}>Delete</button>
                        </div>
                    ))}
                    <div className="mt-4">
                        <button className="bg-purple-500 text-white w-full px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none" onClick={handleAddOption}>Create an option +</button>
                    </div>
                    <div className="mt-4">
                        <button className="bg-purple-500 text-white w-full px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none" onClick={handleSubmit}>Create Poll</button>
                    </div>
                </div>

                {/* poll rendering */}
                { poll.length > 0 && (
                    <div className="max-w-md mx-auto mt-20 ml-20 bg-white p-8 rounded-lg shadow-lg">
                        {poll.map((item, pollIndex) => (
                            <div key={pollIndex} className="mt-5 mb-8 w-96">
                                <h1 className="text-3xl font-bold mb-4 text-gray-800">{item.title}</h1>
                                <div>
                                    {item.voted.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center mb-2">
                                            <p className="mr-2 text-gray-700">{option.option}</p>
                                            <p className="ml-2 text-gray-700">{option.vote}</p>
                                        </div>
                                    ))}
                                    <button onClick={() => submitHandler(item.id)} className="w-40 mt-5 ml-32 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        Delete Poll
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatePoll;
