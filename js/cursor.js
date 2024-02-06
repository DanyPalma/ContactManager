const bigBall = document.getElementById("bigBall");
        const smallBall = document.getElementById("smallBall");
        const $hoverables = document.querySelectorAll('.hoverable');

        // Listeners
        document.body.addEventListener('mousemove', onMouseMove);
        for (let i = 0; i < $hoverables.length; i++) {
            $hoverables[i].addEventListener('mouseenter', onMouseHover);
            $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
          }

        // Move the cursor
        function onMouseMove(e) {
        TweenMax.to(bigBall, .4, {
            x: e.pageX - 15,
            y: e.pageY - 15
        })
        TweenMax.to(smallBall, .1, {
            x: e.pageX - 5,
            y: e.pageY - 7
        })
        }

                // Hover an element
        function onMouseHover() {
            TweenMax.to(bigBall, .3, {
            scale: 4
            })
        }
        function onMouseHoverOut() {
            TweenMax.to(bigBall, .3, {
            scale: 1
            })
        }