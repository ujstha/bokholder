(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[90],{471:function(t,e,n){"use strict";n.r(e),n.d(e,"mdTransitionAnimation",(function(){return r}));n(93),n(20),n(51);var a=n(43),i=(n(71),n(468)),r=function(t,e){var n="back"===e.direction,r=e.enteringEl,o=e.leavingEl,c=Object(i.b)(r),s=c.querySelector("ion-toolbar"),b=Object(a.a)();if(b.addElement(c).fill("both").beforeRemoveClass("ion-page-invisible"),n?b.duration(e.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):b.duration(e.duration||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY(40px)","translateY(0px)").fromTo("opacity",.01,1),s){var d=Object(a.a)();d.addElement(s),b.addAnimation(d)}if(o&&n){b.duration(e.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)");var l=Object(a.a)();l.addElement(Object(i.b)(o)).afterStyles({display:"none"}).fromTo("transform","translateY(0px)","translateY(40px)").fromTo("opacity",1,0),b.addAnimation(l)}return b}}}]);
//# sourceMappingURL=90.69352dce.chunk.js.map