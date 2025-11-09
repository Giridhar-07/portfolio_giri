import { useEffect, useRef, useState } from 'react';

interface UseScrollFadeProps {
  threshold?: number;
  rootMargin?: string;
  fadeStart?: number; // Percentage of section height where fade starts (0-1)
  fadeEnd?: number;   // Percentage of section height where fade ends (0-1)
  duration?: number;  // Animation duration in seconds
  viewTime?: number;  // Minimum time to view content before fade can start (seconds)
  scrollThreshold?: number; // Minimum scroll distance to activate fade
  minOpacity?: number; // Minimum opacity value (subtle fade instead of complete)
  animationDelay?: number; // Delay before animation starts
  targetSectionId?: string; // ID of the section that triggers the fade
}

export const useScrollFade = ({
  threshold = 0.1,
  rootMargin = '0px',
  fadeStart = 0.95,  // Start fade when 95% of section has scrolled past (increased from 75%)
  fadeEnd = 1.99,    // Complete fade when 99% of section has scrolled past (increased from 95%)
  duration = 2.5,    // 2.5 second transition duration (increased from 1.8)
  viewTime = 8,      // 8 seconds minimum view time (increased from 4)
  scrollThreshold = 100, // 100px scroll before fade can activate (increased from 60)
  minOpacity = 0.98, // Subtle fade to 98% opacity instead of 95% (increased from 0.95)
  animationDelay = 0.5, // 0.5s delay before animation starts (increased from 0.3)
  targetSectionId // Optional target section that triggers the fade
}: UseScrollFadeProps = {}) => {
  const [opacity, setOpacity] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [canFade, setCanFade] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStartedScrolling, setHasStartedScrolling] = useState(false);
  const [sectionViewStartTime, setSectionViewStartTime] = useState<number | null>(null);
  const [totalScrollDistance, setTotalScrollDistance] = useState(0);
  const [contentConsumed, setContentConsumed] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    let animationTimeout: NodeJS.Timeout;

    const updateOpacity = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Track total scroll distance
      setTotalScrollDistance(prev => prev + scrollDelta);
      
      // Detect if user has started meaningful scrolling
      if (totalScrollDistance > scrollThreshold && !hasStartedScrolling) {
        setHasStartedScrolling(true);
      }

      const element = elementRef.current;
      if (!element) {
        ticking = false;
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = rect.height;
      const elementTop = rect.top;
      const elementBottom = elementTop + elementHeight;
      
      // Check if section is in viewport and start timing
      const isInViewport = elementTop < viewportHeight && elementBottom > 0;
      
      if (isInViewport && sectionViewStartTime === null) {
        setSectionViewStartTime(Date.now());
      } else if (!isInViewport && sectionViewStartTime !== null) {
        setSectionViewStartTime(null);
        setContentConsumed(0);
      }
      
      // Calculate content consumption based on viewport visibility
      if (isInViewport && sectionViewStartTime) {
        const visibleHeight = Math.min(elementBottom, viewportHeight) - Math.max(elementTop, 0);
        const visibilityRatio = visibleHeight / elementHeight;
        const timeViewed = (Date.now() - sectionViewStartTime) / 1000;
        
        // Content consumption increases with time and visibility
        const consumptionRate = visibilityRatio * timeViewed;
        setContentConsumed(Math.min(consumptionRate / viewTime, 1));
      }
      
      // Check if enough time has passed, user has scrolled enough, and consumed enough content
      const timeViewed = sectionViewStartTime ? (Date.now() - sectionViewStartTime) / 1000 : 0;
      const hasViewedLongEnough = timeViewed >= viewTime;
      const hasScrolledEnough = hasStartedScrolling && totalScrollDistance > scrollThreshold;
      const hasConsumedEnoughContent = contentConsumed >= 0.8; // 80% content consumption
      
      // Check if target section is in viewport (if specified)
      let targetSectionInView = false;
      if (targetSectionId) {
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
          const targetRect = targetSection.getBoundingClientRect();
          // Target section is considered "reached" when it's 20% visible from the top
          targetSectionInView = targetRect.top <= viewportHeight * 0.8;
        }
      }
      
      if (hasViewedLongEnough && hasScrolledEnough && hasConsumedEnoughContent && !canFade) {
        // If we have a target section, only allow fade when target is reached
        if (targetSectionId) {
          if (targetSectionInView) {
            setCanFade(true);
          }
        } else {
          setCanFade(true);
        }
        
        // Add animation delay
        if (canFade && animationDelay > 0 && !animationStarted) {
          animationTimeout = setTimeout(() => {
            setAnimationStarted(true);
          }, animationDelay * 1000);
        } else if (canFade) {
          setAnimationStarted(true);
        }
      }
      
      // Reset fade if target section is no longer in view (user scrolled back up)
      if (targetSectionId && !targetSectionInView && canFade) {
        setCanFade(false);
        setAnimationStarted(false);
        setOpacity(1);
      }
      
      // Only apply fade if all conditions are met and animation has started
      if (!canFade || !hasStartedScrolling || !animationStarted) {
        setOpacity(1);
        setIsVisible(true);
        ticking = false;
        lastScrollY = currentScrollY;
        return;
      }
      
      // Calculate fade based on target section visibility or section position
      let newOpacity = 1;
      
      if (targetSectionId && targetSectionInView) {
        // Fade based on how much of the target section is visible
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
          const targetRect = targetSection.getBoundingClientRect();
          const targetVisibility = Math.max(0, Math.min(1, (viewportHeight - targetRect.top) / viewportHeight));
          
          if (targetVisibility > 0.2) { // Start fade when target is 20% visible
            const fadeProgress = Math.min(1, (targetVisibility - 0.2) / 0.6); // Fade over 60% visibility range
            const easedProgress = 1 - Math.pow(1 - fadeProgress, 3);
            newOpacity = Math.max(minOpacity, 1 - (easedProgress * (1 - minOpacity)));
          }
        }
      } else {
        // Original fade logic for sections without target
        if (elementBottom < viewportHeight) {
          const sectionScrolledPast = viewportHeight - elementBottom;
          const fadeStartPoint = elementHeight * fadeStart;
          const fadeEndPoint = elementHeight * fadeEnd;
          
          if (sectionScrolledPast > fadeStartPoint) {
            if (sectionScrolledPast >= fadeEndPoint) {
              newOpacity = minOpacity;
            } else {
              const fadeRange = fadeEndPoint - fadeStartPoint;
              const fadeProgress = (sectionScrolledPast - fadeStartPoint) / fadeRange;
              const easedProgress = 1 - Math.pow(1 - fadeProgress, 3);
              newOpacity = Math.max(minOpacity, 1 - (easedProgress * (1 - minOpacity)));
            }
          }
        }
        
        if (elementTop > viewportHeight) {
          newOpacity = minOpacity;
        }
      }
      
      // Keep content highly visible when section is centered in viewport (only if no target section)
      if (!targetSectionId || !targetSectionInView) {
        const sectionCenter = elementTop + (elementHeight / 2);
        const viewportCenter = viewportHeight / 2;
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
        const centerThreshold = viewportHeight * 0.4;
        
        if (distanceFromCenter < centerThreshold) {
          newOpacity = Math.max(newOpacity, 0.98);
        }
      }
      
      setOpacity(newOpacity);
      setIsVisible(newOpacity > 0.3);
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateOpacity);
        ticking = true;
      }
    };

    // Intersection Observer for performance optimization
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll, { passive: true });
          if (sectionViewStartTime === null) {
            setSectionViewStartTime(Date.now());
          }
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Initial calculation
    updateOpacity();

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      window.removeEventListener('scroll', handleScroll);
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [threshold, rootMargin, fadeStart, fadeEnd, hasStartedScrolling, sectionViewStartTime, canFade, viewTime, scrollThreshold, totalScrollDistance, minOpacity, animationDelay, animationStarted, contentConsumed, targetSectionId]);

  // Enhanced fade style with smooth easing and longer duration
  const fadeStyle = {
    opacity,
    transition: canFade && hasStartedScrolling && animationStarted 
      ? `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)` // Smooth ease-out transition
      : 'none',
    willChange: 'opacity',
  };

  return { 
    elementRef, 
    fadeStyle, 
    opacity, 
    isVisible,
    hasStartedScrolling,
    canFade,
    animationStarted,
    contentConsumed,
    timeViewed: sectionViewStartTime ? (Date.now() - sectionViewStartTime) / 1000 : 0
  };
};