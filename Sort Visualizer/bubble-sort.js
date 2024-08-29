document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');
    const speedControl = document.getElementById('speedControl');
    const speedValue = document.getElementById('speedValue'); // Speed value display element
    const canvas = document.getElementById('visualizerCanvas');
    const ctx = canvas.getContext('2d');

    // Initialize visualization canvas
    canvas.width = window.innerWidth * 0.8;
    canvas.height = 500;

    let data = Array.from({ length: 50 }, () => Math.floor(Math.random() * canvas.height));
    let animationFrameId;
    let isRunning = false;
    let speed = 50;

    function drawData(pointers = []) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = canvas.width / data.length;

        data.forEach((value, index) => {
            ctx.fillStyle = pointers.includes(index) ? 'red' : 'purple'; // Highlight pointer
            ctx.fillRect(index * barWidth, canvas.height - value, barWidth, value);
        });
    }

    function bubbleSort() {
        if (isRunning) return;

        isRunning = true;
        let i = 0;
        let j = 0;

        function animate() {
            if (i < data.length) {
                if (j < data.length - i - 1) {
                    if (data[j] > data[j + 1]) {
                        [data[j], data[j + 1]] = [data[j + 1], data[j]];
                        drawData([j, j + 1]);
                    }
                    j++;
                } else {
                    j = 0;
                    i++;
                }
                drawData([j, j + 1]);
                animationFrameId = requestAnimationFrame(animate);
            } else {
                isRunning = false;
                cancelAnimationFrame(animationFrameId);
            }
        }
        animate();
    }

    startButton.addEventListener('click', () => {
        if (!isRunning) {
            bubbleSort();
        }
    });

    pauseButton.addEventListener('click', () => {
        if (isRunning) {
            cancelAnimationFrame(animationFrameId);
            isRunning = false;
        }
    });

    resetButton.addEventListener('click', () => {
        data = Array.from({ length: 50 }, () => Math.floor(Math.random() * canvas.height));
        drawData();
    });

    speedControl.addEventListener('input', () => {
        speed = speedControl.value;
        speedValue.textContent = speed; // Update the displayed speed value
        if (isRunning) {
            cancelAnimationFrame(animationFrameId);
            bubbleSort();
        }
    });

    drawData();
});
