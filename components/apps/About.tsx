"use client";

import { Github, Linkedin, Mail, Link as LinkIcon, Download, MapPin, Briefcase, GraduationCap, Award, Code, Terminal, Database, Server } from "lucide-react";

export default function About() {
    return (
        <div className="h-full bg-gray-50 dark:bg-[#1e1e1e] overflow-y-auto custom-scrollbar">
            {/* Header / Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-xl mb-4">
                    <img src="/assets/profile.jpeg" alt="Gurunathan R" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-3xl font-bold mb-1">Gurunathan R</h1>
                <p className="text-blue-100 font-medium mb-4">B.E - Computer Science & Engineering</p>

                <div className="flex flex-wrap justify-center gap-3 text-sm">
                    <a href="mailto:gurunathan6002@gmail.com" className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-md">
                        <Mail size={14} /> gurunathan6002@gmail.com
                    </a>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md">
                        <MapPin size={14} /> Chennai, India
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md">
                        <Briefcase size={14} /> Open to Work
                    </span>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <a href="https://github.com/gurunathan-r" target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/25 transition">
                        <Github size={20} />
                    </a>
                    <a href="https://in.linkedin.com/in/gurunathan-ramesh" target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/25 transition">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://linktr.ee/gurunathanr" target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/25 transition">
                        <LinkIcon size={20} />
                    </a>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Left Column */}
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-white">
                            <Terminal size={20} className="text-blue-500" /> Summary
                        </h2>
                        <div className="bg-white dark:bg-[#252525] p-4 rounded-xl shadow-sm text-sm text-gray-600 dark:text-gray-300 space-y-2 border border-gray-100 dark:border-gray-800">
                            <p>Computer Science student with a strong passion for technology. Active member and intern at iQube with hands-on project experience in building practical solutions.</p>
                            <ul className="list-disc list-inside space-y-1 pl-1">
                                <li>Quick learner with strong problem-solving abilities</li>
                                <li>Dedicated, self-motivated, and consistent</li>
                                <li>Experienced in coding real-world applications</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-white">
                            <GraduationCap size={20} className="text-blue-500" /> Education
                        </h2>
                        <div className="space-y-3">
                            <div className="bg-white dark:bg-[#252525] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">B.E - Computer Science</h3>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">CGPA: 8.16</span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Kumaraguru Institutions • 2023 - 2027</p>
                            </div>
                            <div className="bg-white dark:bg-[#252525] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Higher Secondary (HSE)</h3>
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span>Sethu Bhaskara Matrix School</span>
                                    <span className="font-medium text-blue-600 dark:text-blue-400">94%</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-white">
                            <Code size={20} className="text-blue-500" /> Technical Skills
                        </h2>
                        <div className="bg-white dark:bg-[#252525] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="space-y-3">
                                <div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Languages</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {['Java', 'Python', 'SQL', 'C', 'C++'].map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-md text-gray-700 dark:text-gray-300">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dev & Tools</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {['Android Studio', 'Rest API', 'Git', 'VS Code', 'Linux', 'VirtualBox'].map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-md text-gray-700 dark:text-gray-300">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-white">
                            <Briefcase size={20} className="text-blue-500" /> Projects
                        </h2>
                        <div className="grid gap-3">
                            {[
                                {
                                    name: "SneakerAI",
                                    desc: "AI-powered market intelligence for sneaker pricing & trends.",
                                    link: "https://github.com/gurunathan-r/SneakerAI",
                                    tags: ["AI", "ML", "Python"]
                                },
                                {
                                    name: "AuraNotes",
                                    desc: "Intelligent note assistant using ffmpeg for audio summaries.",
                                    link: "https://github.com/gurunathan-r/AuraNotes",
                                    tags: ["ffmpeg", "Productivity"]
                                },
                                {
                                    name: "ThreatGuru",
                                    desc: "OSINT-based cybersecurity tool to identify exposed assets.",
                                    link: "https://github.com/gurunathan-r/ThreatGuru/",
                                    tags: ["Cybersecurity", "OSINT"]
                                },
                                {
                                    name: "Baashha",
                                    desc: "Phishing detection platform analyzing URLs & emails.",
                                    link: "https://github.com/gurunathan-r/Baashha",
                                    tags: ["Web Security", "Analysis"]
                                }
                            ].map((project) => (
                                <a key={project.name} href={project.link} target="_blank" rel="noreferrer"
                                    className="group bg-white dark:bg-[#252525] p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-800 block">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-blue-600 dark:text-blue-400 group-hover:underline decoration-blue-400/30">{project.name}</h3>
                                        <div className="flex gap-1">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{project.desc}</p>
                                </a>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-white">
                            <Award size={20} className="text-blue-500" /> Achievements & Certs
                        </h2>
                        <div className="bg-white dark:bg-[#252525] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Achievements</h3>
                                <ul className="space-y-2">
                                    <li className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                                        <span className="text-yellow-500">★</span> First Place – National Cyber Security Hackathon (IIT Madras), 2025
                                    </li>
                                    <li className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                                        <span className="text-yellow-500">★</span> Mahatma Gandhi Merit Scholarship (2023-2024)
                                    </li>
                                    <li className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                                        <span className="text-yellow-500">★</span> Class Representative & Peer Mentor for Cybersecurity
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Certifications</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Cryptography & Network Security', 'DevOps (CI/CD)', 'OS Virtualization', 'UML Modeling'].map((cert, i) => (
                                        <span key={i} className="text-[10px] px-2 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-gray-500 dark:text-gray-400">{cert}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
