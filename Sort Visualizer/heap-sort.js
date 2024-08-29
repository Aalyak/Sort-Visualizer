document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');
    const speedControl = document.getElementById('speedControl');
    const speedValue = document.getElementById('speedValue');
    const canvas = document.getElementById('visualizerCanvas');
    const ctx = canvas.getContext('2d');

    let data = Array.from({ length: 50 }, () => Math.floor(Math.random() * 400 + 50));
    let speed = 50;
    let isRunning = false;
    let isPaused = false;
    let interval;

    function drawData(activeIndices = []) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = canvas.width / data.length;
        data.forEach((value, index) => {
            ctx.fillStyle = activeIndices.includes(index) ? 'red' : '#800080'; // Purple color for bars
            ctx.fillRect(index * barWidth, canvas.height - value, barWidth - 2, value);
        });
    }

    function heapify(n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && data[left] > data[largest]) {
            largest = left;
        }

        if (right < n && data[right] > data[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [data[i], data[largest]] = [data[largest], data[i]];
            drawData([i, largest]);
            heapify(n, largest);
        }
    }

    function heapSort() {
        if (isRunning || isPaused) return;

        isRunning = true;
        let n = data.length;
        let i = Math.floor(n / 2) - 1;

        interval = setInterval(() => {
            if (i >= 0) {
                heapify(n, i);
                i--;
            } else if (n > 1) {
                [data[0], data[n - 1]] = [data[n - 1], data[0]];
                drawData([0, n - 1]);
                n--;
                heapify(n, 0);
            } else {
                clearInterval(interval);
                isRunning = false;
            }
        }, 1000 / speed);
    }

    function reset() {
        clearInterval(interval);
        data = Array.from({ length: 50 }, () => Math.floor(Math.random() * 400 + 50));
        drawData();
        isRunning = false;
        isPaused = false;
    }

    startButton.addEventListener('click', () => {
        if (!isRunning && !isPaused) {
            heapSort();
        } else if (isPaused) {
            isPaused = false;
            heapSort();
        }
    });

    pauseButton.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(interval);
            isPaused = true;
        }
    });

    resetButton.addEventListener('click', reset);

    speedControl.addEventListener('input', () => {
        speed = speedControl.value;
        speedValue.textContent = speed;
    });

    drawData();
});
