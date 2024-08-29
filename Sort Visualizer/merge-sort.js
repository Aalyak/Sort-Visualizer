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

    async function mergeSort(arr, l, r) {
        if (l >= r) return;

        const m = l + Math.floor((r - l) / 2);

        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    }

    async function merge(arr, l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;

        const L = arr.slice(l, l + n1);
        const R = arr.slice(m + 1, m + 1 + n2);

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
            drawData([k, k + 1]);
            await new Promise(resolve => setTimeout(resolve, 1000 / speed));
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            drawData([k]);
            await new Promise(resolve => setTimeout(resolve, 1000 / speed));
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            drawData([k]);
            await new Promise(resolve => setTimeout(resolve, 1000 / speed));
        }
    }

    startButton.addEventListener('click', async () => {
        if (!isRunning) {
            isRunning = true;
            await mergeSort(data, 0, data.length - 1);
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
