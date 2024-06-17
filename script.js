function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  console.log("loco function loaded correctly.");

}
loco();


function animationP2() {
  var clutter = "";

  document.querySelector("#page2>h1").textContent.split("").forEach(function (dets) {
    clutter += `<span>${dets}</span>`

    document.querySelector("#page2>h1").innerHTML = clutter;
  })
  gsap.to("#page2>h1>span", {
    scrollTrigger: {
      trigger: `#page2>h1>span`,
      start: `top bottom`,
      end: `bottom top`,
      scroller: `#main`,
      scrub: .1,

    },
    stagger: .2,
    color: `#ffffff`
  })
}

animationP2();

function canvas() {
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
  ./img/frames00007.png
  ./img/frames00010.png
  ./img/frames00013.png
  ./img/frames00016.png
  ./img/frames00019.png
  ./img/frames00022.png
  ./img/frames00025.png
  ./img/frames00028.png
  ./img/frames00031.png
  ./img/frames00034.png
  ./img/frames00037.png
  ./img/frames00040.png
  ./img/frames00043.png
  ./img/frames00046.png
  ./img/frames00049.png
  ./img/frames00052.png
  ./img/frames00055.png
  ./img/frames00058.png
  ./img/frames00061.png
  ./img/frames00064.png
  ./img/frames00067.png
  ./img/frames00070.png
  ./img/frames00073.png
  ./img/frames00076.png
  ./img/frames00079.png
  ./img/frames00082.png
  ./img/frames00085.png
  ./img/frames00088.png
  ./img/frames00091.png
  ./img/frames00094.png
  ./img/frames00097.png
  ./img/frames00100.png
  ./img/frames00103.png
  ./img/frames00106.png
  ./img/frames00109.png
  ./img/frames00112.png
  ./img/frames00115.png
  ./img/frames00118.png
  ./img/frames00121.png
  ./img/frames00124.png
  ./img/frames00127.png
  ./img/frames00130.png
  ./img/frames00133.png
  ./img/frames00136.png
  ./img/frames00139.png
  ./img/frames00142.png
  ./img/frames00145.png
  ./img/frames00148.png
  ./img/frames00151.png
  ./img/frames00154.png
  ./img/frames00157.png
  ./img/frames00160.png
  ./img/frames00163.png
  ./img/frames00166.png
  ./img/frames00169.png
  ./img/frames00172.png
  ./img/frames00175.png
  ./img/frames00178.png
  ./img/frames00181.png
  ./img/frames00184.png
  ./img/frames00187.png
  ./img/frames00190.png
  ./img/frames00193.png
  ./img/frames00196.png
  ./img/frames00199.png
  ./img/frames00202.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page3`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas();
function animationP4() {
  var clutterp4 = "";

  document.querySelector("#page4>h1").textContent.split("").forEach(function (dets) {
    clutterp4 += `<span>${dets}</span>`

    document.querySelector("#page4>h1").innerHTML = clutterp4;
  })
  gsap.to("#page4>h1>span", {
    scrollTrigger: {
      trigger: `#page4>h1>span`,
      start: `top bottom`,
      end: `bottom top`,
      scroller: `#main`,
      scrub: .1,

    },
    stagger: .2,
    color: `#ffffff`
  })
}
animationP4();

function animationP6() {
  var clutterp6 = "";

  document.querySelector("#page6>h1").textContent.split("").forEach(function (dets) {
    clutterp6 += `<span>${dets}</span>`

    document.querySelector("#page6>h1").innerHTML = clutterp6;
  })
  gsap.to("#page6>h1>span", {
    scrollTrigger: {
      trigger: `#page6>h1>span`,
      start: `top bottom`,
      end: `bottom top`,
      scroller: `#main`,
      scrub: .1,

    },
    stagger: .2,
    color: `#ffffff`
  })
}
animationP6()
function canvas5() {
  const canvas = document.querySelector("#page5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
  ./img/bridges00004.png
./img/bridges00007.png
./img/bridges00010.png
./img/bridges00013.png
./img/bridges00016.png
./img/bridges00019.png
./img/bridges00022.png
./img/bridges00025.png
./img/bridges00028.png
./img/bridges00031.png
./img/bridges00034.png
./img/bridges00037.png
./img/bridges00040.png
./img/bridges00043.png
./img/bridges00046.png
./img/bridges00049.png
./img/bridges00052.png
./img/bridges00055.png
./img/bridges00058.png
./img/bridges00061.png
./img/bridges00064.png
./img/bridges00067.png
./img/bridges00070.png
./img/bridges00073.png
./img/bridges00076.png
./img/bridges00079.png
./img/bridges00082.png
./img/bridges00085.png
./img/bridges00088.png
./img/bridges00091.png
./img/bridges00094.png
./img/bridges00097.png
./img/bridges00100.png
./img/bridges00103.png
./img/bridges00106.png
./img/bridges00109.png
./img/bridges00112.png
./img/bridges00115.png
./img/bridges00118.png
./img/bridges00121.png
./img/bridges00124.png
./img/bridges00127.png
./img/bridges00130.png
./img/bridges00133.png
./img/bridges00136.png
./img/bridges00139.png
./img/bridges00142.png
./img/bridges00145.png
./img/bridges00148.png
./img/bridges00151.png
./img/bridges00154.png
./img/bridges00157.png
./img/bridges00160.png
./img/bridges00163.png
`;
    return data.split("\n")[index];
  }

  const frameCount = 54;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page5`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page5",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas5()
function canvas7() {
  const canvas = document.querySelector("#page7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
    ./img/1.webp
    ./img/2.webp
    ./img/3.webp
    ./img/4.webp
    ./img/5.webp
    ./img/6.webp
    ./img/7.webp
    ./img/8.webp
    ./img/9.webp
    ./img/10.webp
    ./img/11.webp
    ./img/12.webp
    ./img/13.webp
    ./img/14.webp
    ./img/15.webp
    ./img/16.webp
    ./img/17.webp
    ./img/18.webp
    ./img/19.webp
    ./img/20.webp
    ./img/21.webp
    ./img/22.webp
    ./img/23.webp
    ./img/24.webp
    ./img/25.webp
    ./img/26.webp
    ./img/27.webp
    ./img/28.webp
    ./img/29.webp
    ./img/30.webp
    ./img/31.webp
    ./img/32.webp
    ./img/33.webp
    ./img/34.webp
    ./img/35.webp
    ./img/36.webp
    ./img/37.webp
    ./img/38.webp
    ./img/39.webp
    ./img/40.webp
    ./img/41.webp
    ./img/42.webp
    ./img/43.webp
    ./img/44.webp
    ./img/45.webp
    ./img/46.webp
    ./img/47.webp
    ./img/48.webp
    ./img/49.webp
    ./img/50.webp
    ./img/51.webp
    ./img/52.webp
    ./img/53.webp
    ./img/54.webp
    ./img/55.webp
    ./img/56.webp
    ./img/57.webp
    ./img/58.webp
    ./img/59.webp
    ./img/60.webp
    ./img/61.webp
    ./img/62.webp
    ./img/63.webp
    ./img/64.webp
    ./img/65.webp
    ./img/66.webp
    ./img/67.webp
    ./img/68.webp
    ./img/69.webp
    ./img/70.webp
    ./img/71.webp
    ./img/72.webp
    ./img/73.webp
    ./img/74.webp
    ./img/75.webp
    ./img/76.webp
    ./img/77.webp
    ./img/78.webp
    ./img/79.webp
    ./img/80.webp
    ./img/81.webp
    ./img/82.webp
    ./img/83.webp
    ./img/84.webp
    ./img/85.webp
    ./img/86.webp
    ./img/87.webp
    ./img/88.webp
    ./img/89.webp
    ./img/90.webp
    ./img/91.webp
    ./img/92.webp
    ./img/93.webp
    ./img/94.webp
    ./img/95.webp
    ./img/96.webp
    ./img/97.webp
    ./img/98.webp
    ./img/99.webp
    ./img/100.webp
    ./img/101.webp
    ./img/102.webp
    ./img/103.webp
    ./img/104.webp
    ./img/105.webp
    ./img/106.webp
    ./img/107.webp
    ./img/108.webp
    ./img/109.webp
    ./img/110.webp
    ./img/111.webp
    ./img/112.webp
    ./img/113.webp
    ./img/114.webp
    ./img/115.webp
    ./img/116.webp
    ./img/117.webp
    ./img/118.webp
    ./img/119.webp
    ./img/120.webp
    ./img/121.webp
    ./img/122.webp
    ./img/123.webp
    ./img/124.webp
    ./img/125.webp
    ./img/126.webp
    ./img/127.webp
    ./img/128.webp
    ./img/129.webp
    ./img/130.webp
    ./img/131.webp
    ./img/132.webp
    ./img/133.webp
    ./img/134.webp

`;
    return data.split("\n")[index];
  }

  const frameCount = 135;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page7`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas7()

gsap.to(".page7-cir", {
  scrollTrigger: {
    trigger: `.page7-cir`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,

  },
  scale:1.5,
})
gsap.to(".page7-inner-cir", {
  scrollTrigger: {
    trigger: `.page7-inner-cir`,
    start: `top top`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,

  },
  scale:1.1,
  backgroundColor:`#0740db83`,
})