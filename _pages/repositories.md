---
layout: page
permalink: /repositories/
title: Repositories
description: a curation of all open-sourced projects. Details in https://github.com/UQMM-Lab.
nav: true
nav_order: 3
---



<div class="gallery-carousel">
  <!-- Slide 1 -->
  <div class="gallery-slide active">
    <video autoplay loop muted playsinline>
      <source src="/assets/video/scene_262_cam_web.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="caption">
      <a href="https://djamahl99.github.io/findnpropagatepage/" target="_blank">
        [ECCV'2024] Find n' Propagate
      </a>
      <p>Open-Vocabulary 3D Object Detection in Urban Environments</p>
    </div>
  </div>

  <!-- Slide 2 (example, add more like this) -->
  <div class="gallery-slide">
    <video autoplay loop muted playsinline>
      <source src="/assets/video/sample_project.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="caption">
      <a href="https://github.com/example/project2" target="_blank">Project 2</a>
      <p>Sample description of the second project with a video preview.</p>
    </div>
  </div>

  <!-- Navigation Button -->
  <button class="next-slide">Next One ➡️</button>
</div>

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
        repoList.innerHTML = `<p>Error: ${forkedRepos.message}</p>`;
        return;
      }
      if (forkedRepos.length === 0) {
        repoList.innerHTML = '<p>forked repos not found</p>';
        return;
      }

      // 清空“加载中”
      repoList.innerHTML = '';

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
      repoList.innerHTML = `<p>Error fetching data: ${error}</p>`;
    });

  // 3. 用一个函数来生成卡片（示例简化版）
  function createRepoCard(repoData) {
    // 如果是 fork 并且有 parent，则用 parent 的数据
    const isForkWithParent = repoData.fork && repoData.parent;
    const stars = isForkWithParent
      ? repoData.parent.stargazers_count
      : repoData.stargazers_count;
    const forks = isForkWithParent
      ? repoData.parent.forks_count
      : repoData.forks_count;
    const parentLink = isForkWithParent
      ? `<div class="original-stats">
           Forked from: 
           <a href="${repoData.parent.html_url}" target="_blank">
             ${repoData.parent.full_name}
           </a>
         </div>`
      : '';

    // 生成卡片 HTML
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-header">
        <a href="${repoData.html_url}" target="_blank">
          ${repoData.name}
        </a>
      </div>
      <div class="card-body">
        <p class="card-text">${repoData.description || 'no description'}</p>
        <div class="stats">
          <span class="badge badge-primary">Stars: ${stars}</span>
          <span class="badge badge-secondary">Forks: ${forks}</span>
        </div>
        ${parentLink}
      </div>
    `;
    repoList.appendChild(card);
  }
</script>