window.onload = () => {
  addNavBarElement();
  addNavBarCss();
};

function addNavBarElement() {
  document.getElementById("nav-top").innerHTML = `
    <div id="nav-mobile">
        <span onclick="openNav()">&#9776; &nbsp; Canime</span>
        <div id="ph-nav-mb" class="nav-mb-overlay">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <div class="nav-mb-overlay-content">
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
        </div>
    </div>

    <div id="nav-desktop">
        <div class="ph-btn nav-signup">
            <div class="ph-btn-ctn">
                <a href="../signup/signup.html" class="btn btn-efct-cln btn-outline" data-sm-link-text="CLICK" target="_blank"><span>HOVER</span></a>
            </div>
        </div>
        <div class="ph-btn nav-page">
            <div class="ph-btn-ctn">
                <a href="../signup/signup.html" class="btn btn-efct-cln" data-sm-link-text="CLICK" target="_blank"><span>HOVER</span></a>
            </div>
            <div class="ph-btn-ctn">
                <a href="../signup/signup.html" class="btn btn-efct-cln" data-sm-link-text="CLICK" target="_blank">
                    <span>HOVER</span>
                </a>
            </div>
            <div class="ph-btn-ctn">
                <a href="../signup/signup.html" class="btn btn-efct-cln" data-sm-link-text="CLICK" target="_blank"><span>HOVER</span></a>
            </div>
        </div>
        <div class="ph-btn nav-signup">
            <div class="ph-btn-ctn">
                <a href="../signup/signup.html" class="btn btn-efct-cln btn-outline" data-sm-link-text="CLICK">
                    <span>HOVER</span>
                </a>
            </div>
        </div>
    </div>
    `;
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
