import { startAssetPlaceholderAnimation, stopAssetPlaceholderAnimation } from './promptAnimator.js';

export function initializePanelManager() {
    const leftPanel = document.getElementById('left-panel');
    const rightPanel = document.getElementById('right-panel');
    const mobileToggleLeft = document.getElementById('mobile-toggle-left');
    const mobileToggleRight = document.getElementById('mobile-toggle-right');
    const toggleLeftPanelBtn = document.getElementById('toggle-left-panel');
    const toggleRightPanelBtn = document.getElementById('toggle-right-panel');

    const togglePanel = (panel) => {
        const isVisible = panel.classList.contains('visible');
        // Hide all panels first
        document.querySelectorAll('#left-panel, #right-panel').forEach(p => p.classList.remove('visible'));
        // Then show the target panel if it wasn't already visible
        if (!isVisible) {
            panel.classList.add('visible');
        }

        // Add/remove class on app-container for dynamic height adjustment
        const appContainer = document.getElementById('app-container');
        const anyPanelVisible = leftPanel.classList.contains('visible') || rightPanel.classList.contains('visible');
        if (anyPanelVisible) {
            appContainer.classList.add('panel-visible');
        } else {
            appContainer.classList.remove('panel-visible');
        }

        // Handle asset placeholder animation on mobile
        if ('ontouchstart' in window) {
            if (leftPanel.classList.contains('visible')) {
                startAssetPlaceholderAnimation();
            } else {
                stopAssetPlaceholderAnimation();
            }
        }
    };

    mobileToggleLeft.addEventListener('click', () => togglePanel(leftPanel));
    mobileToggleRight.addEventListener('click', () => togglePanel(rightPanel));
    toggleLeftPanelBtn.addEventListener('click', () => leftPanel.classList.remove('visible'));
    toggleRightPanelBtn.addEventListener('click', () => rightPanel.classList.remove('visible'));
}

