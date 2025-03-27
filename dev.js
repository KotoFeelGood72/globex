const { spawn } = require('child_process');
const path = require('path');

// Запуск Next.js
const nextDev = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
});

// Запуск ngrok с правильным путём
const ngrok = spawn('D:/WIND/gobex2025/gl/ngrok/ngrok.exe', [
    'http',
    '--domain=prompt-urchin-friendly.ngrok-free.app',
    '4000'
], {
    stdio: 'inherit',
    shell: true
});

// Обработка завершения процессов
nextDev.on('close', (code) => {
    console.log(`Next.js process exited with code ${code}`);
    ngrok.kill();
    process.exit(code);
});

ngrok.on('close', (code) => {
    console.log(`ngrok process exited with code ${code}`);
    nextDev.kill();
    process.exit(code);
});

// Обработка SIGINT (Ctrl+C)
process.on('SIGINT', () => {
    nextDev.kill();
    ngrok.kill();
    process.exit();
});
