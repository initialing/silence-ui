export function calcPanelPosition(
    inputId: string,
    panelId: string,
    width: number | null = null
): void {
    const selector: HTMLElement = document.getElementById(
        inputId
    ) as HTMLElement;
    const panel: HTMLElement = document.getElementById(panelId) as HTMLElement;
    const selectorWidth = selector.clientWidth;
    const selectorHeight = selector.clientHeight;
    const selectorX = selector.offsetLeft;
    const selectorY = selector.offsetTop;
    panel.style.width = width ? width + "px" : selectorWidth + "px";
    panel.style.top = selectorHeight + selectorY + 10 + "px";
    panel.style.left = selectorX + "px";
}
