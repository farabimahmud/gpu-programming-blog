// nav.js - injects a sidebar into pages and handles hamburger toggle
(function(){
  function buildSidebarHtml(){
    return `
    <div class="gp-nav-wrapper">
      <div class="gp-sidebar" id="gp-sidebar">
        <div class="gp-logo">CUDA GEMM টিউটোরিয়াল</div>
        <p class="desc">নেভ থেকে হাই-পারফরম্যান্স: সমস্ত অধ্যায়ের জন্য দ্রুত ন্যাভিগেশন।</p>
        <nav>
          <ul class="gp-nav-list">
            <li><a href="index.html"><span class="gp-ch-num">১</span>সূচিপত্র</a></li>
            <li><a href="chapter1.html"><span class="gp-ch-num">১</span> পরিচিতি ও সেটআপ</a></li>
            <li><a href="chapter2.html"><span class="gp-ch-num">২</span> নেইভ GEMM কার্নেল</a></li>
            <li><a href="chapter3.html"><span class="gp-ch-num">৩</span> T4 আর্কিটেকচার</a></li>
            <li><a href="chapter4.html"><span class="gp-ch-num">৪</span> কোয়ালেস্ড মেমরি</a></li>
            <li><a href="chapter5.html"><span class="gp-ch-num">৫</span> শেয়ার্ড মেমরি টাইলিং</a></li>
            <li><a href="chapter6.html"><span class="gp-ch-num">৬</span> থ্রেড ব্লক টাইল</a></li>
            <li><a href="chapter7.html"><span class="gp-ch-num">৭</span> 1D ব্লকটাইলিং</a></li>
            <li><a href="chapter8.html"><span class="gp-ch-num">৮</span> 2D ব্লকটাইলিং</a></li>
            <li><a href="chapter9.html"><span class="gp-ch-num">৯</span> ওয়ার্প-লেভেল টাইলিং</a></li>
            <li><a href="chapter10.html"><span class="gp-ch-num">১০</span> বেঞ্চমার্কিং</a></li>
          </ul>
        </nav>
        <div style="height:28px"></div>
      </div>
      <div class="gp-topbar" id="gp-topbar">
        <button class="gp-toggle" id="gp-toggle" aria-label="Toggle navigation">☰</button>
        <div class="gp-title">CUDA GEMM টিউটোরিয়াল</div>
      </div>
    </div>
    `;
  }

  function ensureCss(){
    var href = 'nav.css';
    if(!document.querySelector('link[href="' + href + '"]')){
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      document.head.appendChild(l);
    }
  }

  function mount(){
    ensureCss();
    var root = document.getElementById('sidebar-root');
    if(!root){
      // create a container at documentElement start if not present
      root = document.createElement('div');
      root.id = 'sidebar-root';
      document.body.insertBefore(root, document.body.firstChild);
    }

    // inject sidebar HTML
    root.innerHTML = buildSidebarHtml();

    // add class to main content so it gets margin
    document.documentElement.classList.add('gp-nav-mounted');

    // find main content area (heuristic) and add wrapper class
    var firstMain = document.querySelector('body > *:not(#sidebar-root)');
    // If index page has direct content, wrap everything except the sidebar-root
    var content = document.querySelector('.gp-content-with-sidebar');
    if(!content){
      // add class to body children except sidebar-root
      // we won't restructure DOM heavily; instead rely on CSS margin
      document.body.classList.add('gp-content-with-sidebar');
    }

    // toggle behavior
    var sidebar = document.getElementById('gp-sidebar');
    var toggle = document.getElementById('gp-toggle');
    var topbar = document.getElementById('gp-topbar');

    function hideSidebar(){
      sidebar.classList.add('hidden');
    }
    function showSidebar(){
      sidebar.classList.remove('hidden');
    }

    // start hidden on small screens
    if(window.innerWidth <= 900) hideSidebar();

    window.addEventListener('resize', function(){
      if(window.innerWidth <= 900) hideSidebar(); else showSidebar();
    });

    toggle && toggle.addEventListener('click', function(e){
      if(sidebar.classList.contains('hidden')) showSidebar(); else hideSidebar();
    });

    // close when clicking outside on small screens
    document.addEventListener('click', function(e){
      if(window.innerWidth > 900) return;
      if(!sidebar.contains(e.target) && !toggle.contains(e.target)){
        hideSidebar();
      }
    });

    // keyboard accessibility: Esc to close
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') hideSidebar();
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();