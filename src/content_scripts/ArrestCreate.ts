const DISABLED_CLASS = 'button--disabled';

export class ArrestCreate {
  private targetButton: HTMLButtonElement | undefined;
  private hasPendingPrompt: boolean = false;
  private optionEnable: boolean = true;

  set target(value: HTMLButtonElement) {
    this.targetButton = value;
    this.updateButtonStatus();
  }

  watchPromputInput(input: HTMLInputElement): void {
    const update = () => {
      this.updateStatus(!!input.value);
    };

    input.addEventListener('keyup', (ev) => {
      if (ev.key === 'Enter') {
        this.updateStatus(false);
      } else {
        update();
      }
    });
    input.addEventListener('input', update);
    input.addEventListener('change', update);
    input.addEventListener('selectionchange', update);
    input.addEventListener('paste', () => this.updateStatus(true));
    input.addEventListener('blur', update);
  }

  private updateStatus(hasPrompt: boolean) {
    this.hasPendingPrompt = hasPrompt;
    this.updateButtonStatus();
  }

  private updateButtonStatus() {
    if (!this.targetButton) {
      return;
    }

    if (this.optionEnable && this.hasPendingPrompt) {
      this.targetButton.disabled = true;
      this.targetButton.classList.add(DISABLED_CLASS);
    } else {
      this.targetButton.disabled = false;
      this.targetButton.classList.remove(DISABLED_CLASS);
    }
  }
}
