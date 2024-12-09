console.log(typeof DeviceOrientationEvent.requestPermission);

const  initializeMotion = () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // דפדפנים שדורשים הרשאה
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    addMotionListeners();
                } else {
                    console.log("Permission denied for motion sensors.");
                }
            })
            .catch(error => {
                console.error("Error requesting permission:", error);
            });
    } else {
        // דפדפנים שאינם דורשים הרשאה
        addMotionListeners();
    }
}

function addMotionListeners() {
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function (event) {
            tilt([event.beta, event.gamma]);
        }, true);
    } else if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function (event) {
            tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
        }, true);
    } else {
        console.log("No motion sensors supported.");
    }
}

function tilt([x, y]) {
    const element = document.getElementById('box');
    if (!element) return;

    const sensitivity = 5;
    const offsetX = x * sensitivity;
    const offsetY = y * sensitivity;

    const clampedX = Math.max(0, Math.min(window.innerWidth - element.offsetWidth, offsetX));
    const clampedY = Math.max(0, Math.min(window.innerHeight - element.offsetHeight, offsetY));

    element.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
}

// אתחול הקוד
document.addEventListener('DOMContentLoaded', initializeMotion);

window.addEventListener('deviceorientation', function(event) {
    console.log("Alpha:", event.alpha, "Beta:", event.beta, "Gamma:", event.gamma);
});

