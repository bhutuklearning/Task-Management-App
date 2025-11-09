// profile.js

import API_BASE_URL from './config.js';

const API = `${API_BASE_URL}/api`;
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const rawUser = localStorage.getItem('user');
const content = document.getElementById('profileContent');

window.addEventListener('DOMContentLoaded', async () => {
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  // Parse stored user
  let user = {};
  try {
    user = JSON.parse(rawUser) || {};
  } catch {
    user = {};
  }

  // First name & join date
  const firstName = (user.name || user.username || 'User').split(' ')[0];
  const joinedOn = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    : '';

  // Greeting block
  const headerHTML = `
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl mb-6">
        <span class="text-4xl font-bold text-white">
          ${firstName.charAt(0).toUpperCase()}
        </span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
        ${role === 'admin' ? '<i class="fas fa-crown text-yellow-500 mr-2"></i>Admin ' : ''}Welcome, ${firstName}!
      </h2>
      ${joinedOn
      ? `<p class="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
               <i class="fas fa-calendar-alt"></i>
               <span>Joined on ${joinedOn}</span>
             </p>`
      : ''
    }
    </div>`;

  try {
    let statsHTML = '';

    if (role === 'admin') {
      const stats = await fetchJSON('/todos/admin/users');
      const { totalUsers, totalTodos, users } = stats;

      // Cards
      const cards = cardsLayout([
        { label: 'Total Users', value: totalUsers, color: 'bg-indigo-50', text: 'text-indigo-600' },
        { label: 'Total Todos', value: totalTodos, color: 'bg-green-50', text: 'text-green-600' },
      ]);

      // Table rows
      const rows = (Array.isArray(users) ? users : []).map(
        u => `
          <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">${u.name || u.username || '—'}</td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">${u.email || u.user?.email || '—'}</td>
            <td class="px-6 py-4 text-center">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                ${u.totalTodos ?? 0}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                ${u.completed ?? 0}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                ${u.pending ?? 0}
              </span>
            </td>
          </tr>
        `
      ).join('');

      // Table
      const table = `
        <div class="overflow-x-auto mt-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <table class="min-w-full table-auto">
              <thead>
                <tr class="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800">
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">User</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Todos</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Done</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Pending</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                ${rows}
              </tbody>
            </table>
          </div>
        </div>`;

      content.innerHTML = `
        ${headerHTML}
        <div class="mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <i class="fas fa-chart-bar text-blue-500"></i>
            Statistics Overview
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            ${cards}
          </div>
        </div>
        <div class="mt-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <i class="fas fa-users text-indigo-500"></i>
            All Users
          </h3>
          ${table}
        </div>
      `;
      return;
    }

    // Non-admin stats
    const todos = await fetchJSON('/todos');
    const list = Array.isArray(todos) ? todos : todos.todos || [];
    const total = list.length;
    const done = list.filter(t => t.completed).length;
    const pend = total - done;

    statsHTML = cardsLayout([
      { label: 'Total Todos', value: total, color: 'bg-purple-50', text: 'text-purple-600' },
      { label: 'Completed', value: done, color: 'bg-green-50', text: 'text-green-600' },
      { label: 'Pending', value: pend, color: 'bg-yellow-50', text: 'text-yellow-600' },
    ]);

    content.innerHTML = `
      ${headerHTML}
      <div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <i class="fas fa-chart-pie text-blue-500"></i>
          Your Statistics
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          ${statsHTML}
        </div>
      </div>
    `;
  } catch (err) {
    content.innerHTML = `
      <div class="text-center text-red-500">
        Error loading profile data.
      </div>`;
    console.error(err);
  }
});

// fetch JSON with Bearer header
async function fetchJSON(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

// build responsive stats cards
function cardsLayout(items) {
  return items
    .map(i => `
      <div class="p-6 ${i.color} dark:bg-opacity-20
                  rounded-2xl shadow-lg hover:shadow-xl
                  transition-all duration-300 transform hover:-translate-y-1
                  border border-gray-200 dark:border-gray-700">
        <p class="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm sm:text-base">${i.label}</p>
        <p class="text-3xl sm:text-4xl font-bold text-center ${i.text}">
          ${i.value}
        </p>
      </div>
    `)
    .join('');
}

// Logout clears everything
function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}