"use client"
import React, { useState } from 'react';

const CreatePoll: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<string[]>(['']);

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

    const handleSubmit = () => {
        console.log('Question:', question);
        console.log('Options:', options);
    };

    return (
        <div>
            <div className="text-3xl text-center mt-10 font-serif">
                 CREATE YOUR POLL FOT THE SOCIETY
            </div>
            <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
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
                    <button className="border border-black w-full px-4 py-2 text-center text-black rounded-lg hover:bg-gray-200 focus:outline-none" onClick={handleAddOption}>Create an option +</button>
                </div>
                <div className="mt-4">
                    <button className="bg-purple-500 text-white w-full px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none" onClick={handleSubmit}>Create Poll</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePoll;
