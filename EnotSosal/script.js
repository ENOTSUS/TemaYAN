let altPressed = false;
let volumeDisplay;

document.addEventListener('keydown', (event) => {
    if (event.key === 'Alt') {
        if (!altPressed) {
            altPressed = true;
            executeScript();
        }
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Alt') {
        altPressed = false;
        if (volumeDisplay) {
            volumeDisplay.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            volumeDisplay.style.transform = 'scale(0)';
            volumeDisplay.style.opacity = '0';
            setTimeout(() => {
                if (volumeDisplay) {
                    volumeDisplay.remove();
                    volumeDisplay = null;
                }
            }, 300);
        }
    }
});

function executeScript(volumeCon) {
    const existingVolumeDisplay = document.querySelector('.custom-volume-display');
    if (!existingVolumeDisplay) {
        volumeCon.forEach(control => {
            console.log('Найден элемент:', control);
            if (control.getAttribute('aria-label') === 'Управление громкостью' && control.getAttribute('max') === '1' && control.getAttribute('step') === '0.01') {
                console.log('Элемент для управления громкостью найден:', control);

                const volumeDisplay = document.createElement('div');
                volumeDisplay.style.position = 'fixed';
                volumeDisplay.className = 'custom-volume-display';
                volumeDisplay.style.bottom = '0%';
                volumeDisplay.style.right = '0%';
                volumeDisplay.style.transform = 'translate(-15%, -15%)';
                volumeDisplay.style.width = '150px';
                volumeDisplay.style.height = '150px';
                volumeDisplay.style.borderRadius = '130px';
                volumeDisplay.style.background = 'conic-gradient(from 124.01deg at 100% 0%, #66FFCC 0deg, rgba(102, 255, 204, 0.44) 0deg, rgb(204, 204, 204) 360deg, rgb(204, 204, 204) 360deg)';
                volumeDisplay.style.display = 'flex';
                volumeDisplay.style.alignItems = 'center';
                volumeDisplay.style.justifyContent = 'center';
                volumeDisplay.style.fontSize = '24px';
                volumeDisplay.style.color = 'white';
                volumeDisplay.style.opacity = '0';
                volumeDisplay.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                volumeDisplay.style.zIndex = '90000';

                const volumeInnerDisplay = document.createElement('div');
                volumeInnerDisplay.style.background = 'linear-gradient(180deg, rgb(255 255 255 / 20%) 0%, rgb(14 14 14 / 30%) 100%), #101010';
                volumeInnerDisplay.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
                volumeInnerDisplay.style.height = '85%';
                volumeInnerDisplay.style.width = '85%';
                volumeInnerDisplay.style.borderRadius = '125px';
                volumeInnerDisplay.style.display = 'flex';
                volumeInnerDisplay.style.alignItems = 'center';
                volumeInnerDisplay.style.justifyContent = 'center';
                volumeInnerDisplay.style.fontWeight = '100';
                volumeInnerDisplay.style.flexDirection = 'column';
                volumeInnerDisplay.style.paddingTop = '27px';

                const volumePercentage = document.createElement('span');
                volumePercentage.style.fontSize = '45px';

                const volumeLabel = document.createElement('span');
                volumeLabel.style.fontSize = 'medium';
                volumeLabel.style.fontWeight = '600';
                volumeLabel.textContent = 'volume';

                volumeInnerDisplay.appendChild(volumePercentage);
                volumeInnerDisplay.appendChild(volumeLabel);
                volumeDisplay.appendChild(volumeInnerDisplay);
                document.querySelector('[class*="DefaultLayout_root_applicationPreserveTitleBar"]').appendChild(volumeDisplay);

                document.addEventListener('wheel', (event) => {
                    if (event.altKey) {
                        event.preventDefault();
                        let currentValue = parseFloat(control.value);
                        const step = parseFloat(0.025);
                        const max = parseFloat(control.max || 1.001);
                        const min = parseFloat(control.min || 0.001);

                        if (event.deltaY < 0) {
                            currentValue = Math.min(currentValue + step, max);
                        } else {
                            currentValue = Math.max(currentValue - step, min);
                        }

                        console.log('Новое значение громкости:', currentValue);

                        control.value = currentValue;
                        control.style.backgroundSize = `${(currentValue / max) * 100}% 100%`;

                        const inputEvent = new Event('input', { bubbles: true });
                        control.dispatchEvent(inputEvent);

                        const percentage = Math.round(currentValue * 100);
                        volumePercentage.textContent = `${percentage}`;
                        volumeDisplay.style.background = `conic-gradient(from 124.01deg at 50% 50%, var(--ym-logo-color-primary-variant) 0deg, var(--ym-logo-color-primary-variant) ${percentage * 3.6}deg, rgb(56, 56, 56) ${percentage * 3.6}deg, rgba(102, 255, 204, 0) 360deg)`;
                        volumeDisplay.style.scale = '1'
                        volumeDisplay.style.opacity = '1';

                        clearTimeout(volumeDisplay._timeout);
                        volumeDisplay._timeout = setTimeout(() => {
                            volumeDisplay.style.scale = '0'
                            volumeDisplay.style.opacity = '0';
                        }, 1000);
                    }
                });
            }
        });
    }
}

setInterval(() => {
    const volumeControls = document.querySelectorAll('.JkKcxRVvjK7lcakkEliC.qpvIbN4_hF6CqK0bjCq7.SHvrm0VRiLVwGqJJjNO8');

    if (altPressed) {
        executeScript(volumeControls);
    }
}, 1000);

setInterval(() => {
    const imgElements = document.querySelectorAll('[class*="FullscreenPoster_cover"]');
    let imgBackground = "";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/400x400')) {
            imgBackground = img.src.replace('/400x400', '/1000x1000');
        }
    });

    if (imgBackground) {
        const targetElement = document.querySelector('.FullscreenPlayerDesktop_content__bl_7V');
        if (targetElement) {
            targetElement.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.95) 100%), url(${imgBackground}) center center / cover no-repeat`;
        }
    }

    const volumeControls = document.querySelectorAll('.JkKcxRVvjK7lcakkEliC.qpvIbN4_hF6CqK0bjCq7.SHvrm0VRiLVwGqJJjNO8');

    if (altPressed) {
        executeScript(volumeControls);
    }
}, 1000);
