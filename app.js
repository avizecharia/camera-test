if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (event) {
        tilt([event.beta, event.gamma]);
    }, true);
} else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function (event) {
        tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
    }, true);
} else if ('MozOrientation' in window) {
    window.addEventListener("MozOrientation", function (event) {
        tilt([event.orientation.x * 50, event.orientation.y * 50]);
    }, true);
} else {
    console.log("No orientation or motion sensors are supported by this device.");
}

function tilt([x, y]) {
    // מציאת האלמנט שברצונך להזיז (לדוגמה, div עם id 'box')
    const element = document.getElementById('box');
    if (!element) return;

    // הגדרת רגישות לתנועה
    const sensitivity = 5;

    // חישוב מיקום חדש על סמך ההטיה
    const offsetX = x * sensitivity;
    const offsetY = y * sensitivity;

    // הגנה על מיקום האלמנט בתוך גבולות המסך
    const clampedX = Math.max(0, Math.min(window.innerWidth - element.offsetWidth, offsetX));
    const clampedY = Math.max(0, Math.min(window.innerHeight - element.offsetHeight, offsetY));

    // הגדרת סגנון חדש (transform) להזזת האלמנט
    element.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
}
