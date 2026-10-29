---
layout: page
permalink: /repositories/
title: Repositories
description: a curation of all open-sourced projects. Details in https://github.com/UQMM-Lab.
nav: true
nav_order: 3
---





<style>
  .gallery-carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
    margin-top: 2rem;
  }

  .gallery-slide {
    display: none;
    width: 100%;
  }

  .gallery-slide.active {
    display: block;
  }

  .gallery-slide video {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
  }

  .caption {
    text-align: center;
    margin-top: 0.5rem;
  }

  .caption a {
    font-size: 1.2rem;
    font-weight: bold;
    color: #b300b3;
    text-decoration: none;
  }

  .caption a:hover {
    text-decoration: underline;
  }

  .caption p {
    color: #555;
    font-size: 0.9rem;
  }

  .next-slide {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 0.5rem 1rem;
    background-color:rgb(180, 180, 180);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .next-slide:hover {
    background-color: #900090;
  }
</style>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const nextSlideBtn = document.querySelector('.next-slide');
    const slides = document.querySelectorAll('.gallery-slide');
    let currentSlide = 0;

    nextSlideBtn.addEventListener('click', () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    });
  });
</script>





## UQMM Repositories

<style>
  /* 主容器：网格布局 */
  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  /* 卡片基础样式 */
  .card {
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  /* 卡片头部：左侧有色条 + 浅灰背景 */
  .card-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: #f9f9f9;
    border-left: 4px solid #b300b3; /* 玫红色左边线，呼应 al-folio 的主色 */
    font-weight: bold;
    font-size: 1.1rem;
    color: #333;
  }
  .card-header a {
    color: #b300b3;
    text-decoration: none;
  }
  .card-header a:hover {
    text-decoration: underline;
  }

  /* 卡片正文 */
  .card-body {
    padding: 1rem;
    background-color: #fff;
    color: #333;
  }
  .card-text {
    margin: 0 0 1rem;
    color: #555;
  }

  /* 统计徽章 */
  .stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
  .badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    color: #fff;
    border-radius: 0.25rem;
  }
  /* Stars - 玫红色 */
  .badge-primary {
    background-color: #b300b3;
  }
  /* Forks - 灰色 */
  .badge-secondary {
    background-color: #6c757d;
  }

  /* 原始仓库信息 */
  .original-stats {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #666;
  }
  .original-stats a {
    color: #b300b3;
    text-decoration: none;
  }
  .original-stats a:hover {
    text-decoration: underline;
  }
</style>

<div id="repo-list" class="card-container">
  <p>Loading forked UQMM repositorys...</p>
</div>

<script>
  // 1. 先获取 UQMM-Lab 的所有 forked 仓库列表
  const apiUrl = 'https://api.github.com/orgs/UQMM-Lab/repos?type=forks';
  const repoList = document.getElementById('repo-list');

  fetch(apiUrl)
    .then(response => response.json())
    .then(forkedRepos => {
      // 如果出错或空数据
      if (forkedRepos.message) {
        showRepoMessage(`Error: ${forkedRepos.message}`);
        return;
      }
      if (forkedRepos.length === 0) {
        showRepoMessage('forked repos not found');
        return;
      }

      // 清空“加载中”
      repoList.replaceChildren();

      // 2. 遍历每一个 fork 仓库，再请求一次详细信息
      forkedRepos.forEach(repo => {
        if (repo.fork) {
          // 发起二次请求
          fetch(`https://api.github.com/repos/${repo.full_name}`)
            .then(r => r.json())
            .then(fullRepo => {
              // 现在 fullRepo 里才可能包含 parent 信息
              createRepoCard(fullRepo); 
            })
            .catch(err => {
              console.error(err);
              createRepoCard(repo); 
            });
        } else {
          // 如果万一有不是 fork 的，也直接创建卡片
          createRepoCard(repo);
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
      showRepoMessage(`Error fetching data: ${error}`);
    });

  // Treat API values as text, never as HTML.
  function repoElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = String(text);
    return element;
  }

  function showRepoMessage(message) {
    repoList.replaceChildren(repoElement('p', '', message));
  }

  function repoLink(url, label) {
    const link = repoElement('a', '', label);
    try {
      const parsed = new URL(url);
      if (parsed.origin === 'https://github.com' && !parsed.username && !parsed.password) {
        link.href = parsed.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    } catch (_) {
      // Invalid URLs remain plain labels without a clickable destination.
    }
    return link;
  }

  // 3. Build cards with DOM nodes so descriptions cannot inject markup.
  function createRepoCard(repoData) {
    // 如果是 fork 并且有 parent，则用 parent 的数据
    const isForkWithParent = repoData.fork && repoData.parent;
    const stars = isForkWithParent
      ? repoData.parent.stargazers_count
      : repoData.stargazers_count;
    const forks = isForkWithParent
      ? repoData.parent.forks_count
      : repoData.forks_count;
    const card = repoElement('div', 'card');
    const header = repoElement('div', 'card-header');
    header.appendChild(repoLink(repoData.html_url, repoData.name));
    const body = repoElement('div', 'card-body');
    body.appendChild(repoElement('p', 'card-text', repoData.description || 'no description'));
    const stats = repoElement('div', 'stats');
    stats.appendChild(repoElement('span', 'badge badge-primary', `Stars: ${stars}`));
    stats.appendChild(document.createTextNode(' '));
    stats.appendChild(repoElement('span', 'badge badge-secondary', `Forks: ${forks}`));
    body.appendChild(stats);
    if (isForkWithParent) {
      const parent = repoElement('div', 'original-stats', 'Forked from: ');
      parent.appendChild(repoLink(repoData.parent.html_url, repoData.parent.full_name));
      body.appendChild(parent);
    }
    card.appendChild(header);
    card.appendChild(body);
    repoList.appendChild(card);
  }
</script>
