function preventMotion(event){
    window.scrollTo(0, 0);
    event.preventDefault();
    event.stopPropagation();
}
window.addEventListener("scroll", preventMotion, false);
window.addEventListener("touchmove", preventMotion, false);

setTimeout(function() {
    window.removeEventListener("scroll", preventMotion, { passive: false });
    window.removeEventListener("touchmove", preventMotion, { passive: false });
}, 9500);

function loadingAnimation(){
    
    var tl = gsap.timeline();
    tl.from(".line h1",{
        y:150,
        stagger:0.25,
        duration:0.6,
        delay:0.5,
    })
    tl.from("#line-part1",{
        opacity:0,
        onStart:function(){
            var h5timer = document.querySelector("#line-part1 h5")
            var grow = 0
            setInterval(function(){
                if(grow<100){
                    h5timer.innerHTML = grow++
                }else{
                    h5timer.innerHTML = grow
                }
            },27)
        }
    })
    tl.to(".line h2",{
        animationName:"anime",
        opacity:1,
    })
    
    tl.to("#loader",{
        opacity:0,
        duration:0.02,
        delay:2.6,
    })
    // tl.from("#main",{
    //     display:"none",
    //     opacity:0,
    //     // y:1600,
    // })
    tl.from("#page1",{
        delay:0.3,
        y:1600,
        opacity:0,
        duration:0.5,
        ease:Power4

    })
    tl.to("#loader",{
        display:"none"
    })

    tl.from("#nav",{
        opacity:0
    })
    tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1",{
        y:100,
        stagger:0.2
    })
    tl.from("#hero1,#page2",{
     opacity:0
    },"-=1.2")
    tl.from("#page2",{
        y:1600,
    })
}

function cursorAnimation(){
    // document.addEventListener("mousemove",function(dets){
    //     gsap.to("#crsr",{
    //         left:dets.x,
    //         top:dets.y,
    //     });
    // });
    // Shery.mouseFollower({
    //     skew:true,
    //     ease:"cubic-bezier(0.23,1,0.320,1)",
    //     duration:1,
    // })
    const cursorOutline = document.querySelector("[data-cursor-outline]");
    window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;
      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 500, fill: "forwards" }
      );
    });
    Shery.makeMagnet("#nav-part2 h4");
    Shery.makeMagnet("#nav-part1 #menu");

    var videoContainer = document.querySelector("#video-container");
    var video = document.querySelector("#video-container video")
    videoContainer.addEventListener("mouseenter",function(){
        videoContainer.addEventListener("mousemove",function(dets){
            gsap.to("#crsr",{
                opacity:0
            })
            gsap.to("#video-cursor",{

                left:dets.x - 570,
                y:dets.y - 300,
            })
        })
    })
    videoContainer.addEventListener("mouseleave",function(){
        gsap.to("#crsr",{
            opacity:1
        })
        gsap.to("#video-cursor",{
            left:80+"%",
            top:-10+"%",
        })
    })
    var flag = 0;
    videoContainer.addEventListener("click",function(){
        if(!flag){
            video.play();
            video.style.opacity=1;
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`
            gsap.to("#video-cursor",{
                scale:0.5
            })
            flag=1
        }else{
            video.pause();
            video.style.opacity=0;
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`
            gsap.to("#video-cursor",{
                scale:1
            })
            flag=0
        }
        
    })
}

function mobileCursorAnimation(){
    const cursorOutline = document.querySelector("[data-cursor-outline]");
    cursorOutline.style.display = "none";

    var videoContainer = document.querySelector("#video-container");
    var video = document.querySelector("#video-container video")
    
    var flag = 0;
    videoContainer.addEventListener("click",function(){
        if(!flag){
            video.play();
            video.style.opacity=1;
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`
            gsap.to("#video-cursor",{
                scale:0.5
            })
            flag=1
        }else{
            video.pause();
            video.style.opacity=0;
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`
            gsap.to("#video-cursor",{
                scale:1
            })
            flag=0
        }
        
    })
}

function locomotiveAnimation(){
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
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

function sheryJsAnimation(){
    Shery.imageEffect(".image-div", {
        style: 2,
        config: { "resolutionXY": { "value": 100 }, "distortion": { "value": true }, "mode": { "value": -10 }, "mousemove": { "value": 3 }, "modeA": { "value": 1 }, "modeN": { "value": 3 }, "speed": { "value": 1, "range": [-500, 500], "rangep": [-10, 10] }, "frequency": { "value": 50, "range": [-800, 800], "rangep": [-50, 50] }, "angle": { "value": 0.5, "range": [0, 3.141592653589793] }, "waveFactor": { "value": 1.4, "range": [-3, 3] }, "color": { "value": 10212607 }, "pixelStrength": { "value": 3, "range": [-20, 100], "rangep": [-20, 20] }, "quality": { "value": 5, "range": [0, 10] }, "contrast": { "value": 1, "range": [-25, 25] }, "brightness": { "value": 1, "range": [-1, 25] }, "colorExposer": { "value": 0.18, "range": [-5, 5] }, "strength": { "value": 0.2, "range": [-40, 40], "rangep": [-5, 5] }, "exposer": { "value": 8, "range": [-100, 100] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.7666557722625823 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": false }, "maskVal": { "value": 1, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.76, "range": [0, 10] }, "metaball": { "value": 0.6, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.37, "range": [0, 2] }, "noise_scale": { "value": 7.63, "range": [0, 100] }, "a": { "value": 1.37, "range": [0, 30] }, "b": { "value": -0.91, "range": [-1, 1] } },
        gooey: true,
    });
}

function flagAnimation(){
    document.addEventListener("mousemove",function(dets){
        gsap.to("#flag",{
            x:dets.x,
            y:dets.y,
        })
    })
    document.querySelector("#hero3").addEventListener("mouseenter",function(){
        gsap.to("#flag",{
            opacity:1,
            display:"initial"
        })
    })
    document.querySelector("#hero3").addEventListener("mouseleave",function(){
        gsap.to("#flag",{
            opacity:0,
            display:"none",
        })
    })
    
}

function footerAnimation() {
  
    var clutter = ""
    var clutter2 = ""
    document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
      clutter += `<span>${elem}</span>`
    })
    document.querySelector("#footer h1").innerHTML = clutter
    document.querySelector("#footer h2").textContent.split("").forEach(function (elem) {
      clutter2 += `<span>${elem}</span>`
    })
    document.querySelector("#footer h2").innerHTML = clutter2
  
  
    document.querySelector("#footer-text").addEventListener("mouseenter", function () {
      gsap.to("#footer h1 span", {
        opacity: 0,
        stagger: 0.05
      })
      gsap.to("#footer h2 span", {
        delay: 0.35,
        opacity: 1,
        stagger: 0.1
      })
    })
    document.querySelector("#footer-text").addEventListener("mouseleave", function () {
      gsap.to("#footer h1 span", {
        opacity: 1,
        stagger: 0.1,
        delay: 0.35,
  
      })
      gsap.to("#footer h2 span", {
        opacity: 0,
        stagger: 0.05
      })
    })

    
}


function ScrollTriggerAnimation(){
    var tl = gsap.timeline();

    tl.from("#page3 h1", {
        opacity: 0,
        y: 100,
        delay:1,
        duration:0.3,
        scrollTrigger: {
            trigger: "#page3 h1",
            scroller: "#main",
            // markers: true,
            start: "top 80%",
            end: "top 70%",
            scrub: 3,
        },
    });
    tl.to("#page3 .underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#page3 .underline",
            scroller: "#main",
            // markers: true,
            start: "top 75%",
            end: "top 70%",
            scrub: 3,
        }
    });
    tl.to("#item1 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item1 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 90%",
            end: "top 85%",
            scrub: 3,
        }
    });
    tl.to("#item2 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item2 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 80%",
            end: "top 75%",
            scrub: 3,
        }
    });
    tl.to("#item3 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item3 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 95%",
            end: "top 90%",
            scrub: 3,
        }
    });
    tl.to("#item4 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item4 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 95%",
            end: "top 90%",
            scrub: 3,
        }
    });
    tl.to("#item5 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item5 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 95%",
            end: "top 90%",
            scrub: 3,
        }
    });
    tl.to("#item6 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item6 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 95%",
            end: "top 90%",
            scrub: 3,
        }
    });
    tl.to("#page4-content .underline1", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#page4-content .underline1",
            scroller: "#main",
            // markers: true,
            start: "top 95%",
            end: "top 90%",
            scrub: 3,
        }
    });
    tl.to("#page4-content .underline2", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#page4-content .underline2",
            scroller: "#main",
            // markers: true,
            start: "top 95%",
            end: "top 90%",
            scrub: 3,
        }
    });
    tl.to("#footer .underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#footer .underline",
            scroller: "#main",
            // markers: true,
            start: "top 95%",
            end: "top 90%",
            scrub: 3,
        }
    });
}

function mobileScrollTriggerAnimation(){
    var tl = gsap.timeline();

    tl.from("#page3 h1", {
        opacity: 0,
        y: 100,
        delay:0.8,
        duration:0.3,
        scrollTrigger: {
            trigger: "#page3 h1",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        },
    });
    tl.from("#page4-content h1", {
        opacity: 0,
        y: 100,
        delay:0.8,
        duration:0.3,
        scrollTrigger: {
            trigger: "#page4-content h1",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        },
    });
    tl.from("#footer h1", {
        opacity: 0,
        y: 100,
        delay:0.8,
        duration:0.3,
        scrollTrigger: {
            trigger: "#footer h1",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        },
    });
    tl.to("#page3 .underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#page3 .underline",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        }
    });
    tl.to("#item1 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item1 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        }
    });
    tl.to("#item2 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item2 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        }
    });
    tl.to("#item3 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item3 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        }
    });
    tl.to("#item4 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item4 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        }
    });
    tl.to("#item5 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item5 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        }
    });
    tl.to("#item6 .item-underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#item6 .item-underline",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        }
    });
    tl.to("#page4-content .underline1", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#page4-content .underline1",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        }
    });
    tl.to("#page4-content .underline2", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#page4-content .underline2",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        }
    });
    tl.to("#footer .underline", {
        "--width": "100%",
        scrollTrigger: {
            trigger: "#footer .underline",
            scroller: "#main",
            // markers: true,
            start: "top 105%",
            end: "top 100%",
            scrub: 3,
        }
    });
}

loadingAnimation(); 
locomotiveAnimation();
sheryJsAnimation();
footerAnimation()



if (!/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    cursorAnimation();
    flagAnimation();
    ScrollTriggerAnimation();
}
else{
    const cursorOutline = document.querySelector("#crsr");
    cursorOutline.style.display="none"
    window.addEventListener("load", function() {
        window.scrollTo(0, 0);
    });
    window.addEventListener("beforeunload", function() {
        window.scrollTo(0, 0);
    });
    

    mobileCursorAnimation()
    mobileScrollTriggerAnimation()
}





