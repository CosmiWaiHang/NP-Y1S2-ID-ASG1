window.onload = () => {
  addNavBarElement();
  addNavBarCss();
};

function addNavBarElement() {
  const nav = document.getElementById("nav-top");

  if ("" == nav.innerHTML) {
    nav.innerHTML = `
    <div id="nav-mobile">
        <span onclick="openNav()">&#9776; &nbsp; Canime</span>
        <div id="ph-nav-mb" class="nav-mb-overlay">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <div class="nav-mb-overlay-content">
                <a href="https://github.com/CossetCosmi" target="_blank">Github</a>
                <a href="../home/home.html">Homepage</a>
                <a href="https://www.linkedin.com/in/cosmidulianjun/" target="_blank">LinkedIn</a>
            </div>
        </div>
    </div>

    <div id="nav-desktop">
        <div class="ph-btn nav-signup">
            <div class="ph-btn-ctn">
                <a href="https://github.com/CossetCosmi" class="btn btn-efct-cln btn-outline" data-sm-link-text="ヾ(≧∇≦*)ゝ" target="_blank">
                    <span>Github</span>
                </a>
            </div>
        </div>

        <div class="ph-btn nav-page">
            <div class="ph-btn-ctn">
                <a href="../home/home.html" class="btn btn-efct-cln" data-sm-link-text="(u‿ฺu✿ฺ)" target="_blank">
                    <span>Homepage</span>
                </a>
            </div>
        </div>

        <div class="ph-btn nav-signup">
            <div class="ph-btn-ctn">
                <a href="https://www.linkedin.com/in/cosmidulianjun/" class="btn btn-efct-cln btn-outline" data-sm-link-text="(๑•̀ㅂ•́)و✧">
                    <span>LinkedIn</span>
                </a>
            </div>
        </div>
    </div>
    `;
  }
}

function addNavBarCss() {
  var cssId = "nav-mobile-css";
  if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "../../component/navbar/navbar.css";
    link.media = "all";
    head.appendChild(link);
  }
}

function openNav() {
  document.getElementById("ph-nav-mb").style.height = "100%";
}

function closeNav() {
  document.getElementById("ph-nav-mb").style.height = "0%";
}
