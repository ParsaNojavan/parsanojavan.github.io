 document.addEventListener('DOMContentLoaded', function() {
            const output = document.getElementById('output');
            const commandInput = document.getElementById('command-input');
            let commandHistory = [];
            let historyIndex = -1;
            let isTyping = false;

            commandInput.focus();

            const commands = {
                help: () => {
                    return `Available commands:
  help                    - Show this help message
  about                   - About me
  skills                  - My technical skills
  projects                - List my projects
  contact                 - Contact information
  clear                   - Clear terminal
  education               - My education background
  experience              - My work experience
  social                  - My social media links
  sudo rm -rf /           - Don't try this :)
`;
                },
                
                about: () => {
                    return `I'm Parsa Nojavan, a passionate developer and software developer who loves solving complex problems.
I have over 5 years of experience in web development and enjoy working with modern technologies.
When I'm not coding, you can find me contributing to open source, hitting the gym, solving math problems, or playing chess`;
                },
                
                skills: () => {
                    return `Technical Skills:
Frontend:   React, Next.js, TypeScript, HTML5, CSS3
Backend:    Node.js, Express, Python, Asp.Net (Core), Flask, JWT
Database:   MongoDB, PostgreSQL, MySQL, Redis, SQL Server
DevOps:     Docker, Nginx, Linux
Tools:      Git, Visual Studio, VS Code, Postman`;
                },
                
                projects: () => {
                    return `My Projects:
- Developera Platform (Asp.Net Core, HTML/CSS, SQL Server)
- Sahand Uni electric Website (Asp.Net Core, HTML/CSS, SQL Server)
- Portfolio Website (HTML, CSS, JavaScript)
- MicroService API Gateway (Asp.Net Core, Redis, Docker, RabbitMQ, Ocelot)
- Open Source Drug Model (scikit-learn,Asp.Net Core,.Net WPF, React js)
- Spotify Telegram Service (Python, PostgreSQL, Docker)`;
                },
                
                contact: () => {
                    return {
                        type: 'html',
                        content: `Contact Information:
Email:     parsa.nojavan85@gmail.com
Phone:     +98 937 234 7173
Location:  Tabriz, Iran

<div class="contact-links">
    <a href="https://github.com/parsanojavan"><i class="fab fa-github"></i> GitHub</a>
    <a href="https://www.linkedin.com/in/parsa-nojavan-a5268a350"><i class="fab fa-linkedin"></i> LinkedIn</a>
    <a href="https://x.com/NojavanParsa"><i class="fab fa-twitter"></i> Twitter</a>
    <a href="https://t.me/ParsaNojavan"><i class="fab fa-telegram"></i> Telegram</a>
</div>`
                    };
                },
                
                clear: () => {

                    const commandLine = document.querySelector('.command-line');
                    output.innerHTML = '';
                    if (commandLine && commandLine.parentNode) {
                        commandLine.parentNode.appendChild(commandLine);
                    }
                    return null;
                },
                
                education: () => {
                    return `Education:
- Computer Engineer, Tabriz University of technology (2024-2028)
- Various online courses and certifications`;
                },
                
                experience: () => {
                    return `Work Experience:
Senior Full-Stack Developer at Developera (2025-Present)
- Led development of multiple web applications
- Implemented CI/CD pipelines reducing deployment time by 40%
- Mentored junior developers

Backend Developer at ASD (2024-2025)
- Developed Api Backend using Asp.net core for portaltvto.com
- Optimized application performance leading to 30% faster load times`;
                },
                
                social: () => {
                    return `Social Media:
GitHub:    github.com/parsanojavan
LinkedIn:  www.linkedin.com/in/parsa-nojavan-a5268a350
Twitter:   x.com/NojavanParsa
Telegram:      blog.alirezaei.dev`;
                },
                
                ls: (args) => {
                    if (args.length === 0) {
                        return {
                            type: 'html',
                            content: `<div class="ls-output">
    <div class="directory">projects/</div>
    <div class="directory">documents/</div>
    <div class="file">about_me.txt</div>
    <div class="file">resume.pdf</div>
    <div class="file">skills.txt</div>
</div>`
                        };
                    }
                    return `ls: cannot access '${args[0]}': No such file or directory`;
                },
                
                cat: (args) => {
                    if (args.length === 0) {
                        return 'cat: missing operand';
                    }
                    
                    const files = {
                        'about_me.txt': commands.about(),
                        'skills.txt': commands.skills(),
                        'resume.pdf': 'This would be my resume PDF file (simulated in terminal)'
                    };
                    
                    if (files[args[0]]) {
                        return files[args[0]];
                    }
                    
                    return `cat: ${args[0]}: No such file or directory`;
                },
                
                echo: (args) => {
                    return args.join(' ');
                },
                
                date: () => {
                    return new Date().toString();
                },
                
                whoami: () => {
                    return 'parsa nojavan,\nsoftware enginner and full-stack developer';
                },
                
                pwd: () => {
                    return '/home/parsa';
                }
            };


            function typeText(element, text, speed = 30, callback = null) {
                isTyping = true;
                let i = 0;
                element.innerHTML = '';
                
                function typeChar() {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        output.scrollTop = output.scrollHeight;
                        setTimeout(typeChar, speed);
                    } else {
                        isTyping = false;
                        if (callback) callback();
                    }
                }
                
                typeChar();
            }


            function insertHTML(element, html, callback = null) {
                isTyping = true;
                element.innerHTML = html;
                isTyping = false;
                output.scrollTop = output.scrollHeight;
                if (callback) setTimeout(callback, 100);
            }


            function initTerminal() {
                const initialContent = [
                    {
                        text: "Welcome to my terminal portfolio!",
                        type: "message"
                    },
                    {
                        text: "Type 'help' to see available commands.",
                        type: "message" 
                    },
                    {
                        text: " ",
                        type: "empty"
                    },
                    {
                        text: "parsa@portfolio:~$ cat about_me.txt",
                        type: "command"
                    },
                    {
                        text: "Hello! I'm Parsa Nojavan, a passionate full-stack developer and software developer with 5+ years of experience.\nI specialize in creating efficient, scalable solutions with modern technologies.",
                        type: "output"
                    },
                    {
                        text: " ",
                        type: "empty"
                    },
                    {
                        text: "parsa@portfolio:~$ ls projects/",
                        type: "command"
                    },
                    {
                        type: "html",
                        content: `<div class="ls-output">
    <div class="directory">Developera/</div>
    <div class="directory">Uni electric/</div>
    <div class="directory">API Gateway/</div>
    <div class="directory">Drug Model/</div>
</div>`
                    },
                    {
                        text: " ",
                        type: "empty"
                    }
                ];

                let index = 0;

                function typeNext() {
                    if (index < initialContent.length) {
                        const item = initialContent[index];
                        const element = document.createElement('div');
                        
                        if (item.type === "command") {
                            element.className = 'output-text';
                            element.innerHTML = `<span class="user">parsa</span>@<span class="host">portfolio</span>:<span class="path">~</span>$ `;
                        } else if (item.type === "output" || item.type === "message") {
                            element.className = 'output-text success';
                        } else if (item.type === "html") {
                            element.className = 'output-text success';
                        } else {
                            element.className = 'output-text';
                        }
                        
                        output.appendChild(element);
                        
                        if (item.type === "empty") {
                            index++;
                            setTimeout(typeNext, 100);
                        } else if (item.type === "html") {
                            insertHTML(element, item.content, () => {
                                index++;
                                setTimeout(typeNext, 500);
                            });
                        } else {
                            typeText(element, item.text, item.type === "command" ? 20 : 30, () => {
                                index++;
                                setTimeout(typeNext, 200);
                            });
                        }
                    }
                }

                typeNext();
            }


            function executeCommand(input) {
                const parts = input.trim().split(' ');
                const command = parts[0].toLowerCase();
                const args = parts.slice(1);
                
                let result = commands[command] ? commands[command](args) : null;
                
                if (!result && command) {
                    result = {
                        type: 'html',
                        content: `<span class="error">Command not found: ${command}. Type 'help' for available commands.</span>`
                    };
                }
                
                return result;
            }


            function displayCommand(input) {

                const commandLine = document.createElement('div');
                commandLine.className = 'output-text';
                commandLine.innerHTML = `<span class="user">parsa</span>@<span class="host">portfolio</span>:<span class="path">~</span>$ `;
                output.appendChild(commandLine);
                

                typeText(commandLine, input, 20, () => {

                    const result = executeCommand(input);
                    
                    if (input === 'clear') {

                        addEmptyLine();
                        return;
                    }
                    
                    if (result) {
                        const resultElement = document.createElement('div');
                        resultElement.className = 'output-text success';
                        output.appendChild(resultElement);
                        
        
                        if (typeof result === 'object' && result.type === 'html') {
                            insertHTML(resultElement, result.content, () => {
                                addEmptyLine();
                            });
                        } else {
                         
                            typeText(resultElement, result, 10, () => {
                                addEmptyLine();
                            });
                        }
                    } else {
                        addEmptyLine();
                    }
                });
            }

            function addEmptyLine() {
                const emptyLine = document.createElement('div');
                emptyLine.className = 'output-text';
                emptyLine.innerHTML = ' ';
                output.appendChild(emptyLine);
                output.scrollTop = output.scrollHeight;
                commandInput.focus();
            }

   
            commandInput.addEventListener('keydown', function(e) {
                if (isTyping) {
                    e.preventDefault();
                    return;
                }
                
                if (e.key === 'Enter') {
                    const input = commandInput.value.trim();
                    
                    if (input) {
                        commandHistory.push(input);
                        historyIndex = commandHistory.length;
                        
  
                        if (input === 'clear') {
                            commands.clear();
                            commandInput.value = '';
                            commandInput.focus();
                            return;
                        }
                        
                        displayCommand(input);
                    } else {

                        const emptyCommand = document.createElement('div');
                        emptyCommand.className = 'output-text';
                        emptyCommand.innerHTML = `<span class="user">parsa</span>@<span class="host">portfolio</span>:<span class="path">~</span>$ `;
                        output.appendChild(emptyCommand);
                        output.scrollTop = output.scrollHeight;
                    }
                    
                    commandInput.value = '';
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (commandHistory.length > 0) {
                        if (historyIndex > 0) historyIndex--;
                        commandInput.value = commandHistory[historyIndex] || '';
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (historyIndex < commandHistory.length - 1) {
                        historyIndex++;
                        commandInput.value = commandHistory[historyIndex] || '';
                    } else {
                        historyIndex = commandHistory.length;
                        commandInput.value = '';
                    }
                } else if (e.key === 'Tab') {
                    e.preventDefault();

                    const input = commandInput.value;
                    const commonCommands = ['help', 'about', 'skills', 'projects', 'contact', 'clear', 'ls', 'cat'];
                    const matching = commonCommands.filter(cmd => cmd.startsWith(input));
                    
                    if (matching.length === 1) {
                        commandInput.value = matching[0];
                    }
                }
            });

            document.addEventListener('click', function() {
                if (!isTyping) {
                    commandInput.focus();
                }
            });

            setInterval(() => {
                const prompt = document.querySelector('.prompt');
                const cursor = prompt.querySelector('.blink');
                
                if (cursor) {
                    cursor.remove();
                } else {
                    const blink = document.createElement('span');
                    blink.className = 'blink';
                    blink.textContent = '_';
                    prompt.appendChild(blink);
                }
            }, 500);

            window.addEventListener('resize', function() {
                output.scrollTop = output.scrollHeight;
            });

            initTerminal();
        });