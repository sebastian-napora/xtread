/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ColorsTheme, Theme } from './theme.js';
import { lightSemanticColors } from './semantic-tokens.js';

const xtreadLightColors: ColorsTheme = {
  type: 'light',
  Background: '#f8f9fa',
  Foreground: '#5c6166',
  LightBlue: '#55b4d4',
  AccentBlue: '#399ee6',
  AccentPurple: '#a37acc',
  AccentCyan: '#4cbf99',
  AccentGreen: '#86b300',
  AccentYellow: '#f2ae49',
  AccentRed: '#f07171',
  AccentYellowDim: '#8B7000',
  AccentRedDim: '#993333',
  DiffAdded: '#86b300',
  DiffRemoved: '#f07171',
  Comment: '#ABADB1',
  Gray: '#CCCFD3',
  GradientColors: ['#399ee6', '#86b300'],
};

export const XtreadLight: Theme = new Theme(
  'Xtread Light',
  'light',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: xtreadLightColors.Background,
      color: xtreadLightColors.Foreground,
    },
    'hljs-comment': {
      color: xtreadLightColors.Comment,
      fontStyle: 'italic',
    },
    'hljs-quote': {
      color: xtreadLightColors.AccentCyan,
      fontStyle: 'italic',
    },
    'hljs-string': {
      color: xtreadLightColors.AccentGreen,
    },
    'hljs-constant': {
      color: xtreadLightColors.AccentCyan,
    },
    'hljs-number': {
      color: xtreadLightColors.AccentPurple,
    },
    'hljs-keyword': {
      color: xtreadLightColors.AccentYellow,
    },
    'hljs-selector-tag': {
      color: xtreadLightColors.AccentYellow,
    },
    'hljs-attribute': {
      color: xtreadLightColors.AccentYellow,
    },
    'hljs-variable': {
      color: xtreadLightColors.Foreground,
    },
    'hljs-variable.language': {
      color: xtreadLightColors.LightBlue,
      fontStyle: 'italic',
    },
    'hljs-title': {
      color: xtreadLightColors.AccentBlue,
    },
    'hljs-section': {
      color: xtreadLightColors.AccentGreen,
      fontWeight: 'bold',
    },
    'hljs-type': {
      color: xtreadLightColors.LightBlue,
    },
    'hljs-class .hljs-title': {
      color: xtreadLightColors.AccentBlue,
    },
    'hljs-tag': {
      color: xtreadLightColors.LightBlue,
    },
    'hljs-name': {
      color: xtreadLightColors.AccentBlue,
    },
    'hljs-builtin-name': {
      color: xtreadLightColors.AccentYellow,
    },
    'hljs-meta': {
      color: xtreadLightColors.AccentYellow,
    },
    'hljs-symbol': {
      color: xtreadLightColors.AccentRed,
    },
    'hljs-bullet': {
      color: xtreadLightColors.AccentYellow,
    },
    'hljs-regexp': {
      color: xtreadLightColors.AccentCyan,
    },
    'hljs-link': {
      color: xtreadLightColors.LightBlue,
    },
    'hljs-deletion': {
      color: xtreadLightColors.AccentRed,
    },
    'hljs-addition': {
      color: xtreadLightColors.AccentGreen,
    },
    'hljs-emphasis': {
      fontStyle: 'italic',
    },
    'hljs-strong': {
      fontWeight: 'bold',
    },
    'hljs-literal': {
      color: xtreadLightColors.AccentCyan,
    },
    'hljs-built_in': {
      color: xtreadLightColors.AccentRed,
    },
    'hljs-doctag': {
      color: xtreadLightColors.AccentRed,
    },
    'hljs-template-variable': {
      color: xtreadLightColors.AccentCyan,
    },
    'hljs-selector-id': {
      color: xtreadLightColors.AccentRed,
    },
  },
  xtreadLightColors,
  lightSemanticColors,
);
