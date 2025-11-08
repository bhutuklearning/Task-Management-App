// // js/theme.js
// const toggle = document.getElementById('themeToggle');
// document.body.classList.toggle(localStorage.getItem('theme') || 'light');

// if (toggle) {
//     toggle.addEventListener('click', () => {
//         const current = document.body.classList.contains('dark') ? 'light' : 'dark';
//         document.body.className = current;
//         localStorage.setItem('theme', current);
//     });
// }








// // js/theme.js
// document.addEventListener('DOMContentLoaded', () => {
//     const toggleBtn = document.getElementById('themeToggle');
//     const root = document.documentElement;

//     // 1. Determine initial theme:
//     const saved = localStorage.getItem('theme');
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     const initial = saved || (prefersDark ? 'dark' : 'light');

//     // 2. Apply it:
//     root.classList.remove('light', 'dark');
//     root.classList.add(initial);

//     // 3. On toggle:
//     toggleBtn.addEventListener('click', () => {
//         const next = root.classList.contains('dark') ? 'light' : 'dark';
//         root.classList.replace(root.classList.contains('dark') ? 'dark' : 'light', next);
//         localStorage.setItem('theme', next);
//     });
// });



// // js/theme.js
// document.addEventListener('DOMContentLoaded', () => {
//     const toggleBtn = document.getElementById('themeToggle');
//     const rootEl = document.documentElement;
//     const storage = localStorage.getItem('theme');
//     const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;

//     // 1. Determine and apply initial theme
//     let current = storage || (prefers ? 'dark' : 'light');
//     rootEl.classList.add(current);

//     // 2. Toggle on click
//     toggleBtn.addEventListener('click', () => {
//         current = current === 'dark' ? 'light' : 'dark';
//         rootEl.classList.remove('light', 'dark');
//         rootEl.classList.add(current);
//         localStorage.setItem('theme', current);
//     });
// });







// js/theme.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('themeToggle');
    const root = document.documentElement;

    // 1) Determine initial theme
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = stored || (prefersDark ? 'dark' : 'light');

    // 2) Apply it
    root.classList.toggle('dark', initialTheme === 'dark');

    // 3) Wire up the toggle button
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            // Flip the class
            const nowDark = root.classList.toggle('dark');
            // Save new state
            localStorage.setItem('theme', nowDark ? 'dark' : 'light');
        });
    }
});