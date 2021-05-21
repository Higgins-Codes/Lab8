/**
 * @jest-environment jsdom
 */

import {describe, expect, test} from '@jest/globals';
import { pushToHistory } from "../scripts/router.js";

describe('pushToHistory', () => {
    let historyLength = history.length;

    test('Settings', () => {
      let objHistory = pushToHistory('settings', 0);

      expect(historyLength + 1).toBe(objHistory.length);
      expect('settings').toBe(objHistory.state.page);
      historyLength++;
    });
  
    test('Entry Page', () => {
      let objHistory = pushToHistory('entry', 64);

      expect(historyLength + 1).toBe(objHistory.length);
      expect('entry64').toBe(objHistory.state.page);
      historyLength++;
    });

    test('Default', () => {
      let objHistory = pushToHistory('default', 0);

      expect(historyLength + 1).toBe(objHistory.length);
      expect({}).toEqual(objHistory.state);
    });
  });