import { describe, expect, it } from '@jest/globals';
import { Engine } from '../engine';
import { createContainsRule } from '../../testing';

describe('Engine tests', () => {
  it('should init', () => {
    expect(new Engine({ include: [], threshold: 0.9 })).toBeDefined();
  });

  it('should run isPhishing false and isPhishingProbability 0 when no rules set', () => {
    const engine = new Engine({ threshold: 0.9 });
    const [result] = engine.detect('https://some_evil_domain.com');
    expect(result).toEqual({
      isPhishing: false,
      phishingProbability: 0,
      threshold: 0.9
    });
  });

  it('should run isPhishing false and isPhishingProbability 0 when include is empty', () => {
    const engine = new Engine({ include: [], threshold: 0.9 });
    const [result] = engine.detect('https://some_evil_domain.com');
    expect(result).toEqual({
      isPhishing: false,
      phishingProbability: 0,
      threshold: 0.9
    });
  });

  it('should run isPhishing false and isPhishingProbability 0 when exclude is empty', () => {
    const engine = new Engine({ exclude: [], threshold: 0.9 });
    const [result] = engine.detect('https://some_evil_domain.com');
    expect(result).toEqual({
      isPhishing: false,
      phishingProbability: 0,
      threshold: 0.9
    });
  });

  describe('# Contains', () => {
    describe('# include', () => {
      it('Should return isPhishing true when includes', () => {
        const rule = createContainsRule({ value: 'google.com', weight: 1 });
        const engine = new Engine({ include: [rule], threshold: 0.5 });
        const [result] = engine.detect('https://www.google.com');
        expect(result.isPhishing).toBe(true);
      });

      it('Should return isPhishing false when not includes', () => {
        const rule = createContainsRule({ value: 'google.nl' });
        const engine = new Engine({ include: [rule], threshold: 0.9 });
        const [result] = engine.detect('https://www.google.com');
        expect(result.isPhishing).toBe(false);
      });

      it('Should return isPhishing false when is below threshold', () => {
        const rule = createContainsRule({ value: 'google.nl', weight: 0.4 });
        const engine = new Engine({ include: [rule], threshold: 0.9 });
        const [result] = engine.detect('https://www.google.com');
        expect(result.isPhishing).toBe(false);
      });

      it('Should return valid probability when matching', () => {
        const rule = createContainsRule({ value: 'google.com', weight: 1 });
        const engine = new Engine({ include: [rule], threshold: 0.9 });
        const [result] = engine.detect('https://www.google.com');
        expect(result.phishingProbability).toBe(1);
      });

      it('Should return valid probability when not matching', () => {
        const rule = createContainsRule({ value: 'google.nl', weight: 1 });
        const engine = new Engine({ include: [rule], threshold: 0.9 });
        const [result] = engine.detect('https://www.google.com');
        expect(result.phishingProbability).toBe(0);
      });
    });

    describe('# exclude', () => {
      it('Should return isPhishing false when the domain is excluded', () => {
        const rule = createContainsRule({ value: 'google.com', weight: 1 });
        const engine = new Engine({ exclude: [rule], threshold: 0.9 });
        const [result] = engine.detect('https://www.google.com');
        expect(result.isPhishing).toBe(false);
      });

      it('Should return valid probability when excluded', () => {
        const rule = createContainsRule({ value: 'google.com', weight: 1 });
        const engine = new Engine({ exclude: [rule], threshold: 0 });
        const [result] = engine.detect('https://www.google.com');
        expect(result.phishingProbability).toBe(-1);
      });
    });

    describe('# include and exclude', () => {
      it('Should return valid probability when includes and excludes', () => {
        const engine = new Engine({
          include: [createContainsRule({ value: 'google.com', weight: 1 })],
          exclude: [createContainsRule({ value: 'google.com', weight: 1 })],
          threshold: 0.9
        });
        const [result] = engine.detect('https://www.google.com');
        expect(result.phishingProbability).toBe(0);
      });
    });
  });
});
