const sticky = function (elm, distance, footer = false) {
  const el = elm
  if (!window.matchMedia("(max-width: 768px)").matches) { // If media query matches

    window.onscroll = function (e) {

      let marginTop = parseFloat(window.getComputedStyle(el).getPropertyValue("margin-top"))
      let marginBottom = parseFloat(window.getComputedStyle(el).getPropertyValue("margin-bottom"))
      let totalMargin = marginTop + marginBottom
      let footerHeight = 0;
      if (footer !== false) {
        footerHeight = footer.scrollHeight + distance
      }
      const coord = el.getBoundingClientRect()
      if (el.scrollHeight < window.innerHeight) {
        let isPositionFixed = (window.getComputedStyle(el).getPropertyValue("position"));
        console.log(el.offsetTop - window.scrollY)
        if (el.offsetTop - window.scrollY <= -50) {

          el.style.position = "fixed"
          el.style.top = distance + "px"
          el.style.width = coord.width + "px"
          el.style.left = coord.left + "px"
          el.classList.add("stick-bar")

        }
        if (el.offsetTop - window.scrollY >= -50) {
          el.style.position = "static"
          el.style.top = "50px"
          el.style.width = "auto"
          el.style.left = "unset"
          el.classList.remove("stick-bar")

        }
        if ((window.scrollY + totalMargin) >= document.body.scrollHeight - footerHeight - el.scrollHeight) {


          el.style.top = -((window.scrollY + totalMargin) - (document.body.scrollHeight - footerHeight - el.scrollHeight)) + "px"

        }

      }

    }
  }

};
