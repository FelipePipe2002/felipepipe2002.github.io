// ============================================
// CONFIGURATION - EDIT YOUR INFO HERE
// ============================================

const CONFIG = {
    // Terminal Settings
    settings: {
        typingSpeed: 0.5, // Speed of typing animation (milliseconds per character, 0 = instant)
        typingAnimationEnabled: true, // Enable/disable animated command output
        soundEnabled: true, // Enable/disable typing sounds
    },

    // About Me
    about: {
        name: 'Felipe Manuel Bertoldi',
        role: 'Software Developer',
        location: 'Tandil, Buenos Aires, Argentina',
        summary: 'Systems engineering student with a strong foundation in software development and computational concepts. Experienced in teaching programming fundamentals as an assistant professor, with a focus on problem-solving, technical requirements, and collaborative engineering work.',
        currentFocus: 'Applying engineering principles to deliver efficient, scalable software solutions while continuing to grow as a developer.',
        interests: [
            'Backend systems',
            'Full-stack applications',
            'Algorithms and data structures',
            'Game development with Unity'
        ]
    },

    // Extra profile sections shown with the 'more' command.
    // Template: { title: 'Category name', items: ['First detail', 'Second detail'] }
    moreInfo: [
        {
            title: 'Main focus',
            items: [
                'I am mainly interested in backend development, databases, algorithms, and performance.',
                'I enjoy working close to the logic of a system: data flow, rules, efficiency, and maintainable architecture.'
            ]
        },
        {
            title: 'Technologies I want to grow with',
            items: [
                'I am currently programming in C++ and learning more about Spring Boot.',
                'Java and Spring Boot are the stack I am most interested in for backend work, together with database design and PostgreSQL.'
            ]
        },
        {
            title: 'How I work',
            items: [
                'I do not have a problem getting into something new, even if it belongs to another area.',
                'With a short introduction and a clear objective, I am willing to jump in, learn what is needed, and get it done.',
                'If the task is clear, I will get it done; the variable is how much I need to learn along the way.'
            ]
        },
        {
            title: 'Work preference',
            items: [
                'I am interested in full-time backend or software development roles.',
                'Remote work is ideal, but I am also open to going to an office when needed.'
            ]
        }
    ],

    // Contact Information
    contact: {
        email: 'felipemanu2015@gmail.com',
        linkedin: 'linkedin.com/in/felipe-manuel-bertoldi',
        github: 'github.com/FelipePipe2002',
        // Add more contact methods if needed
        // website: 'yourwebsite.com',
    },

    // Projects - loaded by scanning project folders
    projects: [],
    projectsDirectory: 'data/projects',

    // Skills organized by category
    skills: {
        'Programming': [
            'C++',
            'Java',
            'Python',
            'C#',
            'TypeScript'
        ],
        'Frameworks': [
            'Spring Boot',
            'Angular',
            'React Native'
        ],
        'Game Development': [
            'Learning Unity with C#',
            'Basic Blender knowledge'
        ],
        'Database Management': [
            'PostgreSQL'
        ],
        'Languages': [
            'Spanish: Native',
            'English: B2'
        ]
    },

    // CV/Resume Information
    cv: {
        experience: [
            {
                position: 'Assistant Professor of Programming 3',
                company: 'Universidad Nacional del Centro de la Provincia de Buenos Aires',
                period: 'May 2024 - July 2024'
            },
            {
                position: 'Hospital Management System - Final Project',
                company: 'UNCPBA',
                period: 'Graduation project'
            }
        ],
        education: [
            {
                degree: 'Systems Engineering',
                school: 'Universidad Nacional del Centro de la Provincia de Buenos Aires',
                period: 'In progress'
            },
            {
                degree: 'High School Diploma in Economics and Management',
                school: 'Colegio San Jose, Tandil',
                period: 'Graduated: 2019'
            }
        ],
        projects: [
            'Hospital Management System using Java, Spring Boot, Angular, and PostgreSQL'
        ],
        certifications: [],
        cvFile: 'cv.pdf' // Link to your CV file
    },

    tips: [
        'Use Tab to autocomplete commands and project IDs.',
        'Try projects compiler-design to open the compiler project directly.',
        'Press Esc to close an open project detail panel.',
        'When a project is open, press Tab to cycle through projects.',
        'Press Esc while text is typing to skip the animation.',
        'Use animation to toggle animated text output.',
        'Use sound to toggle typing sounds.'
    ]
};

// ============================================
// TERMINAL CLASS - Don't edit unless you know what you're doing
// ============================================

class Terminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.soundToggle = document.getElementById('sound-toggle');
        this.animationToggle = document.getElementById('animation-toggle');
        this.viewToggle = document.getElementById('view-toggle');
        this.simplePortfolio = document.getElementById('simple-portfolio');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isTyping = false;
        this.skipTyping = false;

        // Autocomplete state
        this.autocompleteMatches = [];
        this.autocompleteIndex = -1;
        this.autocompletePrefix = '';
        this.currentProjectId = null;
        this.isProjectOpen = false;
        this.tipTimeout = null;
        this.lastTip = null;

        this.commands = {
            help: this.showHelp.bind(this),
            whoami: this.showWhoami.bind(this),
            more: this.showMoreInfo.bind(this),
            experience: this.showExperience.bind(this),
            projects: this.showProjects.bind(this),
            stack: this.showStack.bind(this),
            education: this.showEducation.bind(this),
            languages: this.showLanguages.bind(this),
            github: this.showGithub.bind(this),
            email: this.showEmail.bind(this),
            animation: this.toggleTypingAnimation.bind(this),
            sound: this.toggleSound.bind(this),
            clear: this.clearTerminal.bind(this)
        };

        // Load typing sound
        this.typeSound = null;
        this.loadSound();

        // Load projects from external files
        this.loadProjects();

        this.init();
    }

    loadSound() {
        // Create a simple typing sound using Web Audio API
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.audioContext = AudioContextClass ? new AudioContextClass() : null;
        } catch (error) {
            this.audioContext = null;
            console.warn('Audio context unavailable:', error);
        }
    }

    async loadProjects() {
        try {
            // Fetch list of project folders
            const response = await fetch(`${CONFIG.projectsDirectory}/index.json`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const projectFolders = await response.json();

            // Load metadata for each project
            CONFIG.projects = [];
            for (const folderId of projectFolders) {
                try {
                    const projectResponse = await fetch(`${CONFIG.projectsDirectory}/${folderId}/project.json`, { cache: 'no-store' });
                    if (projectResponse.ok) {
                        const projectData = await projectResponse.json();
                        CONFIG.projects.push({
                            ...projectData,
                            folder: folderId
                        });
                    }
                } catch (err) {
                    console.warn(`Failed to load project ${folderId}:`, err);
                }
            }
            console.log('Projects loaded:', CONFIG.projects.length);
            this.renderSimplePortfolio();
        } catch (error) {
            console.error('Failed to load projects:', error);
            CONFIG.projects = [];
        }
    }

    async loadProjectDetails(projectId) {
        const project = CONFIG.projects.find(p => p.id === projectId);
        if (!project) return null;

        try {
            // Load Markdown content from README.md
            const mdResponse = await fetch(`${CONFIG.projectsDirectory}/${project.folder}/README.md`, { cache: 'no-store' });
            const markdownContent = await mdResponse.text();

            // Combine metadata with content
            return {
                ...project,
                content: markdownContent
            };
        } catch (error) {
            console.error(`Failed to load project ${projectId}:`, error);
            return null;
        }
    }

    playTypeSound() {
        if (!CONFIG.settings.soundEnabled || !this.audioContext) return;

        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = 800 + Math.random() * 200;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    init() {
        this.renderSimplePortfolio();
        this.setSimpleView(true);
        this.showWelcome();
        this.updateControlButtons();

        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

        this.soundToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSound(false);
            this.input.focus();
        });

        this.animationToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleTypingAnimation(false);
            this.input.focus();
        });

        this.viewToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.setSimpleView(true);
        });

        // Play sound on keypress (when user types)
        this.input.addEventListener('keypress', (e) => {
            this.playTypeSound();
        });

        // Keep input focused when clicking anywhere on terminal
        document.querySelector('.terminal-container').addEventListener('click', () => {
            this.input.focus();
        });

        document.querySelector('.project-details-container').addEventListener('click', () => {
            this.input.focus();
        });

        // Prevent zoom on double-tap for mobile
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('simple-project-open')) {
                this.closeSimpleProject();
            }
        });
    }

    handleKeyDown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            if (this.isProjectOpen) {
                this.cycleProject(e.shiftKey ? -1 : 1);
            } else {
                this.handleAutocomplete();
            }
        } else if (e.key === 'Escape' && this.isTyping) {
            e.preventDefault();
            this.skipTypingAnimation();
        } else if (e.key === 'Escape' && this.isProjectOpen) {
            e.preventDefault();
            this.closeProjectDetails();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.input.value.trim().toLowerCase();

            if (command) {
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.executeCommand(command);
                this.input.value = '';
            }
            this.resetAutocomplete();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
            this.resetAutocomplete();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
            this.resetAutocomplete();
        } else {
            // Any other key press resets autocomplete
            this.resetAutocomplete();
        }
    }

    handleAutocomplete() {
        const currentInput = this.input.value.toLowerCase();

        // Check if user is typing "projects [partial-id]"
        const projectsCommandPattern = /^projects\s+(.*)$/;
        const projectsMatch = currentInput.match(projectsCommandPattern);

        if (projectsMatch) {
            // Autocomplete project IDs
            const partialProjectId = projectsMatch[1];

            // Check if we're continuing an autocomplete session
            const isContinuingAutocomplete = this.autocompleteMatches.length > 0 &&
                                             this.autocompleteMatches.includes(partialProjectId);

            // If this is a new autocomplete session, find matching project IDs
            if (!isContinuingAutocomplete) {
                this.autocompletePrefix = partialProjectId;
                this.autocompleteMatches = CONFIG.projects
                    .map(p => p.id)
                    .filter(id => id.startsWith(partialProjectId))
                    .sort();
                this.autocompleteIndex = -1;
            }

            // If no matches, do nothing
            if (this.autocompleteMatches.length === 0) {
                return;
            }

            // Cycle through matches
            this.autocompleteIndex = (this.autocompleteIndex + 1) % this.autocompleteMatches.length;
            this.input.value = 'projects ' + this.autocompleteMatches[this.autocompleteIndex];
        } else {
            // Autocomplete commands
            // Check if we're continuing an autocomplete session
            const isContinuingAutocomplete = this.autocompleteMatches.length > 0 &&
                                             this.autocompleteMatches.includes(currentInput);

            // If this is a new autocomplete session, find matches
            if (!isContinuingAutocomplete) {
                this.autocompletePrefix = currentInput;
                this.autocompleteMatches = Object.keys(this.commands).filter(cmd =>
                    cmd.startsWith(currentInput)
                ).sort();
                this.autocompleteIndex = -1;
            }

            // If no matches, do nothing
            if (this.autocompleteMatches.length === 0) {
                return;
            }

            // Cycle through matches
            this.autocompleteIndex = (this.autocompleteIndex + 1) % this.autocompleteMatches.length;
            this.input.value = this.autocompleteMatches[this.autocompleteIndex];
        }
    }

    resetAutocomplete() {
        this.autocompleteMatches = [];
        this.autocompleteIndex = -1;
        this.autocompletePrefix = '';
    }

    async executeCommand(commandString) {
        // Prevent executing commands while typing
        if (this.isTyping) return;

        // Display the command (no animation)
        this.addOutput(`<div class="command-line">visitor@portfolio:~$ ${commandString}</div>`, false);

        // Parse command and arguments
        const parts = commandString.split(' ');
        const command = parts[0];
        const args = parts.slice(1);

        // Execute the command
        if (this.commands[command]) {
            await this.commands[command](args);
            this.showRandomTip(command);
        } else {
            await this.showUnknownCommand(command);
        }

        // Scroll to bottom
        this.scrollToBottom();
    }

    async addOutput(html, animate = true) {
        if (!animate || !CONFIG.settings.typingAnimationEnabled || CONFIG.settings.typingSpeed === 0) {
            this.output.insertAdjacentHTML('beforeend', html);
            return;
        }

        // Create a temporary div to hold the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const element = tempDiv.firstElementChild;

        // Add empty element first
        this.output.appendChild(element);

        // Get all text nodes recursively
        const textNodes = this.getTextNodes(element);

        // Clear text content
        textNodes.forEach(node => {
            node.originalText = node.textContent;
            node.textContent = '';
        });

        this.isTyping = true;
        this.skipTyping = false;

        // Type out each text node
        for (const node of textNodes) {
            if (this.skipTyping) {
                node.textContent = node.originalText;
            } else {
                await this.typeText(node, node.originalText);
            }
        }

        this.isTyping = false;
        this.skipTyping = false;
    }

    getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim() !== '') {
                textNodes.push(node);
            }
        }
        return textNodes;
    }

    async typeText(node, text) {
        for (let i = 0; i < text.length; i++) {
            if (this.skipTyping) {
                node.textContent = text;
                return;
            }

            node.textContent += text[i];
            this.playTypeSound();
            this.scrollToBottom();
            await this.sleep(CONFIG.settings.typingSpeed);
        }
    }

    skipTypingAnimation() {
        this.skipTyping = true;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    getWelcomeMessage() {
        return `
            <div class="welcome-message">
                <pre class="ascii-art">
 ___         _    __      _ _
| _ \\___ _ _| |_ / _|___ | (_)___
|  _/ _ \\ '_|  _|  _/ _ \\| | / _ \\
|_| \\___/_|  \\__|_| \\___/|_|_\\___/

                </pre>
                <h1>${CONFIG.about.name}</h1>
                <p class="welcome-role">${CONFIG.about.role} | Systems Engineering Student</p>
                <p class="welcome-intro">Start with one of these commands:</p>
                <div class="suggested-commands" aria-label="Suggested commands">
                    <span class="highlight">whoami</span>
                    <span class="highlight">projects</span>
                    <span class="highlight">stack</span>
                    <span class="highlight">more</span>
                    <span class="highlight">help</span>
                </div>
            </div>
        `;
    }

    showWelcome() {
        this.output.innerHTML = this.getWelcomeMessage();
    }

    showRandomTip(command) {
        if (command === 'clear' || Math.random() > 0.35) return;

        const availableTips = CONFIG.tips.filter(tip => tip !== this.lastTip);
        const tipPool = availableTips.length > 0 ? availableTips : CONFIG.tips;
        const tip = tipPool[Math.floor(Math.random() * tipPool.length)];
        this.lastTip = tip;
        this.showTipPanel(tip);
    }

    showTipPanel(tip) {
        let panel = document.querySelector('.terminal-tip-panel');

        if (!panel) {
            panel = document.createElement('div');
            panel.className = 'terminal-tip-panel';
            document.body.appendChild(panel);
        }

        panel.innerHTML = `<span>tip</span>${this.escapeHtml(tip)}`;
        panel.classList.add('visible');

        clearTimeout(this.tipTimeout);
        this.tipTimeout = setTimeout(() => {
            panel.classList.remove('visible');
        }, 4500);
    }

    async showUnknownCommand(command) {
        const suggestions = this.getCommandSuggestions(command);
        const suggestionText = suggestions.length > 0
            ? `<p>Did you mean ${suggestions.map(cmd => `<span class="highlight">${cmd}</span>`).join(' or ')}?</p>`
            : '<p>Type <span class="highlight">help</span> to see available commands.</p>';

        await this.addOutput(`
            <div class="command-output">
                <p class="error">Command not found: ${this.escapeHtml(command)}</p>
                ${suggestionText}
            </div>
        `);
    }

    escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    getCommandSuggestions(command) {
        return Object.keys(this.commands)
            .map(name => ({ name, distance: this.getEditDistance(command, name) }))
            .filter(match => match.distance <= 2 || match.name.startsWith(command[0]))
            .sort((a, b) => a.distance - b.distance || a.name.localeCompare(b.name))
            .slice(0, 2)
            .map(match => match.name);
    }

    getEditDistance(source, target) {
        const distances = Array.from({ length: source.length + 1 }, () => []);

        for (let i = 0; i <= source.length; i++) distances[i][0] = i;
        for (let j = 0; j <= target.length; j++) distances[0][j] = j;

        for (let i = 1; i <= source.length; i++) {
            for (let j = 1; j <= target.length; j++) {
                const cost = source[i - 1] === target[j - 1] ? 0 : 1;
                distances[i][j] = Math.min(
                    distances[i - 1][j] + 1,
                    distances[i][j - 1] + 1,
                    distances[i - 1][j - 1] + cost
                );
            }
        }

        return distances[source.length][target.length];
    }

    showHelp() {
        const helpText = `
            <div class="command-output">
                <h3>Commands</h3>
                <ul>
                    <li><span class="highlight">whoami</span> - Short profile</li>
                    <li><span class="highlight">more</span> - Extra profile notes</li>
                    <li><span class="highlight">projects</span> - Project list</li>
                    <li><span class="highlight">projects [id]</span> - Project details</li>
                    <li><span class="highlight">stack</span> - Tech stack</li>
                    <li><span class="highlight">experience</span> - Work and teaching</li>
                    <li><span class="highlight">education</span> - Education</li>
                    <li><span class="highlight">languages</span> - Languages</li>
                    <li><span class="highlight">github</span> - GitHub profile</li>
                    <li><span class="highlight">email</span> - Email address</li>
                    <li><span class="highlight">animation</span> - Toggle text animation</li>
                    <li><span class="highlight">sound</span> - Toggle typing sound</li>
                    <li><span class="highlight">clear</span> - Clear the terminal</li>
                </ul>
                <p></p>
                <p><span class="highlight">Tab</span> autocompletes commands and project IDs.</p>
                <p><span class="highlight">Esc</span> skips text animation or closes an open project.</p>
            </div>
        `;
        this.addOutput(helpText);
    }

    showWhoami() {
        const whoamiText = `
            <div class="command-output">
                <h3>${CONFIG.about.name}</h3>
                <p>${CONFIG.about.role} | Systems Engineering Student</p>
                <p><span class="highlight">Location:</span> ${CONFIG.about.location}</p>
                <p>Building backend and full-stack software with Java, Spring Boot, Angular, and PostgreSQL.</p>
            </div>
        `;
        this.addOutput(whoamiText);
    }

    showMoreInfo() {
        const sections = CONFIG.moreInfo.map(section => {
            const items = section.items.map(item => `<li>${this.escapeHtml(item)}</li>`).join('');

            return `
                <p><span class="highlight">${this.escapeHtml(section.title)}</span></p>
                <ul>${items}</ul>
            `;
        }).join('<p></p>');

        const moreText = `
            <div class="command-output">
                <h3>More About Me</h3>
                ${sections}
            </div>
        `;
        this.addOutput(moreText);
    }

    showExperience() {
        const experienceList = CONFIG.cv.experience.map(exp => `
            <li><strong>${exp.position}</strong> at ${exp.company} (${exp.period})</li>
        `).join('');

        const experienceText = `
            <div class="command-output">
                <h3>Experience</h3>
                <ul>
                    ${experienceList}
                </ul>
            </div>
        `;
        this.addOutput(experienceText);
    }

    async showProjects(args = []) {
        // Check if projects are loaded
        if (!CONFIG.projects || CONFIG.projects.length === 0) {
            this.addOutput(`<div class="command-output"><p class="error">No projects found. Projects may still be loading...</p><p>Check the browser console for errors.</p></div>`);
            console.log('Projects array:', CONFIG.projects);
            console.log('Projects index file:', CONFIG.projectsIndexFile);
            return;
        }

        // If a project ID is provided, show detailed view
        if (args.length > 0) {
            const projectId = args[0].toLowerCase();
            const project = CONFIG.projects.find(p => p.id === projectId);

            if (project) {
                this.addOutput(`<div class="command-output"><p>Loading project details for <span class="highlight">${project.name}</span>...</p></div>`, false);
                await this.showProjectDetails(projectId);
            } else {
                this.addOutput(`<div class="command-output"><p class="error">Project not found: ${args[0]}</p><p>Available projects: ${CONFIG.projects.map(p => p.id).join(', ')}</p></div>`);
            }
            return;
        }

        // Otherwise, show project list
        let projectsList = '';
        CONFIG.projects.forEach(project => {
            projectsList += `<li><span class="highlight">${project.name}</span> (${project.id}) - ${project.description}</li>`;
        });

        const projectsText = `
            <div class="command-output">
                <h3>Projects</h3>
                <ul>
                    ${projectsList}
                </ul>
                <p></p>
                <p>Type <span class="highlight">projects [project-id]</span> to see details.</p>
            </div>
        `;
        this.addOutput(projectsText);
    }

    async showProjectDetails(projectId) {
        // Load full project details
        const project = await this.loadProjectDetails(projectId);

        if (!project) {
            this.addOutput(`<div class="command-output"><p class="error">Failed to load project details.</p></div>`);
            return;
        }

        const content = document.getElementById('project-details-content');
        const title = document.getElementById('project-title');

        this.currentProjectId = projectId;
        this.isProjectOpen = true;

        // Parse markdown content (everything is in the markdown now)
        const parsedContent = markdownParser.parse(project.content);

        // Set title
        title.textContent = project.name;

        // Set content with parsed markdown - that's it!
        content.innerHTML = `
            <div class="project-detail">
                <div class="project-shortcuts">
                    <span><kbd>Esc</kbd> closes project</span>
                    <span><kbd>Tab</kbd> cycles project suggestions</span>
                </div>
                ${parsedContent}
            </div>
        `;

        // Show split view
        document.querySelector('.main-container').classList.add('split-view');

        // Setup close button
        document.getElementById('close-project-details').onclick = () => this.closeProjectDetails();
    }

    closeProjectDetails() {
        document.querySelector('.main-container').classList.remove('split-view');
        this.currentProjectId = null;
        this.isProjectOpen = false;
        this.input.focus();
    }

    async cycleProject(direction = 1) {
        if (!CONFIG.projects || CONFIG.projects.length === 0 || !this.currentProjectId) return;

        const currentIndex = CONFIG.projects.findIndex(project => project.id === this.currentProjectId);
        if (currentIndex === -1) return;

        const nextIndex = (currentIndex + direction + CONFIG.projects.length) % CONFIG.projects.length;
        const nextProject = CONFIG.projects[nextIndex];

        await this.showProjectDetails(nextProject.id);
    }

    showStack() {
        const stackText = `
            <div class="command-output">
                <h3>Tech Stack</h3>
                <ul>
                    <li><span class="highlight">Languages:</span> C++, Java, Python, C#, TypeScript</li>
                    <li><span class="highlight">Backend:</span> Java, Spring Boot</li>
                    <li><span class="highlight">Frontend:</span> Angular, React Native</li>
                    <li><span class="highlight">Database:</span> PostgreSQL</li>
                    <li><span class="highlight">Game dev:</span> Unity with C#, basic Blender</li>
                </ul>
            </div>
        `;
        this.addOutput(stackText);
    }

    showEducation() {
        const educationList = CONFIG.cv.education.map(edu => `
            <li><strong>${edu.degree}</strong> - ${edu.school} (${edu.period})</li>
        `).join('');

        const educationText = `
            <div class="command-output">
                <h3>Education</h3>
                <ul>
                    ${educationList}
                </ul>
            </div>
        `;
        this.addOutput(educationText);
    }

    showLanguages() {
        const languages = CONFIG.skills.Languages.map(language => `<li>${language}</li>`).join('');
        const languagesText = `
            <div class="command-output">
                <h3>Languages</h3>
                <ul>
                    ${languages}
                </ul>
            </div>
        `;
        this.addOutput(languagesText);
    }

    showGithub() {
        const github = CONFIG.contact.github;
        const isPlaceholder = this.isPlaceholderContact(github);
        const normalizedUrl = this.normalizeUrl(github);

        if (!isPlaceholder && normalizedUrl) {
            window.open(normalizedUrl, '_blank', 'noopener,noreferrer');
        }

        const githubText = `
            <div class="command-output">
                <h3>GitHub</h3>
                <p><span class="highlight">${this.escapeHtml(github)}</span></p>
                <p>${isPlaceholder ? 'Add your real GitHub profile in CONFIG.contact.github.' : 'Opening profile in a new tab.'}</p>
            </div>
        `;
        this.addOutput(githubText);
    }

    async showEmail() {
        const email = CONFIG.contact.email;
        const isPlaceholder = this.isPlaceholderContact(email);
        let actionText = 'Add your real email in CONFIG.contact.email.';

        if (!isPlaceholder && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(email);
                actionText = 'Copied to clipboard.';
            } catch (error) {
                actionText = 'Copy it manually from here.';
            }
        } else if (!isPlaceholder) {
            actionText = 'Copy it manually from here.';
        }

        const emailText = `
            <div class="command-output">
                <h3>Email</h3>
                <p><span class="highlight">${this.escapeHtml(email)}</span></p>
                <p>${actionText}</p>
            </div>
        `;
        this.addOutput(emailText);
    }

    normalizeUrl(value) {
        if (!value || value.startsWith('@')) return null;
        return /^https?:\/\//i.test(value) ? value : `https://${value}`;
    }

    isPlaceholderContact(value) {
        return !value || /your|example\.com|@your/i.test(value);
    }

    updateControlButtons() {
        this.soundToggle.classList.toggle('is-disabled', !CONFIG.settings.soundEnabled);
        this.soundToggle.setAttribute('aria-pressed', String(CONFIG.settings.soundEnabled));

        this.animationToggle.classList.toggle('is-disabled', !CONFIG.settings.typingAnimationEnabled);
        this.animationToggle.setAttribute('aria-pressed', String(CONFIG.settings.typingAnimationEnabled));
    }

    setSimpleView(enabled) {
        if (!enabled) this.closeSimpleProject();
        document.body.classList.toggle('simple-view', enabled);
        this.simplePortfolio.setAttribute('aria-hidden', String(!enabled));
        this.viewToggle.setAttribute('aria-pressed', String(enabled));
        if (!enabled) this.input.focus();
    }

    renderSimplePortfolio() {
        const contactLink = (label, value, prefix = '') => {
            if (!value) return '';
            const href = prefix || this.normalizeUrl(value);
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
        };
        const skills = Object.entries(CONFIG.skills).map(([category, items]) => `
            <div class="simple-skill-group"><h3>${category}</h3><p>${items.join(' · ')}</p></div>
        `).join('');
        const experience = CONFIG.cv.experience.map(item => `
            <article class="simple-entry"><div><h3>${item.position}</h3><p>${item.company}</p></div><span>${item.period}</span></article>
        `).join('');
        const education = CONFIG.cv.education.map(item => `
            <article class="simple-entry"><div><h3>${item.degree}</h3><p>${item.school}</p></div><span>${item.period}</span></article>
        `).join('');
        const projects = CONFIG.projects.map(project => `
            <article class="simple-project">
                <div><p class="simple-project-label">Selected project</p><h3>${project.name}</h3><p>${project.description}</p></div>
                <div class="simple-project-actions">
                    <button type="button" class="simple-project-button" data-project-id="${project.id}" aria-label="View ${project.name}">View project <span aria-hidden="true">&rarr;</span></button>
                    ${project.liveUrl ? `<a class="simple-project-link" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live site <span aria-hidden="true">&#8599;</span></a>` : ''}
                </div>
            </article>
        `).join('') || '<p>Projects are loading…</p>';

        const pageNames = ['Profile', 'Technical profile', 'Projects', 'Experience', 'Education'];
        const pageNav = pageNames.map((name, index) => `<button type="button" class="simple-page-tab" data-page="${index}">${name}</button>`).join('');
        const pager = `<div class="simple-pager"><button type="button" class="simple-page-previous">&larr; Previous</button><span class="simple-page-status"></span><button type="button" class="simple-page-next">Next &rarr;</button></div>`;

        this.simplePortfolio.innerHTML = `
            <nav class="simple-nav" aria-label="Portfolio navigation"><strong>${CONFIG.about.name}</strong><div class="simple-page-tabs">${pageNav}</div><button type="button" id="terminal-view-button">Terminal</button></nav>
            <div class="simple-content">
                <section class="simple-page simple-hero" data-page="0"><p class="simple-eyebrow">${CONFIG.about.role}</p><h1>${CONFIG.about.name}</h1><p class="simple-lead">${CONFIG.about.summary}</p><p class="simple-location">${CONFIG.about.location}</p><div class="simple-links">${contactLink('Email', CONFIG.contact.email, `mailto:${CONFIG.contact.email}`)}${contactLink('LinkedIn', CONFIG.contact.linkedin)}${contactLink('GitHub', CONFIG.contact.github)}</div></section>
                <section class="simple-page" data-page="1"><p class="simple-eyebrow">Technical profile</p><h2>Skills</h2><div class="simple-skills">${skills}</div></section>
                <section class="simple-page" data-page="2"><p class="simple-eyebrow">Selected work</p><h2>Projects</h2><div class="simple-projects">${projects}</div></section>
                <section class="simple-page" data-page="3"><p class="simple-eyebrow">Background</p><h2>Experience</h2>${experience}</section>
                <section class="simple-page" data-page="4"><p class="simple-eyebrow">Education</p><h2>Studies</h2>${education}</section>
                ${pager}
            </div>
            <article class="simple-project-view" id="simple-project-view" aria-hidden="true"><header><button type="button" class="simple-project-back">&larr; Back to projects</button><p class="simple-eyebrow">Project details</p><h1 id="simple-project-view-title">Project</h1></header><div class="simple-project-detail" id="simple-project-detail"></div></article>`;
        document.getElementById('terminal-view-button').addEventListener('click', () => this.setSimpleView(false));
        this.simplePortfolio.querySelectorAll('.simple-page-tab').forEach(button => button.addEventListener('click', () => this.showSimplePage(Number(button.dataset.page))));
        this.simplePortfolio.querySelector('.simple-page-previous').addEventListener('click', () => this.showSimplePage(this.simplePageIndex - 1));
        this.simplePortfolio.querySelector('.simple-page-next').addEventListener('click', () => this.showSimplePage(this.simplePageIndex + 1));
        this.simplePortfolio.querySelectorAll('.simple-project-button').forEach(button => {
            button.addEventListener('click', () => this.openSimpleProject(button.dataset.projectId));
        });
        this.simplePortfolio.querySelector('.simple-project-back').addEventListener('click', () => this.closeSimpleProject());
        this.showSimplePage(Number.isInteger(this.simplePageIndex) ? this.simplePageIndex : 0);
    }

    showSimplePage(index) {
        const pages = this.simplePortfolio.querySelectorAll('.simple-page');
        if (!pages.length) return;
        this.simplePageIndex = Math.max(0, Math.min(index, pages.length - 1));
        pages.forEach((page, pageIndex) => page.classList.toggle('is-active', pageIndex === this.simplePageIndex));
        this.simplePortfolio.querySelectorAll('.simple-page-tab').forEach((button, pageIndex) => {
            button.classList.toggle('is-active', pageIndex === this.simplePageIndex);
            button.setAttribute('aria-current', pageIndex === this.simplePageIndex ? 'page' : 'false');
        });
        this.simplePortfolio.querySelector('.simple-page-previous').disabled = this.simplePageIndex === 0;
        this.simplePortfolio.querySelector('.simple-page-next').disabled = this.simplePageIndex === pages.length - 1;
        this.simplePortfolio.querySelector('.simple-page-status').textContent = `${this.simplePageIndex + 1} / ${pages.length}`;
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    async openSimpleProject(projectId) {
        const project = await this.loadProjectDetails(projectId);
        if (!project) return;
        const projectView = document.getElementById('simple-project-view');
        document.getElementById('simple-project-view-title').textContent = project.name;
        document.getElementById('simple-project-detail').innerHTML = markdownParser.parse(project.content);
        projectView.setAttribute('aria-hidden', 'false');
        document.body.classList.add('simple-project-open');
        window.scrollTo({ top: 0, behavior: 'instant' });
        projectView.querySelector('.simple-project-back').focus();
    }

    closeSimpleProject() {
        const projectView = document.getElementById('simple-project-view');
        if (!projectView) return;
        projectView.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('simple-project-open');
        this.showSimplePage(2);
    }

    toggleTypingAnimation(showOutput = true) {
        CONFIG.settings.typingAnimationEnabled = !CONFIG.settings.typingAnimationEnabled;
        this.updateControlButtons();
        if (!showOutput) return;

        const status = CONFIG.settings.typingAnimationEnabled ? 'enabled' : 'disabled';
        this.addOutput(`
            <div class="command-output">
                <h3>Animation</h3>
                <p>Text animation is now <span class="highlight">${status}</span>.</p>
                <p>Press <span class="highlight">Esc</span> while text is typing to skip only the current output.</p>
            </div>
        `, false);
    }

    toggleSound(showOutput = true) {
        CONFIG.settings.soundEnabled = !CONFIG.settings.soundEnabled;
        this.updateControlButtons();
        if (!showOutput) return;

        const status = CONFIG.settings.soundEnabled ? 'enabled' : 'disabled';
        this.addOutput(`
            <div class="command-output">
                <h3>Sound</h3>
                <p>Typing sound is now <span class="highlight">${status}</span>.</p>
            </div>
        `);
    }

    clearTerminal() {
        this.showWelcome();
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});
