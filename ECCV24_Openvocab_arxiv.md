---
layout: projects
title: Open-vocabulary 3D Detection
description: (ECCV 2024) Find n' Propagate Open-Vocabulary 3D Object Detection in Urban Environments
img: assets/img/publication_preview/teaser-OV3D-crop.gif
importance: 1
github: https://github.com/djamahl99/findnpropagate
category: Generalization in 3D Detection
related_publications: true
---

<html>
<head>
  <meta charset="utf-8">
  <!-- Meta tags for social media banners, these should be filled in appropriatly as they are your "business card" -->
  <!-- Replace the content tag with appropriate information -->
  <!-- <meta name="description" content="DESCRIPTION META TAG">
  <meta property="og:title" content="SOCIAL MEDIA TITLE TAG"/>
  <meta property="og:description" content="SOCIAL MEDIA DESCRIPTION TAG TAG"/>
  <meta property="og:url" content="URL OF THE WEBSITE"/>
  
  <!-- <meta property="og:image" content="static/image/your_banner_image.png" />
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/> -->


  <!-- <meta name="twitter:title" content="TWITTER BANNER TITLE META TAG">
  <meta name="twitter:description" content="TWITTER BANNER DESCRIPTION META TAG">
  <!-- Path to banner image, should be in the path listed below. Optimal dimenssions are 1200X600-->
  <meta name="twitter:image" content="static/images/your_twitter_banner_image.png">
  <meta name="twitter:card" content="summary_large_image">
  <!-- Keywords for your paper to be indexed by-->
  <meta name="keywords" content="KEYWORDS SHOULD BE PLACED HERE">
  <meta name="viewport" content="width=device-width, initial-scale=1"> 


  <title>ECCV'24 | Find n' Propagate Open-Vocabulary 3D Object Detection in Urban Environments</title>
  <link rel="icon" type="image/x-icon" href="../static/images/favicon.ico">
  <link href="https://fonts.googleapis.com/css?family=Google+Sans|Noto+Sans|Castoro"
  rel="stylesheet">

  <link rel="stylesheet" href="../static/css/bulma.min.css">
  <link rel="stylesheet" href="../static/css/bulma-carousel.min.css">
  <link rel="stylesheet" href="../static/css/bulma-slider.min.css">
  <link rel="stylesheet" href="../static/css/fontawesome.all.min.css">
  <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css">
  <link rel="stylesheet" href="../static/css/index.css">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://documentcloud.adobe.com/view-sdk/main.js"></script>
  <script defer src="../static/js/fontawesome.all.min.js"></script>
  <script src="../static/js/bulma-carousel.min.js"></script>
  <script src="../static/js/bulma-slider.min.js"></script>
  <script src="../static/js/index.js"></script>
</head>
<body>


  <section class="hero">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <div class="columns is-centered">
          <div class="column has-text-centered">
            <h1 class="title is-1 publication-title">Find n' Propagate Open-Vocabulary 3D Object Detection in Urban Environments</h1>
            <div class="is-size-5 publication-authors">
              <!-- Paper authors -->
              <span class="author-block">
                <a href="FIRST AUTHOR PERSONAL LINK" target="_blank">Djamahl Etchegaray</a><sup>1</sup>,</span>
                <span class="author-block">
                  <a href="SECOND AUTHOR PERSONAL LINK" target="_blank">Zi Huang</a><sup>1</sup>,</span>
                  <span class="author-block">
                    <a href="THIRD AUTHOR PERSONAL LINK" target="_blank">Tatsuya Harada</a><sup>2</sup>,
                  </span>
                  <span class="author-block">
                    <a href="THIRD AUTHOR PERSONAL LINK" target="_blank">Yadan Luo</a><sup>1</sup>
                  </span>
                  </div>

                  <div class="is-size-5 publication-authors">
                    <span class="author-block"><sup>1</sup>UQMM Lab, The University of Queensland; <sup>2</sup>The University of Tokyo<br>ECCV 2024</span>
                    <!-- <span class="eql-cntrb"><small><br><sup>*</sup>Indicates Equal Contribution</small></span> -->
                  </div>

                  <div class="column has-text-centered">
                    <div class="publication-links">
                         <!-- Arxiv PDF link -->
                      <span class="link-block">
                        <a href="https://arxiv.org/pdf/2403.13556" target="_blank"
                        class="external-link button is-normal is-rounded is-dark">
                        <span class="icon">
                          <i class="fas fa-file-pdf"></i>
                        </span>
                        <span>Paper</span>
                      </a>
                    </span>

                    

                  <!-- Github link -->
                  <span class="link-block">
                    <a href="https://github.com/djamahl99/findnpropagate" target="_blank"
                    class="external-link button is-normal is-rounded is-dark">
                    <span class="icon">
                      <i class="fab fa-github"></i>
                    </span>
                    <span>Code</span>
                  </a>
                </span>

                <!-- ArXiv abstract Link -->
                <span class="link-block">
                  <a href="https://arxiv.org/abs/2403.13556" target="_blank"
                  class="external-link button is-normal is-rounded is-dark">
                  <span class="icon">
                    <i class="ai ai-arxiv"></i>
                  </span>
                  <span>arXiv</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- Teaser video-->
<section class="hero teaser">
  <div class="container is-max-desktop">
    <div class="hero-body">
      <img src="../static/videos/teaser.gif" alt="Visualization of detection results" style="width: 100%;">
      <h2 class="subtitle has-text-centered">
        Visualization of the open-vocabulary detection results; Base classes and novel classes are highlighted in blue and pink, respectively. 
      </h2>
    </div>
  </div>
</section>
<!-- End teaser video -->

<!-- Paper abstract -->
<section class="section hero is-light">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column is-four-fifths">
        <h2 class="title is-3">Abstract</h2>
        <div class="content has-text-justified">
          <p>
            In this work, we tackle the limitations of current LiDAR-based 3D object detection systems, which are hindered by a restricted class vocabulary and the high costs associated with annotating new object classes. Our exploration of open-vocabulary (OV) learning in urban environments aims to capture novel instances using pre-trained vision-language models (VLMs) with multi-sensor data. We design and benchmark a set of four potential solutions as baselines, categorizing them into either top-down or bottom-up approaches based on their input data strategies. While effective, these methods exhibit certain limitations, such as missing novel objects in 3D box estimation or applying rigorous priors, leading to biases towards objects near the camera or of rectangular geometries. To overcome these limitations, we introduce a universal Find n' Propagate approach for 3D OV tasks, aimed at maximizing the recall of novel objects and propagating this detection capability to more distant areas thereby progressively capturing more. In particular, we utilize a greedy box seeker to search against 3D novel boxes of varying orientations and depth in each generated frustum and ensure the reliability of newly identified boxes by cross alignment and density ranker. Additionally, the inherent bias towards camera-proximal objects is alleviated by the proposed remote simulator, which randomly diversifies pseudo-labeled novel instances in the self-training process, combined with the fusion of base samples in the memory bank. Extensive experiments demonstrate a 53% improvement in novel recall across diverse OV settings, VLMs, and 3D detectors. Notably, we achieve up to a 3.97-fold increase in Average Precision (AP) for novel object classes. 
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End paper abstract -->



<!--BibTex citation -->
  <section class="section" id="BibTeX">
    <div class="container is-max-desktop content">
      <h2 class="title">BibTeX</h2>
      <pre><code>@inproceedings{DBLP:conf/eccv/Etche24,
  author       = {Djamahl Etchegaray and
                  Zi Huang and
                  Tatsuya Harada and
                  Yadan Luo},
  title        = {Find n' Propagate: Open-Vocabulary 3D Object Detection in Urban Environments},
  booktitle    = {Computer Vision - {ECCV} 2024 - The 18th European Conference on Computer Vision},
  year         = {2024},
  url          = {https://doi.org/10.48550/arXiv.2403.13556}
      
}</code></pre>
    </div>
</section>
<!--End BibTex citation -->


  <footer class="footer">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8">
        <div class="content">

        </div>
      </div>
    </div>
  </div>
</footer>

<!-- Statcounter tracking code -->
  
<!-- You can add a tracker to track page visits by creating an account at statcounter.com -->

    <!-- End of Statcounter Code -->

  </body>
  </html>