/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ColorsTheme, Theme } from './theme.js';
import { darkSemanticColors } from './semantic-tokens.js';

const xtreadDarkColors: ColorsTheme = {
  type: 'dark',
  Background: '#0b0e14',
  Foreground: '#bfbdb6',
  LightBlue: '#59C2FF',
  AccentBlue: '#39BAE6',
  AccentPurple: '#D2A6FF',
  AccentCyan: '#95E6CB',
  AccentGreen: '#AAD94C',
  AccentYellow: '#FFD700',
  AccentRed: '#F26D78',
  AccentYellowDim: '#8B7530',
  AccentRedDim: '#8B3A4A',
  DiffAdded: '#AAD94C',
  DiffRemoved: '#F26D78',
  Comment: '#646A71',
  Gray: '#3D4149',
  GradientColors: ['#FFD700', '#da7959'],
};

export const XtreadDark: Theme = new Theme(
  'Xtread Dark',
  'dark',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: xtreadDarkColors.Background,
      color: xtreadDarkColors.Foreground,
    },
    'hljs-keyword': {
      color: xtreadDarkColors.AccentYellow,
    },
    'hljs-literal': {
      color: xtreadDarkColors.AccentPurple,
    },
    'hljs-symbol': {
      color: xtreadDarkColors.AccentCyan,
    },
    'hljs-name': {
      color: xtreadDarkColors.LightBlue,
    },
    'hljs-link': {
      color: xtreadDarkColors.AccentBlue,
    },
    'hljs-function .hljs-keyword': {
      color: xtreadDarkColors.AccentYellow,
    },
    'hljs-subst': {
      color: xtreadDarkColors.Foreground,
    },
    'hljs-string': {
      color: xtreadDarkColors.AccentGreen,
    },
    'hljs-title': {
      color: xtreadDarkColors.AccentYellow,
    },
    'hljs-type': {
      color: xtreadDarkColors.AccentBlue,
    },
    'hljs-attribute': {
      color: xtreadDarkColors.AccentYellow,
    },
    'hljs-bullet': {
      color: xtreadDarkColors.AccentYellow,
    },
    'hljs-addition': {
      color: xtreadDarkColors.AccentGreen,
    },
    'hljs-variable': {
      color: xtreadDarkColors.Foreground,
    },
    'hljs-template-tag': {
      color: xtreadDarkColors.AccentYellow,
    },
    'hljs-template-variable': {
      color: xtreadDarkColors.AccentYellow,
    },
    'hljs-comment': {
      color: xtreadDarkColors.Comment,
      fontStyle: 'italic',
    },
    'hljs-quote': {
      color: xtreadDarkColors.AccentCyan,
      fontStyle: 'italic',
    },
    'hljs-deletion': {
      color: xtreadDarkColors.AccentRed,
    },
    'hljs-meta': {
      color: xtreadDarkColors.AccentYellow,
    },
    'hljs-doctag': {
      fontWeight: 'bold',
    },
    'hljs-strong': {
      fontWeight: 'bold',
    },
    'hljs-emphasis': {
      fontStyle: 'italic',
    },
  },
  xtreadDarkColors,
  darkSemanticColors,
);
