"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Lock } from "lucide-react";

export default function Safari() {
    const [url, setUrl] = useState("github.com/gurunathan-r");
    const [activeTab, setActiveTab] = useState<"overview" | "repositories">("overview");
    const [userData, setUserData] = useState<any>(null);
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const match = url.match(/github\.com\/([^\/]+)/);
    const username = match ? match[1] : "gurunathan-r";

    // Data Fetching
    useEffect(() => {
        if (url.includes("github.com")) {
            setLoading(true);
            Promise.all([
                fetch(`https://api.github.com/users/${username}`).then(res => res.json()),
                fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(res => res.json())
            ]).then(([user, repoList]) => {
                setUserData(user);
                setRepos(Array.isArray(repoList) ? repoList : []);
                setLoading(false);
            }).catch(() => setLoading(false));
        }
    }, [url, username]);

    const renderGitHubContent = () => {
        if (loading) return (
            <div className="h-full bg-[#0d1117] flex items-center justify-center text-white">
                <RotateCw className="animate-spin text-gray-400" size={32} />
            </div>
        );

        if (!userData || userData.message === "Not Found") return (
            <div className="h-full bg-[#0d1117] flex items-center justify-center text-white">
                User not found
            </div>
        );

        return (
            <div className="h-full bg-[#0d1117] text-[#c9d1d9] overflow-auto font-sans">
                {/* Header (Nav) */}
                <div className="bg-[#010409] border-b border-gray-700 py-4 px-8 sticky top-0 z-10">
                    <div className="max-w-6xl mx-auto flex items-center gap-4">
                        <div className="font-bold text-white text-lg flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <span className="text-black">
                                    <svg height="24" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" className="octicon octicon-mark-github">
                                        <path d="M8 0c4.42 0 8 3.58 8 8a0 0 1-1.883 4.75c.402.102.402.585.002.585-.398 0-.398-.483.002-.585A8.002 8.002 0 0 1 8 0Zm0 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                                    </svg>
                                </span>
                            </div>
                            <span>{userData.login}</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-1/4 flex flex-col gap-4">
                        <img
                            src={userData.avatar_url}
                            alt="Profile"
                            className="w-full aspect-square rounded-full border border-gray-700 object-cover"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                            <p className="text-xl text-[#8b949e]">{userData.login}</p>
                        </div>
                        {userData.bio && <p className="text-[#8b949e]">{userData.bio}</p>}

                        <div className="flex flex-col gap-2 text-sm text-[#8b949e]">
                            <div className="flex items-center gap-2">
                                <Lock size={14} /> <span>{userData.followers} followers</span> · <span>{userData.following} following</span>
                            </div>
                        </div>

                        <a
                            href={userData.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full text-center py-2 px-4 rounded-md bg-[#238636] text-white font-semibold hover:bg-[#2ea043] transition border border-[rgba(240,246,252,0.1)] block mt-4"
                        >
                            Open on GitHub
                        </a>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Tabs */}
                        <div className="border-b border-gray-700 mb-4 flex gap-6">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`pb-3 border-b-2 px-2 transition ${activeTab === 'overview' ? 'border-[#f78166] font-semibold text-white' : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('repositories')}
                                className={`pb-3 border-b-2 px-2 transition ${activeTab === 'repositories' ? 'border-[#f78166] font-semibold text-white' : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'}`}
                            >
                                Repositories <span className="bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full ml-1">{userData.public_repos}</span>
                            </button>
                        </div>

                        {/* Repo List */}
                        <div className="grid grid-cols-1 gap-4">
                            {(activeTab === 'overview' ? repos.slice(0, 6) : repos).map((repo: any) => (
                                <div key={repo.id} className="border border-gray-700 rounded-md p-4 bg-[#0d1117] hover:bg-[#161b22] transition flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-[#58a6ff] font-bold text-lg hover:underline truncate block">
                                                {repo.name}
                                            </a>
                                            <span className="text-xs border border-gray-700 rounded-full px-2 py-0.5 text-[#8b949e] capitalize">{repo.visibility}</span>
                                        </div>
                                        <p className="text-sm text-[#8b949e] mb-4 text-bg-gray-400 line-clamp-2">{repo.description || "No description available"}</p>
                                        <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                                            {repo.language && (
                                                <div className="flex items-center gap-1">
                                                    <span className="w-3 h-3 rounded-full bg-[#f1e05a]"></span>
                                                    <span>{repo.language}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-xs text-[#8b949e]">Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {activeTab === 'overview' && repos.length > 6 && (
                            <div className="mt-4 text-center">
                                <button onClick={() => setActiveTab('repositories')} className="text-[#58a6ff] text-sm hover:underline">
                                    View all repositories
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e]">
            {/* Toolbar */}
            <div className="h-12 bg-gray-100 dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-4">
                <div className="flex gap-2">
                    <ChevronLeft className="text-gray-400" />
                    <ChevronRight className="text-gray-400" />
                </div>

                <div className="flex-1 max-w-2xl mx-auto flex items-center bg-white dark:bg-[#1e1e1e] rounded-md px-3 py-1.5 text-sm shadow-sm border border-gray-200 dark:border-gray-700">
                    <Lock size={12} className="mr-2 text-gray-500" />
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-center"
                    />
                    <RotateCw size={12} className="ml-2 text-gray-500 cursor-pointer hover:rotate-180 transition-all duration-500" onClick={() => setLoading(true)} />
                </div>

                <div className="w-10"></div>
            </div>

            {/* Content */}
            <div className="flex-1 relative overflow-auto">
                {url.includes("github.com") ? renderGitHubContent() : (
                    <iframe
                        src={`https://${url.replace(/^https?:\/\//, '')}`}
                        className="w-full h-full border-none bg-white"
                        title="Browser"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                )}
            </div>
        </div>
    );
}
