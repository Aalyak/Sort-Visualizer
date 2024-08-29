document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');
    const speedControl = document.getElementById('speedControl');
    const speedValue = document.getElementById('speedValue');
    const canvas = document.getElementById('visualizerCanvas');
    const ctx = canvas.getContext('2d');

    // Function to adjust canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = 500; // Fixed height for visualization
    }

    // Initialize visualization canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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

    function selectionSort() {
        if (isRunning) return;

        isRunning = true;
        let i = 0;
        let j = 0;

        function animate() {
            if (i < data.length - 1) {
                if (j < data.length) {
                    if (data[j] < data[i]) {
                        [data[j], data[i]] = [data[i], data[j]];
                    }
                    j++;
                } else {
                    i++;
                    j = i + 1;
                }
                drawData([i, j]);
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
            selectionSort();
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
            selectionSort();
        }
    });

    drawData();
});
