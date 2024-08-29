document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');
    const speedControl = document.getElementById('speedControl');
    const speedValue = document.getElementById('speedValue');
    const canvas = document.getElementById('visualizerCanvas');
    const ctx = canvas.getContext('2d');

    // Initialize visualization canvas
    canvas.width = window.innerWidth * 0.8;
    canvas.height = 400;

    let data = Array.from({ length: 50 }, () => Math.floor(Math.random() * canvas.height));
    let animationFrameId;
    let isRunning = false;
    let speed = 50;

    function drawData(pointers = []) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = canvas.width / data.length;

        data.forEach((value, index) => {
            ctx.fillStyle = pointers.includes(index) ? 'red' : 'purple';
            ctx.fillRect(index * barWidth, canvas.height - value, barWidth, value);
        });
    }

    async function insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
                drawData([j + 1, i]);
                await new Promise(resolve => setTimeout(resolve, 1000 / speed));
            }
            arr[j + 1] = key;
            drawData([j + 1, i]);
            await new Promise(resolve => setTimeout(resolve, 1000 / speed));
        }
    }

    startButton.addEventListener('click', async () => {
        if (!isRunning) {
            isRunning = true;
            await insertionSort(data);
            isRunning = false;
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
        speedValue.textContent = speed;
    });

    drawData();
});
