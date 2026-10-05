/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Central Anime.js Animation Engine for Pine Hideout
 * Respects prefers-reduced-motion and provides component-scoped, cleanable animation utilities.
 */

import { animate, createTimeline, stagger } from 'animejs';

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate hero section entrance (badge, headline, subtitle, CTAs, search widget)
 */
export function animateHeroEntrance(container: HTMLElement | null, imageEl?: HTMLElement | null) {
  if (!container || isReducedMotion()) return null;

  const elements = container.querySelectorAll<HTMLElement>('.hero-animate-item');
  if (elements.length > 0) {
    animate(elements, {
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 850,
      delay: stagger(100, { start: 150 }),
      ease: 'outCubic',
    });
  }

  if (imageEl) {
    animate(imageEl, {
      scale: [1.05, 1],
      opacity: [0.85, 1],
      duration: 1200,
      ease: 'outQuad',
    });
  }
}

/**
 * Animate section upward reveal on scroll
 */
export function animateSectionReveal(element: HTMLElement | null, delayMs = 0) {
  if (!element || isReducedMotion()) return null;

  return animate(element, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 600,
    delay: delayMs,
    ease: 'outCubic',
  });
}

/**
 * Animate grid items with staggered entrance
 */
export function animateStaggerGrid(container: HTMLElement | null, itemClass = '.grid-card-item', startDelay = 50) {
  if (!container || isReducedMotion()) return null;

  const items = container.querySelectorAll<HTMLElement>(itemClass);
  if (items.length === 0) return null;

  return animate(items, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 550,
    delay: stagger(80, { start: startDelay }),
    ease: 'outCubic',
  });
}

/**
 * Animate chat drawer entrance
 */
export function animateDrawerOpen(drawer: HTMLElement | null, onComplete?: () => void) {
  if (!drawer) return null;
  if (isReducedMotion()) {
    drawer.style.transform = 'translateX(0)';
    drawer.style.opacity = '1';
    onComplete?.();
    return null;
  }

  const anim = animate(drawer, {
    translateX: ['100%', '0%'],
    opacity: [0.6, 1],
    duration: 380,
    ease: 'outCubic',
  });

  if (onComplete) {
    if (anim && typeof (anim as any).then === 'function') {
      (anim as any).then(() => onComplete());
    } else {
      setTimeout(onComplete, 380);
    }
  }

  return anim;
}

/**
 * Animate chat drawer exit
 */
export function animateDrawerClose(drawer: HTMLElement | null, onComplete?: () => void) {
  if (!drawer) return null;
  if (isReducedMotion()) {
    onComplete?.();
    return null;
  }

  const anim = animate(drawer, {
    translateX: ['0%', '100%'],
    opacity: [1, 0.4],
    duration: 300,
    ease: 'inCubic',
  });

  if (onComplete) {
    if (anim && typeof (anim as any).then === 'function') {
      (anim as any).then(() => onComplete());
    } else {
      setTimeout(onComplete, 300);
    }
  }

  return anim;
}

/**
 * Animate new chat message entrance
 */
export function animateChatMessage(element: HTMLElement | null) {
  if (!element || isReducedMotion()) return null;

  return animate(element, {
    opacity: [0, 1],
    translateY: [12, 0],
    scale: [0.98, 1],
    duration: 350,
    ease: 'outCubic',
  });
}

/**
 * Animate step transition in booking flow
 */
export function animateStepTransition(stepContainer: HTMLElement | null, direction: 'forward' | 'backward' = 'forward') {
  if (!stepContainer || isReducedMotion()) return null;

  const startOffset = direction === 'forward' ? 18 : -18;

  return animate(stepContainer, {
    opacity: [0, 1],
    translateX: [startOffset, 0],
    duration: 400,
    ease: 'outCubic',
  });
}

/**
 * Animate lightbox modal entrance
 */
export function animateLightboxOpen(modalContent: HTMLElement | null) {
  if (!modalContent || isReducedMotion()) return null;

  return animate(modalContent, {
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: 350,
    ease: 'outCubic',
  });
}

/**
 * Animate accordion expand/collapse
 */
export function animateAccordionHeight(contentEl: HTMLElement | null, isOpen: boolean) {
  if (!contentEl || isReducedMotion()) return null;

  if (isOpen) {
    contentEl.style.display = 'block';
    const targetHeight = contentEl.scrollHeight;
    contentEl.style.height = '0px';
    contentEl.style.opacity = '0';

    return animate(contentEl, {
      height: [0, targetHeight],
      opacity: [0, 1],
      duration: 320,
      ease: 'outCubic',
      onComplete: () => {
        contentEl.style.height = 'auto';
      },
    });
  } else {
    const currentHeight = contentEl.scrollHeight;
    contentEl.style.height = `${currentHeight}px`;

    return animate(contentEl, {
      height: [currentHeight, 0],
      opacity: [1, 0],
      duration: 250,
      ease: 'inQuad',
      onComplete: () => {
        contentEl.style.display = 'none';
      },
    });
  }
}
