// Performance monitoring utilities
export class PerformanceMonitor {
  private static marks: Map<string, number> = new Map();

  static startMark(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-start`);
      this.marks.set(name, Date.now());
    }
  }

  static endMark(name: string): number | null {
    if (typeof window !== 'undefined' && window.performance && this.marks.has(name)) {
      window.performance.mark(`${name}-end`);
      window.performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = window.performance.getEntriesByName(name)[0] as PerformanceMeasure;
      const duration = measure.duration;
      
      this.marks.delete(name);
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    }
    return null;
  }

  static measureApiCall(apiName: string, fetchPromise: Promise<any>): Promise<any> {
    this.startMark(`api-${apiName}`);
    
    return fetchPromise
      .then((result) => {
        const duration = this.endMark(`api-${apiName}`);
        if (duration && duration > 1000) {
          console.warn(`Slow API call: ${apiName} took ${duration.toFixed(2)}ms`);
        }
        return result;
      })
      .catch((error) => {
        this.endMark(`api-${apiName}`);
        throw error;
      });
  }

  static measureRender(componentName: string, renderFunction: () => void): void {
    this.startMark(`render-${componentName}`);
    renderFunction();
    const duration = this.endMark(`render-${componentName}`);
    
    if (duration && duration > 16) { // 16ms = 60fps threshold
      console.warn(`Slow render: ${componentName} took ${duration.toFixed(2)}ms`);
    }
  }
}

// Web Vitals tracking
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');

  const sendToAnalytics = (metric: any) => {
    // Send to analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
    }
  };

  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}
