import React from 'react'
import { useState } from "react";
const ProblemRecommender = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('Get Problems According To Your Profiles');
    const [problems, setProblems] = useState([]);
    const [tags, setTags] = useState([]);
    const [range, setRange] = useState([800, 3000]);//[min,max]
    const handleChange = (e) => {
        setUsername(e.target.value);
    }
    const handleRowClick = (link) => {
        window.open(link, '_blank');
    }
    const handleGetProblems = async (e) => {
        e.preventDefault();
        setProblems([]);

        setMessage('Loading');
        console.log(username);
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recommend`
        let res = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'codeforces_id': username, 'num_recommendations': 5 })
        });
        let sample_problems = await res.json();
        console.log(sample_problems);
        if (sample_problems.error) {
            setMessage(sample_problems.error);
            setProblems([]);
            setTags([]);
        }
        else if (sample_problems.length) {
            setProblems(sample_problems);
            const curr_range = [3000, 800];
            const curr_tags = [];
            sample_problems.forEach((problem) => {
                problem.tags.forEach((tag) => {
                    if (curr_tags.indexOf(tag) === -1)
                        curr_tags.push(tag);
                });
                if (curr_range[0] > problem.rating)
                    curr_range[0] = problem.rating;
                if (curr_range[1] < problem.rating)
                    curr_range[1] = problem.rating;
            });
            setTags(curr_tags);
            setRange(curr_range);
        }
    }
    return (
        <div className="main-container flex flex-col h-[80vh] w-[90vw] items-center justify-start mt-28">
            <div className="flex justify-center items-center flex-wrap">
                <input className="bg-themeColor mb-3 lg:mb-0 mr-4 lg:mr-14 text-xl px-2 py-1 lg:px-5 lg:py-2 lg:text-2xl rounded-3xl text-black placeholder-black" name="username" onChange={handleChange} type="text" placeholder="Enter Username" />
                <button className="bg-themeColor mb-3 lg:mb-0 text-black text-xl px-2 py-1 lg:px-5 lg:py-2 lg:text-2xl rounded-3xl" onClick={handleGetProblems} >Get Problems</button>
            </div>
            <div className="mt-10 items-center flex flex-col lg:flex-row justify-center lg:items-start h-[90%] w-[100%] text-xl">
                <div className="rounded-3xl mb-10 border border-white w-[90%] lg:w-[60%] p-2 lg:overflow-auto custom-scrollbar lg:h-[90%] lg:mr-20">
                    <div className="w-[100%]">
                        <div className="flex flex-col">
                            <div className="flex flex-row mx-2 my-1 px-5 py-2 rounded-2xl cursor-pointer">
                                <div className="w-[80%] text-start">Title</div>
                                <div className="w-[20%] text-start">Rating</div>
                            </div>
                        </div>
                        {problems.length !== 0 ? <div>
                            {
                                problems.map((problem, key) => {
                                    return (
                                        <div key={key} className="flex flex-row mx-2 my-1 px-5 py-2 rounded-2xl cursor-pointer border-2 border-solid hover:border-themeColor" onClick={() => handleRowClick(`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`)}>
                                            <div className="w-[80%] text-start">{problem.name}</div>
                                            <div className="w-[20%] text-start">{problem.rating}</div>
                                        </div>
                                    )
                                })
                            }
                        </div> : <div className="text-center">
                            {message}
                        </div>}
                    </div>
                </div>
                <div className="rounded-3xl border border-white h-[90%] w-[90%] lg:w-[30%] px-4 py-2">
                    <div className="range flex flex-col mb-2">
                        <p>Range</p>
                        <p>{range[0]} - {range[1]}</p>
                        <div className='flex flex-col w-[100%] h-10'>
                            <input style={{ '-webkit-appearance': 'none' }} min={800} max={3000} value={range[0]} className='bg-black -z-1 rounded-2xl my-1 h-1 relative top-3' type="range" />
                            <input style={{ '-webkit-appearance': 'none' }} min={800} max={3000} value={range[1]} className='bg-themeColor rounded-2xl my-1 h-1 relative' type="range" />
                        </div>
                    </div>
                    <div className="tags flex flex-col">
                        <p>Tags</p>
                        <div className="flex flex-wrap">
                            {tags.map((tag, index) => {
                                return (
                                    <div key={`tag${index}`} className="bg-themeColor px-2 py-1 my-2 text-black rounded-3xl mx-2">{tag}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProblemRecommender
