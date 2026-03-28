---
layout: ../layouts/ProjectsLayout.astro
title: "Projects"
description: "Open-source projects, hackathon entries, and tools built by Shravan Goswami."
projects:
  - title: "PULSE -- Smart City Emergency Traffic Management"
    description: "Real-time green corridor system for emergency vehicles using live GPS, traffic-aware routing, and signal control. Includes 2 mobile apps (PULSE, PULSE-CC) and 3 web apps (Admin Website, PULSE-AID-WEB, FASTAPI dashboard), with five shortest-path methods: Dijkstra, A*, Bellman-Ford, Floyd-Warshall, and Directed SSSP (arXiv:2504.17033)."
    techStack: ["FastAPI", "Flutter", "GPS", "Traffic Signal Control", "Dijkstra", "A*", "Bellman-Ford", "Floyd-Warshall"]
    githubLink: "https://github.com/shravanngoswamii/PULSE"
    imageSrc: "/assets/projects/pulse.jpg"

  - title: "SecureVault (Android Application)"
    description: "Android app for secure photo, video, and notes storage with disguise modes (Clock, Calculator, MoodSpace, Notes)."
    techStack: ["Flutter", "AES-256", "Android"]
    liveLink: "https://play.google.com/store/apps/details?id=com.shravangoswami.securevault"
    imageSrc: "/assets/projects/securevault.png"

  - title: "DoodleBUGS: a Browser-Based Graphical Interface for Drawing Probabilistic Graphical Models"
    description: "A graphical tool for visually constructing models for the BUGS (Bayesian Inference using Gibbs Sampling) language. Features include direct code generation from drawn DAGs, model export (PNG, SVG, JSON), and backend integration for running models and visualizing results. See project report: https://turinglang.org/news/posts/2025-09-01-GSoC-Report-DoodleBUGS/"
    techStack: ["Vue.js", "Vite", "TypeScript", "Julia"]
    githubLink: "https://github.com/TuringLang/JuliaBUGS.jl/tree/main/DoodleBUGS"
    liveLink: "https://turinglang.org/JuliaBUGS.jl/DoodleBUGS/"
    imageSrc: "/assets/projects/GSoC.svg"

  - title: "Group Policy Object manager for Windows - Smart India Hackathon 2024"
    description: "Windows application to generate and manage customized Group Policy Objects (GPOs) aligned with CIS security benchmarks. Finalist at Smart India Hackathon 2024."
    techStack: [".NET", "C#", "WPF"]
    githubLink: "https://github.com/shravanngoswamii/Techolics_"
    imageSrc: "/assets/projects/SIH.jpg"

  - title: "Reusable Github Action for adding global top navigation bar to Documenter.jl generated sites"
    description: This repository contains a collection of GitHub actions to be used across different TuringLang repositories. DocsNav action inserts a MultiDocumenter-style top navigation bar to Documenter.jl generated sites. DocsDocumenter action performs a complete build and deploy of Documenter.jl documentation, inserting the above navbar in the process.
    techStack: [GitHub Actions, Shell Scripts, HTML, CSS, JS]
    githubLink: "https://github.com/TuringLang/actions"
    imageSrcLight: "https://raw.githubusercontent.com/TuringLang/turinglang.github.io/refs/heads/main/assets/logo/turing-text-logo.svg"
    imageSrcDark: "https://raw.githubusercontent.com/TuringLang/turinglang.github.io/refs/heads/main/assets/logo/turing-logo-dark.svg"

  - title: "HTML Link Action"
    description: "A GitHub composite action to post-process static HTML sites for link modification and validation. Built in pure Node.js with no pip installs and no npm dependencies."
    techStack: [GitHub Actions, Node.js, HTML]
    githubLink: "https://github.com/shravanngoswamii/html-link-action/"
    liveLink: "https://github.com/marketplace/actions/html-link-processor"
    imageSrc: "https://opengraph.githubassets.com/fa9b5dbc384becec86d940989660321b39ee89d11ad8ee00ac89474a4d10a14f/shravanngoswamii/html-link-action"

  - title: "MLG Cambridge's Research & Publications System"
    description: Designed and developed the official research & publication system for the Machine Learning Group at Cambridge University.
    techStack: [Python, Quarto, EJS, CSS, Shell Scripts, Markdown]
    liveLink: "https://mlg.eng.cam.ac.uk/publications/"
    imageSrc: "/assets/projects/mlg-cambridge.png"

  - title: "MLG Cambridge's Website"
    description: "Designed and developed the official website for the Machine Learning Group at Cambridge University. The site serves as a hub for research, events, and resources related to machine learning at the university!"
    techStack: [Quarto, EJS, SCSS, CSS, Shell Scripts, Markdown]
    liveLink: "https://mlg.eng.cam.ac.uk/#footer"
    imageSrc: "/assets/projects/mlg-cambridge.png"

  - title: "Turing.jl Website"
    description: "Designed and developed the official website and documentation for Turing.jl, a probabilistic programming framework for Julia."
    techStack: [Quarto, EJS, SCSS, CSS, Shell Scripts, HTML, Markdown]
    liveLink: "https://turinglang.org/"
    githubLink: "https://github.com/TuringLang/turinglang.github.io"
    imageSrcLight: "https://raw.githubusercontent.com/TuringLang/turinglang.github.io/refs/heads/main/assets/logo/turing-text-logo.svg"
    imageSrcDark: "https://raw.githubusercontent.com/TuringLang/turinglang.github.io/refs/heads/main/assets/logo/turing-logo-dark.svg"

  - title: "Portfolio Website"
    description: "Read articles written by me, Explore my projects, skills, etc. Go Explore my Portfolio!"
    techStack: [Astro, ReactJS, Pagefind, Astro Paper]
    liveLink: "https://shravangoswami.com/"
    githubLink: "https://github.com/shravanngoswamii/portfolio"
    imageSrc: "/assets/projects/portfolio.svg"

  - title: "Social Media Feed Using Django"
    description: "This is a Django-based web application that implements a social media feed with features such as user authentication, posting, liking, commenting, searching other users, and managing user profiles."
    techStack: ["Python", "Django", "HTML", "Bootstrap"]
    githubLink: "https://github.com/shravanngoswamii/social-media-feed-django"
    imageSrc: "/assets/projects/social-media-feed.svg"

  - title: "Shopping Website"
    description: "E-Commerce Website Project made using Django (Python Framework), and AJAX to create a seamless, modern e-commerce experience, offering dynamic interactions and secure transactions."
    techStack: ["Python", "Django", "AJAX", "HTML", "CSS", "JS"]
    githubLink: "https://github.com/shravanngoswamii/Shopping-Website"
    imageSrc: "/assets/projects/shopping.svg"

  - title: "Wildlife Acts Wiki"
    description: "Explore Wildlife Acts Wiki to learn about a comprehensive collection of National and International Acts dedicated to the protection and conservation of wildlife in India & globally."
    techStack: ["HTML", "CSS", "JS"]
    liveLink: "https://shravanngoswamii.github.io/ES-Project/"
    githubLink: "https://github.com/shravanngoswamii/ES-Project"
    imageSrc: "/assets/projects/wildlife.png"
---
