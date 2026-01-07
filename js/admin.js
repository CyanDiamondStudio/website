// Admin Dashboard Script
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
            resetForms();
        });
    });

    // Load initial data
    loadSettings();
    loadMembersList();
    loadProjectsList();
    loadPreviewsList();

    // Admin theme
    initAdminTheme();

    // Settings form
    const settingsForm = document.getElementById('settings-form');
    settingsForm.addEventListener('submit', saveSettings);

    // Members form
    const memberForm = document.getElementById('member-form');
    const memberSubmitBtn = memberForm.querySelector('button[type="submit"]');
    memberForm.addEventListener('submit', handleMemberSubmit);

    // Projects form
    const projectForm = document.getElementById('project-form');
    const projectSubmitBtn = projectForm.querySelector('button[type="submit"]');
    projectForm.addEventListener('submit', handleProjectSubmit);

    // Previews form
    const previewForm = document.getElementById('preview-form');
    const previewSubmitBtn = previewForm.querySelector('button[type="submit"]');
    previewForm.addEventListener('submit', handlePreviewSubmit);

    // HTML Editor
    const loadHtmlBtn = document.getElementById('load-html-btn');
    const embedDataBtn = document.getElementById('embed-data-btn');
    const copyHtmlBtn = document.getElementById('copy-html-btn');
    const previewHtmlBtn = document.getElementById('preview-html-btn');
    const htmlEditor = document.getElementById('html-editor');
    const htmlPreview = document.getElementById('html-preview');
    const htmlFileInput = document.getElementById('html-file-input');

    loadHtmlBtn.addEventListener('click', loadHtmlFile);
    embedDataBtn.addEventListener('click', embedDynamicData);
    copyHtmlBtn.addEventListener('click', downloadHtml);
    previewHtmlBtn.addEventListener('click', previewHtml);

    // Edit mode variables
    let editMemberIndex = -1;
    let editProjectIndex = -1;
    let editPreviewIndex = -1;

    function resetForms() {
        editMemberIndex = -1;
        editProjectIndex = -1;
        editPreviewIndex = -1;
        memberForm.reset();
        projectForm.reset();
        previewForm.reset();
        memberSubmitBtn.textContent = 'Add Member';
        projectSubmitBtn.textContent = 'Add Project';
        previewSubmitBtn.textContent = 'Add Preview';
    }

    function loadSettings() {
        let settings = JSON.parse(localStorage.getItem('siteSettings'));
        if (!settings) {
            // Load defaults from translations
            const lang = localStorage.getItem('language') || 'en';
            const trans = translations[lang];
            settings = {
                heroTitle: trans.welcome,
                heroText: trans.heroText,
                aboutText: trans.aboutText,
                email: 'cyan.diamond.studio@gmail.com', // default
                appDev: 40,
                gameDesign: 30,
                uiUx: 20,
                modeling: 20
            };
        }
        document.getElementById('hero-title').value = settings.heroTitle || '';
        document.getElementById('hero-text').value = settings.heroText || '';
        document.getElementById('about-text').value = settings.aboutText || '';
        document.getElementById('contact-email').value = settings.email || '';
        document.getElementById('app-dev').value = settings.appDev || 40;
        document.getElementById('game-design').value = settings.gameDesign || 30;
        document.getElementById('ui-ux').value = settings.uiUx || 20;
        document.getElementById('modeling').value = settings.modeling || 20;
    }

    function saveSettings(e) {
        e.preventDefault();
        const settings = {
            heroTitle: document.getElementById('hero-title').value,
            heroText: document.getElementById('hero-text').value,
            aboutText: document.getElementById('about-text').value,
            email: document.getElementById('contact-email').value,
            appDev: parseInt(document.getElementById('app-dev').value) || 40,
            gameDesign: parseInt(document.getElementById('game-design').value) || 30,
            uiUx: parseInt(document.getElementById('ui-ux').value) || 20,
            modeling: parseInt(document.getElementById('modeling').value) || 20
        };
        localStorage.setItem('siteSettings', JSON.stringify(settings));
        showStatusMessage('Settings saved successfully!', 'success');
    }

    function loadMembersList() {
        const members = JSON.parse(localStorage.getItem('members')) || [];
        const container = document.getElementById('members-list');
        container.innerHTML = members.map((member, index) =>
            `<div class="member-item">
                <div>
                    <strong>${member.name}</strong> - ${member.position}<br>
                    <small>${member.abilities} | <a href="${member.url}" target="_blank">Profile</a></small>
                </div>
                <div>
                    <button class="edit-btn" onclick="editMember(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteMember(${index})">Delete</button>
                </div>
            </div>`
        ).join('');
    }

    function handleMemberSubmit(e) {
        e.preventDefault();
        const members = JSON.parse(localStorage.getItem('members')) || [];
        const member = {
            name: document.getElementById('member-name').value,
            position: document.getElementById('member-position').value,
            abilities: document.getElementById('member-abilities').value,
            url: document.getElementById('member-url').value
        };
        if (editMemberIndex >= 0) {
            members[editMemberIndex] = member;
            editMemberIndex = -1;
            memberSubmitBtn.textContent = 'Add Member';
            showStatusMessage('Member updated successfully!', 'success');
        } else {
            members.push(member);
            showStatusMessage('Member added successfully!', 'success');
        }
        localStorage.setItem('members', JSON.stringify(members));
        loadMembersList();
        memberForm.reset();
    }

    window.editMember = function(index) {
        const members = JSON.parse(localStorage.getItem('members')) || [];
        const member = members[index];
        document.getElementById('member-name').value = member.name;
        document.getElementById('member-position').value = member.position;
        document.getElementById('member-abilities').value = member.abilities;
        document.getElementById('member-url').value = member.url;
        editMemberIndex = index;
        memberSubmitBtn.textContent = 'Update Member';
    };

    window.deleteMember = function(index) {
        if (confirm('Are you sure you want to delete this member?')) {
            const members = JSON.parse(localStorage.getItem('members')) || [];
            members.splice(index, 1);
            localStorage.setItem('members', JSON.stringify(members));
            loadMembersList();
        }
    };

    function loadProjectsList() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const container = document.getElementById('projects-list');
        container.innerHTML = projects.map((project, index) =>
            `<div class="project-item">
                <div>
                    <strong><a href="${project.link}" target="_blank">${project.name}</a></strong><br>
                    <small>${project.description || 'No description'}</small>
                </div>
                <div>
                    <button class="edit-btn" onclick="editProject(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteProject(${index})">Delete</button>
                </div>
            </div>`
        ).join('');
    }

    function handleProjectSubmit(e) {
        e.preventDefault();
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const project = {
            name: document.getElementById('project-name').value,
            link: document.getElementById('project-link').value,
            description: document.getElementById('project-description').value
        };
        if (editProjectIndex >= 0) {
            projects[editProjectIndex] = project;
            editProjectIndex = -1;
            projectSubmitBtn.textContent = 'Add Project';
            showStatusMessage('Project updated successfully!', 'success');
        } else {
            projects.push(project);
            showStatusMessage('Project added successfully!', 'success');
        }
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjectsList();
        projectForm.reset();
    }

    window.editProject = function(index) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const project = projects[index];
        document.getElementById('project-name').value = project.name;
        document.getElementById('project-link').value = project.link;
        document.getElementById('project-description').value = project.description || '';
        editProjectIndex = index;
        projectSubmitBtn.textContent = 'Update Project';
    };

    window.deleteProject = function(index) {
        if (confirm('Are you sure you want to delete this project?')) {
            const projects = JSON.parse(localStorage.getItem('projects')) || [];
            projects.splice(index, 1);
            localStorage.setItem('projects', JSON.stringify(projects));
            loadProjectsList();
        }
    };

    function loadPreviewsList() {
        const previews = JSON.parse(localStorage.getItem('previews')) || [];
        const container = document.getElementById('previews-list');
        container.innerHTML = previews.map((preview, index) =>
            `<div class="preview-item">
                <div>
                    <strong>${preview.name}</strong><br>
                    <small>${preview.description}</small>
                    ${preview.media ? `<br><img src="${preview.media}" alt="${preview.name}" style="max-width:100px; max-height:100px;">` : ''}
                </div>
                <div>
                    <button class="edit-btn" onclick="editPreview(${index})">Edit</button>
                    <button class="delete-btn" onclick="deletePreview(${index})">Delete</button>
                </div>
            </div>`
        ).join('');
    }

    function handlePreviewSubmit(e) {
        e.preventDefault();
        const previews = JSON.parse(localStorage.getItem('previews')) || [];
        const preview = {
            name: document.getElementById('preview-name').value,
            description: document.getElementById('preview-description').value,
            media: document.getElementById('preview-media').value
        };
        if (editPreviewIndex >= 0) {
            previews[editPreviewIndex] = preview;
            editPreviewIndex = -1;
            previewSubmitBtn.textContent = 'Add Preview';
            showStatusMessage('Preview updated successfully!', 'success');
        } else {
            previews.push(preview);
            showStatusMessage('Preview added successfully!', 'success');
        }
        localStorage.setItem('previews', JSON.stringify(previews));
        loadPreviewsList();
        previewForm.reset();
    }

    window.editPreview = function(index) {
        const previews = JSON.parse(localStorage.getItem('previews')) || [];
        const preview = previews[index];
        document.getElementById('preview-name').value = preview.name;
        document.getElementById('preview-description').value = preview.description;
        document.getElementById('preview-media').value = preview.media || '';
        editPreviewIndex = index;
        previewSubmitBtn.textContent = 'Update Preview';
    };

    window.deletePreview = function(index) {
        if (confirm('Are you sure you want to delete this preview?')) {
            const previews = JSON.parse(localStorage.getItem('previews')) || [];
            previews.splice(index, 1);
            localStorage.setItem('previews', JSON.stringify(previews));
            loadPreviewsList();
        }
    };

    function initAdminTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        const savedTheme = localStorage.getItem('admin-theme') || 'light';
        body.setAttribute('data-admin-theme', savedTheme);
        updateAdminThemeIcon();

        themeToggle.addEventListener('click', toggleAdminTheme);
    }

    function showStatusMessage(message, type) {
        const statusEl = document.getElementById('status-message');
        statusEl.textContent = message;
        statusEl.className = `status-message ${type}`;
        statusEl.style.opacity = '1';
        setTimeout(() => {
            statusEl.style.opacity = '0';
        }, 3000);
    }

    function loadHtmlFile() {
        const file = htmlFileInput.files[0];
        if (!file) {
            showStatusMessage('Please select a file first.', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            htmlEditor.value = e.target.result;
            showStatusMessage('File loaded successfully.', 'success');
        };
        reader.onerror = function() {
            showStatusMessage('Error reading file.', 'error');
        };
        reader.readAsText(file);
    }

    function embedDynamicData() {
        const fileInput = htmlFileInput.files[0];
        if (!fileInput) {
            showStatusMessage('Select and load a file first.', 'error');
            return;
        }
        const file = fileInput.name;
        const content = htmlEditor.value;
        if (!content) {
            showStatusMessage('Load a file first.', 'error');
            return;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        if (file === 'members.html') {
            const members = JSON.parse(localStorage.getItem('members')) || [];
            const membersHtml = members.map(member =>
                `<div class="member"><h3>${member.name}</h3><p><strong>Position:</strong> ${member.position}</p><p><strong>Abilities:</strong> ${member.abilities}</p><p><a href="${member.url}" target="_blank" class="member-link">Visit Profile</a></p></div>`
            ).join('');
            const membersDiv = doc.getElementById('members-list');
            if (membersDiv) {
                membersDiv.innerHTML = membersHtml;
            }
        } else if (file === 'projects.html') {
            const projects = JSON.parse(localStorage.getItem('projects')) || [];
            const projectsHtml = projects.map(project =>
                `<div class="project"><h3><a href="${project.link}" target="_blank">${project.name}</a></h3>${project.description ? `<p>${project.description}</p>` : ''}</div>`
            ).join('');
            const projectsDiv = doc.getElementById('projects-list');
            if (projectsDiv) {
                projectsDiv.innerHTML = projectsHtml;
            }
        } else if (file === 'previews.html') {
            const previews = JSON.parse(localStorage.getItem('previews')) || [];
            const previewsHtml = previews.map(preview =>
                `<div class="preview"><h3>${preview.name}</h3><p>${preview.description}</p>${preview.media ? `<img src="${preview.media}" alt="${preview.name}" loading="lazy">` : ''}</div>`
            ).join('');
            const previewsDiv = doc.getElementById('previews-list');
            if (previewsDiv) {
                previewsDiv.innerHTML = previewsHtml;
            }
        } else if (file === 'index.html') {
            const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};
            if (settings.heroTitle) {
                const heroTitleEl = doc.querySelector('[data-key="welcome"]');
                if (heroTitleEl) heroTitleEl.textContent = settings.heroTitle;
            }
            if (settings.heroText) {
                const heroTextEl = doc.querySelector('[data-key="heroText"]');
                if (heroTextEl) heroTextEl.textContent = settings.heroText;
            }
            if (settings.aboutText) {
                const aboutTextEl = doc.querySelector('[data-key="aboutText"]');
                if (aboutTextEl) aboutTextEl.textContent = settings.aboutText;
            }
            if (settings.email) {
                const emailEl = doc.querySelector('a[href^="mailto:"]');
                if (emailEl) {
                    emailEl.href = `mailto:${settings.email}`;
                    emailEl.textContent = settings.email;
                }
            }
            // Update skills
            const skillElements = doc.querySelectorAll('.skill');
            skillElements.forEach((skill, index) => {
                const progressBar = skill.querySelector('.progress');
                const span = skill.querySelector('span');
                let percentage = 0;
                switch(index) {
                    case 0: percentage = settings.appDev || 40; break;
                    case 1: percentage = settings.gameDesign || 30; break;
                    case 2: percentage = settings.uiUx || 20; break;
                    case 3: percentage = settings.modeling || 20; break;
                }
                if (progressBar) progressBar.setAttribute('data-width', percentage);
                if (span) span.textContent = percentage + '%';
            });
        } else if (file === 'js/script.js') {
            // For script.js, embed data into the defaults
            const members = JSON.parse(localStorage.getItem('members')) || [];
            const projects = JSON.parse(localStorage.getItem('projects')) || [];
            const previews = JSON.parse(localStorage.getItem('previews')) || [];
            const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};

            // Replace defaultMembers
            const membersStr = JSON.stringify(members, null, 8);
            content = content.replace(/const defaultMembers = \[[\s\S]*?\];/, `const defaultMembers = ${membersStr};`);

            // For projects, since no default, add const defaultProjects and change the load
            if (!content.includes('const defaultProjects')) {
                content = content.replace(/function loadProjects\(\) \{/, `const defaultProjects = ${JSON.stringify(projects, null, 8)};\n\nfunction loadProjects() {`);
            } else {
                content = content.replace(/const defaultProjects = \[[\s\S]*?\];/, `const defaultProjects = ${JSON.stringify(projects, null, 8)};`);
            }
            content = content.replace(/const projects = JSON\.parse\(localStorage\.getItem\('projects'\)\) \|\| \[\];/, 'const projects = JSON.parse(localStorage.getItem(\'projects\')) || defaultProjects;');

            // For previews
            if (!content.includes('const defaultPreviews')) {
                content = content.replace(/function loadPreviews\(\) \{/, `const defaultPreviews = ${JSON.stringify(previews, null, 8)};\n\nfunction loadPreviews() {`);
            } else {
                content = content.replace(/const defaultPreviews = \[[\s\S]*?\];/, `const defaultPreviews = ${JSON.stringify(previews, null, 8)};`);
            }
            content = content.replace(/const previews = JSON\.parse\(localStorage\.getItem\('previews'\)\) \|\| \[\];/, 'const previews = JSON.parse(localStorage.getItem(\'previews\')) || defaultPreviews;');

            // For settings, update the default settings in loadSiteSettings
            const settingsStr = JSON.stringify(settings, null, 4);
            content = content.replace(/let settings = JSON\.parse\(localStorage\.getItem\('siteSettings'\)\);\s*if \(!settings\) \{\s*\/\/ Load defaults[\s\S]*?\}/, `let settings = JSON.parse(localStorage.getItem('siteSettings'));
if (!settings) {
    settings = ${settingsStr};
}`);
        }

        const serializer = new XMLSerializer();
        const newContent = serializer.serializeToString(doc);
        htmlEditor.value = newContent;
        showStatusMessage('Dynamic data embedded into HTML.', 'success');
    }

    function downloadHtml() {
        const content = htmlEditor.value;
        if (!content) {
            showStatusMessage('No content to download.', 'error');
            return;
        }
        const file = htmlFileInput.files[0];
        const filename = file ? file.name : 'edited-file.html';
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        showStatusMessage('File downloaded. Replace the original file with this.', 'success');
    }

    function previewHtml() {
        const content = htmlEditor.value;
        if (!content) {
            showStatusMessage('No content to preview.', 'error');
            return;
        }
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        htmlPreview.src = url;
        htmlPreview.style.display = 'block';
        showStatusMessage('Preview loaded.', 'success');
    }

    function toggleAdminTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-admin-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-admin-theme', newTheme);
        localStorage.setItem('admin-theme', newTheme);
        updateAdminThemeIcon();
    }

    function updateAdminThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        const currentTheme = document.body.getAttribute('data-admin-theme');
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }
});