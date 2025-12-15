// ARIA label templates and accessibility utilities
export const ARIA_LABELS = {
  // Navigation
  MAIN_NAVIGATION: 'Main navigation menu',
  MOBILE_MENU_TOGGLE: 'Toggle mobile navigation menu',
  USER_MENU: 'User account menu',
  LANGUAGE_SWITCHER: 'Change language',
  THEME_TOGGLE: 'Toggle dark mode',

  // Authentication
  LOGIN_FORM: 'User login form',
  REGISTER_FORM: 'User registration form',
  PASSWORD_FIELD: 'Password input field',
  EMAIL_FIELD: 'Email address input field',
  FIRST_NAME_FIELD: 'First name input field',
  LAST_NAME_FIELD: 'Last name input field',

  // Events
  EVENT_CARD: 'Event information card',
  EVENT_BOOKING: 'Event booking form',
  QUANTITY_SELECTOR: 'Select ticket quantity',
  ADD_TO_CART: 'Add event to cart',
  BOOK_NOW: 'Book event tickets now',

  // Payment
  PAYMENT_METHOD: 'Select payment method',
  CARD_NUMBER: 'Credit card number input',
  EXPIRY_DATE: 'Card expiry date input',
  CVV: 'Card security code input',
  BILLING_ADDRESS: 'Billing address form',

  // General
  CLOSE_BUTTON: 'Close dialog',
  LOADING: 'Content is loading',
  ERROR_MESSAGE: 'Error notification',
  SUCCESS_MESSAGE: 'Success notification',
  SEARCH_INPUT: 'Search events and content',
  FILTER_OPTIONS: 'Filter options',
  SORT_OPTIONS: 'Sort options',

  // Accessibility
  SKIP_TO_CONTENT: 'Skip to main content',
  BACK_TO_TOP: 'Back to top of page',
  IMAGE_DESCRIPTION: 'Image description',
  VIDEO_DESCRIPTION: 'Video description'
};

// Focus management utilities
export class FocusManager {
  // Store previously focused element
  private static previousFocus: Element | null = null;

  // Focus first focusable element in container
  static focusFirst(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }

  // Focus last focusable element in container
  static focusLast(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      (focusableElements[focusableElements.length - 1] as HTMLElement).focus();
    }
  }

  // Trap focus within container (useful for modals)
  static trapFocus(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    
    // Focus first element
    if (firstFocusable) {
      firstFocusable.focus();
    }

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }

  // Save and restore focus
  static saveFocus() {
    this.previousFocus = document.activeElement;
  }

  static restoreFocus() {
    if (this.previousFocus instanceof HTMLElement) {
      this.previousFocus.focus();
    }
  }
}

// Screen reader announcements
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Keyboard navigation helpers
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  TAB: 'Tab'
};

export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  actions: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onHome?: () => void;
    onEnd?: () => void;
  }
) {
  const { key } = event;
  
  switch (key) {
    case KEYBOARD_KEYS.ENTER:
      event.preventDefault();
      actions.onEnter?.();
      break;
    case KEYBOARD_KEYS.SPACE:
      event.preventDefault();
      actions.onSpace?.();
      break;
    case KEYBOARD_KEYS.ESCAPE:
      actions.onEscape?.();
      break;
    case KEYBOARD_KEYS.ARROW_UP:
      event.preventDefault();
      actions.onArrowUp?.();
      break;
    case KEYBOARD_KEYS.ARROW_DOWN:
      event.preventDefault();
      actions.onArrowDown?.();
      break;
    case KEYBOARD_KEYS.ARROW_LEFT:
      event.preventDefault();
      actions.onArrowLeft?.();
      break;
    case KEYBOARD_KEYS.ARROW_RIGHT:
      event.preventDefault();
      actions.onArrowRight?.();
      break;
    case KEYBOARD_KEYS.HOME:
      event.preventDefault();
      actions.onHome?.();
      break;
    case KEYBOARD_KEYS.END:
      event.preventDefault();
      actions.onEnd?.();
      break;
  }
}

// Color contrast utilities
export function getContrastRatio(color1: string, color2: string): number {
  // Simplified contrast ratio calculation
  // In production, use a proper color contrast library
  const getLuminance = (color: string) => {
    // This is a simplified version - use a proper color library in production
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

export function meetsWCAGAA(contrastRatio: number): boolean {
  return contrastRatio >= 4.5;
}

export function meetsWCAGAAA(contrastRatio: number): boolean {
  return contrastRatio >= 7;
}
