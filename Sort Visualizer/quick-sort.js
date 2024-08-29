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

    async function quickSort(arr, low = 0, high = arr.length - 1) {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSort(arr, low, pi - 1);
            await quickSort(arr, pi + 1, high);
        }
    }

    async function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                drawData([i, j, high]);
                await new Promise(resolve => setTimeout(resolve, 1000 / speed));
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        drawData([i + 1, high]);
        await new Promise(resolve => setTimeout(resolve, 1000 / speed));
        return i + 1;
    }

    startButton.addEventListener('click', async () => {
        if (!isRunning) {
            isRunning = true;
            await quickSort(data);
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
