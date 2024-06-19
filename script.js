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
  ./IMG_P3/frames00007.png
  ./IMG_P3/frames00010.png
  ./IMG_P3/frames00013.png
  ./IMG_P3/frames00016.png
  ./IMG_P3/frames00019.png
  ./IMG_P3/frames00022.png
  ./IMG_P3/frames00025.png
  ./IMG_P3/frames00028.png
  ./IMG_P3/frames00031.png
  ./IMG_P3/frames00034.png
  ./IMG_P3/frames00037.png
  ./IMG_P3/frames00040.png
  ./IMG_P3/frames00043.png
  ./IMG_P3/frames00046.png
  ./IMG_P3/frames00049.png
  ./IMG_P3/frames00052.png
  ./IMG_P3/frames00055.png
  ./IMG_P3/frames00058.png
  ./IMG_P3/frames00061.png
  ./IMG_P3/frames00064.png
  ./IMG_P3/frames00067.png
  ./IMG_P3/frames00070.png
  ./IMG_P3/frames00073.png
  ./IMG_P3/frames00076.png
  ./IMG_P3/frames00079.png
  ./IMG_P3/frames00082.png
  ./IMG_P3/frames00085.png
  ./IMG_P3/frames00088.png
  ./IMG_P3/frames00091.png
  ./IMG_P3/frames00094.png
  ./IMG_P3/frames00097.png
  ./IMG_P3/frames00100.png
  ./IMG_P3/frames00103.png
  ./IMG_P3/frames00106.png
  ./IMG_P3/frames00109.png
  ./IMG_P3/frames00112.png
  ./IMG_P3/frames00115.png
  ./IMG_P3/frames00118.png
  ./IMG_P3/frames00121.png
  ./IMG_P3/frames00124.png
  ./IMG_P3/frames00127.png
  ./IMG_P3/frames00130.png
  ./IMG_P3/frames00133.png
  ./IMG_P3/frames00136.png
  ./IMG_P3/frames00139.png
  ./IMG_P3/frames00142.png
  ./IMG_P3/frames00145.png
  ./IMG_P3/frames00148.png
  ./IMG_P3/frames00151.png
  ./IMG_P3/frames00154.png
  ./IMG_P3/frames00157.png
  ./IMG_P3/frames00160.png
  ./IMG_P3/frames00163.png
  ./IMG_P3/frames00166.png
  ./IMG_P3/frames00169.png
  ./IMG_P3/frames00172.png
  ./IMG_P3/frames00175.png
  ./IMG_P3/frames00178.png
  ./IMG_P3/frames00181.png
  ./IMG_P3/frames00184.png
  ./IMG_P3/frames00187.png
  ./IMG_P3/frames00190.png
  ./IMG_P3/frames00193.png
  ./IMG_P3/frames00196.png
  ./IMG_P3/frames00199.png
  ./IMG_P3/frames00202.png
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
./IMG_P5/bridges00004.png
./IMG_P5/bridges00007.png
./IMG_P5/bridges00010.png
./IMG_P5/bridges00013.png
./IMG_P5/bridges00016.png
./IMG_P5/bridges00019.png
./IMG_P5/bridges00022.png
./IMG_P5/bridges00025.png
./IMG_P5/bridges00028.png
./IMG_P5/bridges00031.png
./IMG_P5/bridges00034.png
./IMG_P5/bridges00037.png
./IMG_P5/bridges00040.png
./IMG_P5/bridges00043.png
./IMG_P5/bridges00046.png
./IMG_P5/bridges00049.png
./IMG_P5/bridges00052.png
./IMG_P5/bridges00055.png
./IMG_P5/bridges00058.png
./IMG_P5/bridges00061.png
./IMG_P5/bridges00064.png
./IMG_P5/bridges00067.png
./IMG_P5/bridges00070.png
./IMG_P5/bridges00073.png
./IMG_P5/bridges00076.png
./IMG_P5/bridges00079.png
./IMG_P5/bridges00082.png
./IMG_P5/bridges00085.png
./IMG_P5/bridges00088.png
./IMG_P5/bridges00091.png
./IMG_P5/bridges00094.png
./IMG_P5/bridges00097.png
./IMG_P5/bridges00100.png
./IMG_P5/bridges00103.png
./IMG_P5/bridges00106.png
./IMG_P5/bridges00109.png
./IMG_P5/bridges00112.png
./IMG_P5/bridges00115.png
./IMG_P5/bridges00118.png
./IMG_P5/bridges00121.png
./IMG_P5/bridges00124.png
./IMG_P5/bridges00127.png
./IMG_P5/bridges00130.png
./IMG_P5/bridges00133.png
./IMG_P5/bridges00136.png
./IMG_P5/bridges00139.png
./IMG_P5/bridges00142.png
./IMG_P5/bridges00145.png
./IMG_P5/bridges00148.png
./IMG_P5/bridges00151.png
./IMG_P5/bridges00154.png
./IMG_P5/bridges00157.png
./IMG_P5/bridges00160.png
./IMG_P5/bridges00163.png
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
    ./IMG_P7/1.webp
    ./IMG_P7/2.webp
    ./IMG_P7/3.webp
    ./IMG_P7/4.webp
    ./IMG_P7/5.webp
    ./IMG_P7/6.webp
    ./IMG_P7/7.webp
    ./IMG_P7/8.webp
    ./IMG_P7/9.webp
    ./IMG_P7/10.webp
    ./IMG_P7/11.webp
    ./IMG_P7/12.webp
    ./IMG_P7/13.webp
    ./IMG_P7/14.webp
    ./IMG_P7/15.webp
    ./IMG_P7/16.webp
    ./IMG_P7/17.webp
    ./IMG_P7/18.webp
    ./IMG_P7/19.webp
    ./IMG_P7/20.webp
    ./IMG_P7/21.webp
    ./IMG_P7/22.webp
    ./IMG_P7/23.webp
    ./IMG_P7/24.webp
    ./IMG_P7/25.webp
    ./IMG_P7/26.webp
    ./IMG_P7/27.webp
    ./IMG_P7/28.webp
    ./IMG_P7/29.webp
    ./IMG_P7/30.webp
    ./IMG_P7/31.webp
    ./IMG_P7/32.webp
    ./IMG_P7/33.webp
    ./IMG_P7/34.webp
    ./IMG_P7/35.webp
    ./IMG_P7/36.webp
    ./IMG_P7/37.webp
    ./IMG_P7/38.webp
    ./IMG_P7/39.webp
    ./IMG_P7/40.webp
    ./IMG_P7/41.webp
    ./IMG_P7/42.webp
    ./IMG_P7/43.webp
    ./IMG_P7/44.webp
    ./IMG_P7/45.webp
    ./IMG_P7/46.webp
    ./IMG_P7/47.webp
    ./IMG_P7/48.webp
    ./IMG_P7/49.webp
    ./IMG_P7/50.webp
    ./IMG_P7/51.webp
    ./IMG_P7/52.webp
    ./IMG_P7/53.webp
    ./IMG_P7/54.webp
    ./IMG_P7/55.webp
    ./IMG_P7/56.webp
    ./IMG_P7/57.webp
    ./IMG_P7/58.webp
    ./IMG_P7/59.webp
    ./IMG_P7/60.webp
    ./IMG_P7/61.webp
    ./IMG_P7/62.webp
    ./IMG_P7/63.webp
    ./IMG_P7/64.webp
    ./IMG_P7/65.webp
    ./IMG_P7/66.webp
    ./IMG_P7/67.webp
    ./IMG_P7/68.webp
    ./IMG_P7/69.webp
    ./IMG_P7/70.webp
    ./IMG_P7/71.webp
    ./IMG_P7/72.webp
    ./IMG_P7/73.webp
    ./IMG_P7/74.webp
    ./IMG_P7/75.webp
    ./IMG_P7/76.webp
    ./IMG_P7/77.webp
    ./IMG_P7/78.webp
    ./IMG_P7/79.webp
    ./IMG_P7/80.webp
    ./IMG_P7/81.webp
    ./IMG_P7/82.webp
    ./IMG_P7/83.webp
    ./IMG_P7/84.webp
    ./IMG_P7/85.webp
    ./IMG_P7/86.webp
    ./IMG_P7/87.webp
    ./IMG_P7/88.webp
    ./IMG_P7/89.webp
    ./IMG_P7/90.webp
    ./IMG_P7/91.webp
    ./IMG_P7/92.webp
    ./IMG_P7/93.webp
    ./IMG_P7/94.webp
    ./IMG_P7/95.webp
    ./IMG_P7/96.webp
    ./IMG_P7/97.webp
    ./IMG_P7/98.webp
    ./IMG_P7/99.webp
    ./IMG_P7/100.webp
    ./IMG_P7.1/101.webp
    ./IMG_P7.1/102.webp
    ./IMG_P7.1/103.webp
    ./IMG_P7.1/104.webp
    ./IMG_P7.1/105.webp
    ./IMG_P7.1/106.webp
    ./IMG_P7.1/107.webp
    ./IMG_P7.1/108.webp
    ./IMG_P7.1/109.webp
    ./IMG_P7.1/110.webp
    ./IMG_P7.1/111.webp
    ./IMG_P7.1/112.webp
    ./IMG_P7.1/113.webp
    ./IMG_P7.1/114.webp
    ./IMG_P7.1/115.webp
    ./IMG_P7.1/116.webp
    ./IMG_P7.1/117.webp
    ./IMG_P7.1/118.webp
    ./IMG_P7.1/119.webp
    ./IMG_P7.1/120.webp
    ./IMG_P7.1/121.webp
    ./IMG_P7.1/122.webp
    ./IMG_P7.1/123.webp
    ./IMG_P7.1/124.webp
    ./IMG_P7.1/125.webp
    ./IMG_P7.1/126.webp
    ./IMG_P7.1/127.webp
    ./IMG_P7.1/128.webp
    ./IMG_P7.1/129.webp
    ./IMG_P7.1/130.webp
    ./IMG_P7.1/131.webp
    ./IMG_P7.1/132.webp
    ./IMG_P7.1/133.webp
    ./IMG_P7.1/134.webp

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