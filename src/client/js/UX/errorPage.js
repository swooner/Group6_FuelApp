export const pageTilt = function () {
    const background = document.querySelector('.errorBackground');
    const errorCode = document.querySelector('.spaceErrorCode');
    if (background || errorCode) {
        background.addEventListener('mousemove', (e) => {
            let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 20;
            errorCode.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
        });
    }
};

pageTilt();
