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

setInterval(() => {
    const slides = document.querySelectorAll(".swiper-slide");
    const activeLine = document.querySelector(".SyncLyricsScroller_line_active__6lLvH");
    const timecodeSlider = document.querySelector(".ChangeTimecode_slider__P4qmT");

    if (activeLine && timecodeSlider) {
        const currentValue = timecodeSlider.value;
        const maxValue = timecodeSlider.max;
        const fillPercentage = (currentValue / maxValue) * 100;

        const totalSlides = slides.length;
        const totalTrackLength = maxValue;

        slides.forEach((slide) => {
            const textElement = slide.querySelector(".SyncLyricsLine_root__r62BN");
            if (textElement) {
                const textLength = textElement.textContent.length;
                const slidePercentage = (textLength / totalSlides) * (100 / totalSlides);

                const animationDuration = (totalTrackLength / totalSlides);

                slide.style.setProperty('--seek-before-width', `${Math.min(fillPercentage, slidePercentage)}%`);
                slide.style.setProperty('--seek-before-duration', `${animationDuration}s`);
            }
        });
    }

    cours()

    updateBackgroundImage()

    const section = document.querySelector('[class*="PlayerBarDesktop_root"]');
    if (!section) return;

    const style = getComputedStyle(section);
    const baseHexString = style.getPropertyValue('--player-average-color-background');
    if (!baseHexString) return;

    const hexToHSL = (hex) => {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(hex => hex + hex).join('');
        }

        const r = parseInt(hex.slice(0, 2), 16) / 255;
        const g = parseInt(hex.slice(2, 4), 16) / 255;
        const b = parseInt(hex.slice(4, 6), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const baseHSL = hexToHSL(baseHexString);
    const variations = 10;

    const hslToString = ({ h, s, l }) => `hsl(${h}, ${s}%, ${l}%)`;
    const hslaToString = ({ h, s, l }, a) => `hsla(${h}, ${s}%, ${l}%, ${a})`;

    const createCSSVariables = (baseHSL, variations) => {
        let styleString = '';

        for (let i = 1; i <= variations; i++) {
            let lightness = baseHSL.l + i * (80 - baseHSL.l) / variations;
            styleString += `--color-light-${i}: ${hslToString({ ...baseHSL, l: lightness })};\n`;
            for (let j = 1; j <= 10; j++) {
                styleString += `--color-light-${i}-${j}: ${hslaToString({ ...baseHSL, l: lightness }, j / 10)};\n`;
            }
        }

        for (let i = 1; i <= variations; i++) {
            let lightness = baseHSL.l - i * baseHSL.l / variations;
            styleString += `--color-dark-${i}: ${hslToString({ ...baseHSL, l: lightness })};\n`;
            for (let j = 1; j <= 10; j++) {
                styleString += `--color-dark-${i}-${j}: ${hslaToString({ ...baseHSL, l: lightness }, j / 10)};\n`;
            }
        }

        return styleString;
    };

    const cssVariables = createCSSVariables(baseHSL, variations);
    let styleElement = document.getElementById('dynamic-colors-style');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'dynamic-colors-style';
        document.head.appendChild(styleElement);
    }
    styleElement.textContent = `:root {\n${cssVariables}\n}`;

    let useStyleElement = document.getElementById('dynamic-use-style');
    if (!useStyleElement) {
        useStyleElement = document.createElement('style');
        useStyleElement.id = 'dynamic-use-style';
        document.head.appendChild(useStyleElement);
    }
    useStyleElement.textContent = `
        :root {
            --ym-background-color-primary-enabled-basic: var(--color-dark-8) !important;
            --ym-surface-color-primary-enabled-list: var(--color-light-1-4) !important;
            --ym-background-color-primary-enabled-content: var(--color-dark-6) !important;
            --ym-controls-color-primary-text-enabled_variant: var(--color-light-10-10) !important;
            --ym-controls-color-primary-text-enabled: var(--color-light-10-5) !important;
            --ym-controls-color-primary-text-hovered: var(--color-light-7) !important;
            --ym-background-color-secondary-enabled-blur: var(--color-light-1) !important;
            --ym-controls-color-secondary-outline-enabled_stroke: var(--color-light-10-3) !important;
            --ym-controls-color-secondary-outline-hovered_stroke: var(--color-light-5) !important;
            --ym-controls-color-secondary-on_outline-enabled: var(--color-light-10-8) !important;
            --ym-logo-color-primary-variant: var(--color-light-10) !important;
            --ym-controls-color-secondary-outline-selected: var(--color-dark-3) !important;
            --ym-controls-color-secondary-card-enabled: var(--color-dark-5-7) !important;
            --ym-controls-color-secondary-card-hovered: var(--color-light-5-5) !important;
            --ym-controls-color-primary-default-disabled: var(--color-light-4) !important;
            --ym-controls-color-primary-default-enabled: var(--color-light-10) !important;
            --ym-controls-color-primary-default-hovered: var(--color-light-8) !important;
            --ym-controls-color-secondary-default-disabled: var(--color-dark-1) !important;
            --ym-controls-color-secondary-default-enabled: var(--color-dark-5) !important;
            --ym-controls-color-secondary-default-hovered: var(--color-dark-3) !important;
            --ym-background-color-primary-enabled-popover: var(--color-dark-7-9) !important;
            --ym-controls-color-secondary-outline-disabled_stroke: var(--color-light-5-5)!important;
            --ym-controls-color-secondary-on_outline-disabled: var(--color-light-5-5)!important;
            --sync-lyrics-card-inset-bottom-vh: -11.5% !important;
            --sync-lyrics-card-inset-bottom-dvh: -11.5% !important;
           
        }

        .ChangeVolume_root__HDxtA {
            max-width: 160px;
        }

        .DefaultLayout_content__md70Z .MainPage_root__STXqc::-webkit-scrollbar {
            width: 0;
        }

        .MainPage_landing___FGNm {
            padding-right: 24px;
        }

        .NavbarDesktop_logoLink__KR0Dk {
            margin-top: 15px;
        }

        canvas {
            opacity: 1 !important;
            filter: blur(360px) !important;
        }

        .VibeBlock_vibeAnimation__XVEE6:after {
            background: transparent !important;
        }

        .flNGvSJKK4InMbr35RYA,
        .AccK_iF55jra4_OlFloI,
        .qoEgTMlU0VM3i4p8LeMG {
            color: var(--ym-logo-color-primary-variant);
        }

        .mdbxU6IWInQTsVjwnapn {
            background: var(--color-light-5) !important;
        }

        .xZzTMqgg0qtV5vqUIrkK {
            background-color: var(--color-dark-3-6) !important;
        }

        .FullscreenPlayerDesktop_poster_withSyncLyricsAnimation__bPO0o.FullscreenPlayerDesktop_important__dGfiL,
        .SyncLyricsCard_root__92qn_ {
            inset-block-end: 35px !important;
        }

        .SyncLyricsLine_root__r62BN {
            font-size: 20px;
        }

        .SyncLyricsScroller_line_active__6lLvH .SyncLyricsLine_root__r62BN {
            font-size: 35px;
        }

        -webkit-scrollbar-thumb{
        background-color: var(--color-dark-7-9)
        border: var(--color-light-10-9)
        {}

        .SyncLyricsScroller_line_active__6lLvH::before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: var(--color-light-10-1);
            animation: readText var(--seek-before-duration, 4s) linear var(--animation-delay, 0s) forwards;
        }

        .SyncLyricsLine_root__r62BN {
            display: flex;
            justify-content: flex-start;
            text-align: start;
            overflow: hidden;
            white-space: nowrap;
        }

        .chorus {
            font-weight: bold;
            color: var(--color-light-10);
            background-color: var(--color-dark-8);
            padding: 5px;
            border-radius: 0px;
        }


        ::placeholder {
            color: var(--color-light-10-4) !important;
        }

        .UserID-Avatar_plus:after {
            background-image: none;
            border-radius: 50px;
            outline: 2px var(--color-light-10) solid;
        }

        @keyframes readText {
            from {
                width: var(--seek-before-width);
            }

            to {
                width: 100%;
            }
        }
    `;
}, 1000);

function updateBackgroundImage() {
    const imgElements = document.querySelectorAll('[class*="PlayerBarDesktop_cover"]');
    let imgBackground = "";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/1000x1000')) {
            imgBackground = img.src;
            backgroundReplace(imgBackground);
        }
    });
}

function backgroundReplace(br) {
    if (br) {
        const targetElement = document.querySelector('[class*="MainPage_vibe"]');
        if (targetElement) {
            targetElement.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, var(--color-dark-6) 100%), url(${br}) center center / cover no-repeat`;
        }
    }
}
function cours() {
    var lyrics = document.querySelectorAll('.SyncLyricsLine_root__r62BN');
    var lyricsText = [];

    lyrics.forEach(function (lyric) {
        var text = lyric.textContent.trim();
        if (text !== '') {
            lyricsText.push(text);
        }
    });

    var seen = {};
    var repeated = [];

    lyricsText.forEach(function (line, index) {
        if (seen[line]) {
            if (!repeated.includes(line)) {
                repeated.push(line);
            }
        } else {
            seen[line] = true;
        }
    });

    lyrics.forEach(function (lyric) {
        var text = lyric.textContent.trim();
        if (text !== '' && repeated.includes(text)) {
            lyric.classList.add('chorus');
        }
    });
}
